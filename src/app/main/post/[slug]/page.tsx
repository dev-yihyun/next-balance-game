"use client";

import DataFetchError from "@/component/DataFetchError";
import LoadingSpinner from "@/component/LoadingSpinner";
import OptionCard from "@/component/OptionCard";
import PostListCard from "@/component/PostListCard";
import InputComponent from "@/component/ui/InputComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Post = {
    postid: string;
    createdAt: string;
    title: string;
    options: {
        option1: {
            title: string;
            description: string;
            voteCount: number;
        };
        option2: {
            title: string;
            description: string;
            voteCount: number;
        };
    };
    voteCount: number;
    userinfo: {
        userid: string;
        userpw: string;
    };
};

function PostPage({ params }: { params: { slug: string } }) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [isShow, setIsShow] = useState(false);
    const [inputPw, setInputPw] = useState("");

    const [hasVoted, setHasVoted] = useState(false);
    const postId = params.slug;
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

    const handleVoteError = (error: any) => {
        alert("투표에 실패했습니다.");
        console.error(error);
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
    const deletePost = async () => {
        if (!inputPw.trim()) {
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
            alert(result.message || "삭제 중 오류가 발생하였습니다. ");
            throw new Error(result?.message || "삭제 실패");
        }
    };
    const handleDeleteSuccess = () => {
        alert("삭제되었습니다.");
        router.push("/main");
    };
    const handleDeleteError = (error: any) => {
        console.error("삭제 중 오류 발생:", error);
        setInputPw("");
        setIsShow(false);
    };

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: handleDeleteSuccess,
        onError: handleDeleteError,
    });

    const onDelete = () => {
        deleteMutation.mutate();
    };

    if (isLoading) return <LoadingSpinner />;

    if (error || !post) return <DataFetchError />;

    return (
        <>
            <section className="flex flex-col gap-5 p-5 pt-10 h-auto ">
                <div className="">
                    <PostListCard posttitle={post?.title ?? "제목 없음"} />
                </div>
                <div className="flex flex-wrap justify-start gap-4 w-full sm:w-2/3">
                    <p className="flex items-center whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 ">
                        {post?.userinfo?.userid ?? "익명"}
                    </p>
                    <p className="flex items-center whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 ">
                        {post?.createdAt ?? "생성 날짜"}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-15 sm:gap-10">
                    {post?.options?.option1 && (
                        <OptionCard
                            total={totalvote}
                            options={post?.options?.option1}
                            onVote={() => onVote("option1")}
                            voted={hasVoted}
                        />
                    )}
                    <p className="text-2xl sm:text-4xl font-bold text-center sm:px-4">VS</p>
                    {post?.options?.option2 && (
                        <OptionCard
                            total={totalvote}
                            options={post?.options?.option2}
                            onVote={() => onVote("option2")}
                            voted={hasVoted}
                        />
                    )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 mt-4">
                    {/* 왼쪽 빈 영역 (데스크탑만 표시) */}
                    <div className="hidden sm:block sm:w-1/3" />

                    {/* 가운데 - 이전/다음 버튼 */}
                    {/* <div className="flex justify-center gap-4 w-full sm:w-1/3">
                        <button className="whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300">
                            {"<"}이전 질문
                        </button>
                        <button className=" whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300">
                            다음 질문{">"}
                        </button>
                    </div> */}

                    {/* 오른쪽 - 작성자/삭제 버튼 */}
                    <div className="flex justify-center sm:justify-end gap-4 w-full sm:w-1/3">
                        {/* <p className="flex items-center whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300">
                            {post?.userinfo?.userid ?? "익명"}
                        </p> */}
                        {isShow ? (
                            <>
                                <InputComponent
                                    placeholder="비밀번호"
                                    type="password"
                                    value={inputPw}
                                    onChange={(e) => {
                                        setInputPw(e.target.value);
                                    }}
                                />
                                <button
                                    className="whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300"
                                    disabled={deleteMutation.isPending}
                                    onClick={onDelete}
                                >
                                    삭제
                                </button>
                                <button
                                    className="whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300"
                                    onClick={() => {
                                        setIsShow(!isShow);
                                    }}
                                >
                                    취소
                                </button>
                            </>
                        ) : (
                            <button
                                className="whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300"
                                onClick={() => {
                                    setIsShow(!isShow);
                                }}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
export default PostPage;
