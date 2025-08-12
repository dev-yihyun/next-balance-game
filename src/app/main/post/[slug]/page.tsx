"use client";

import Button from "@/component/atoms_/Button";
import Input from "@/component/atoms_/Input";
import Text from "@/component/atoms_/Text";
import DataFetchError from "@/component/molecules_/DataFetchError";
import LoadingSpinner from "@/component/molecules_/LoadingSpinner";
import OptionCard from "@/component/molecules_/OptionCard";
import PostCard from "@/component/molecules_/PostCard";
import ShareButton from "@/component/molecules_/ShareButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PostPage({ params }: { params: { slug: string } }) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [inputPw, setInputPw] = useState("");

    const [hasVoted, setHasVoted] = useState(false);
    const postId = params.slug;

    const [isOpen, setIsOpen] = useState(false);

    const fetchPost = async () => {
        const response = await fetch(`/api/post/${params.slug}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "포스트를 불러오는 데 실패했습니다.");
        }
        return data?.data;
    };

    const {
        isLoading,
        error,
        data: post,
    } = useQuery({ queryKey: ["posts", postId], queryFn: fetchPost });
    const totalvote = post?.options?.voteCount;

    useEffect(() => {
        const votes = JSON.parse(localStorage.getItem("votes") || "{}");
        if (votes[postId]) {
            setHasVoted(true);
        }
    }, [postId]);

    // esc로 모달창 닫기
    // useEffect(() => {
    //     const handleEsc = (e: KeyboardEvent) => {
    //         // 사용자가 esc 키를 눌렸는지 확인
    //         if (e.key === "Escape") {
    //             setIsOpen(false);
    //         }
    //     };
    //     // 모달이 열려 있을때만 이벤트 발생
    //     if (isOpen) {
    //         window.addEventListener("keydown", handleEsc);
    //     }

    //     //cleanup 메모리누수 방지
    //     return () => {
    //         window.removeEventListener("keydown", handleEsc);
    //     };
    // }, [isOpen]);

    const votePost = async (optionKey: "option1" | "option2") => {
        const response = await fetch(`/api/post/${params.slug}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ option: optionKey }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "투표 실패");
        return { optionKey };
    };

    const handleVoteSuccess = ({ optionKey }: { optionKey: "option1" | "option2" }) => {
        const votes = JSON.parse(localStorage.getItem("votes") || "{}");
        votes[postId] = optionKey;
        localStorage.setItem("votes", JSON.stringify(votes));
        setHasVoted(true);
        queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    };

    const handleVoteError = (error: string) => {
        console.error("투표 에러:", error);
        alert("투표 중 문제가 발생했습니다. 다시 시도해주세요.");
    };

    const voteMutation = useMutation({
        mutationFn: votePost,
        onSuccess: handleVoteSuccess,
        onError: handleVoteError,
    });

    const onVote = async (optionKey: "option1" | "option2") => {
        const votes = JSON.parse(localStorage.getItem("votes") || "{}");
        if (votes[postId]) {
            alert("이미 투표하셨습니다.");
            return;
        }

        voteMutation.mutate(optionKey);
    };
    const deletePost = async (inputPw: string) => {
        if (!inputPw.trim()) {
            setInputPw("");
            setIsOpen(false);
            alert("비밀번호를 입력해주세요.");
            return;
        }

        const response = await fetch(`/api/post/${params.slug}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputPw }),
        });

        const result = await response.json();

        if (!response.ok) {
            setInputPw("");
            setIsOpen(false);
            alert(result.message || "삭제 중 오류가 발생하였습니다. ");
            throw new Error(result?.message || "삭제 실패");
        }
        return result;
    };
    const handleDeleteSuccess = (data: { success: boolean }) => {
        if (data.success) {
            setInputPw("");
            setIsOpen(false);
            alert("삭제되었습니다.");
            router.push("/main");
        } else {
            alert("서버 요청 중 오류가 발생했습니다.");
        }
    };
    const handleDeleteError = (error: string) => {
        console.error("삭제 중 오류 발생:", error);
        setInputPw("");
        setIsOpen(false);
    };

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: handleDeleteSuccess,
        onError: handleDeleteError,
    });

    const onDelete = () => {
        deleteMutation.mutate(inputPw);
    };

    const onOpenModal = () => {
        setInputPw("");
        setIsOpen(!isOpen);
    };

    if (isLoading) return <LoadingSpinner />;
    if (!post) {
        notFound(); // 존재하지 않으면 404 페이지로 리디렉트
    }
    if (error || !post) return <DataFetchError />;

    return (
        <section className="flex flex-col gap-8 p-5 mt-10 ">
            <PostCard posttitle={post?.title ?? "제목 없음"} pointer={false} />
            <div className="flex flex-col gap-10 justify-between items-center sm:flex-col md:flex-row lg:flex-row ">
                {post?.options?.option1 && (
                    <OptionCard
                        total={totalvote}
                        options={post?.options?.option1}
                        onVote={() => onVote("option1")}
                        voted={hasVoted}
                    />
                )}
                <Text bold type="large">
                    VS
                </Text>
                {post?.options?.option2 && (
                    <OptionCard
                        total={totalvote}
                        options={post?.options?.option2}
                        onVote={() => onVote("option2")}
                        voted={hasVoted}
                    />
                )}
            </div>
            <div className="border border-gray-300"></div>
            <div className="flex flex-row items-centers justify-between">
                <div className="flex flex-row items-center  gap-3">
                    <div className="bg-gray-300 p-2 rounded-md">
                        <Text>{post?.userinfo?.userid ?? "익명"}</Text>
                    </div>

                    <Button buttonType="default" onClick={onOpenModal}>
                        <Text bold type="medium">
                            삭제
                        </Text>
                    </Button>
                    {isOpen && (
                        <div
                            onClick={onOpenModal}
                            className="fixed inset-0 flex items-center justify-center bg-neutral-900/70 bg-opacity-50 z-50"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()} // 이벤트 처리 막기
                                className="flex flex-col gap-5 bg-white p-5 rounded-2xl shadow-lg w-96 relative"
                            >
                                <Text bold type="medium">
                                    비밀번호 삭제
                                </Text>
                                <Text type="small">
                                    게시글을 삭제하려면 비밀번호를 입력해주세요.
                                </Text>
                                <Input
                                    placeholder="비밀번호를 입력해 주세요."
                                    maxLength={10}
                                    type="password"
                                    required
                                    value={inputPw}
                                    onChange={(e) => setInputPw(e.target.value)}
                                />
                                <div className="flex flex-row gap-4">
                                    <Button buttonType="default" onClick={onOpenModal}>
                                        <Text type="medium">취소</Text>
                                    </Button>
                                    <Button
                                        buttonType="confirm"
                                        onClick={onDelete}
                                        disabled={!inputPw.trim() || deleteMutation.isPending}
                                    >
                                        <Text type="medium">확인</Text>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-row gap-3">
                    <ShareButton posttitle={post?.title} />
                    {/* <Button buttonType="report">
                        <Text bold type="medium">
                            신고
                        </Text>
                    </Button> */}
                </div>
            </div>
        </section>
    );
}
export default PostPage;
