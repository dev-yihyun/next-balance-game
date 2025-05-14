"use client";

import DataFetchError from "@/component/DataFetchError";
import LoadingSpinner from "@/component/LoadingSpinner";
import OptionCard from "@/component/OptionCard";
import PostListCard from "@/component/PostListCard";
import InputComponent from "@/component/ui/InputComponent";
import { useQuery } from "@tanstack/react-query";
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
    const router = useRouter();
    const [isShow, setIsShow] = useState(false);
    const [inputPw, setInputPw] = useState("");

    const [hasVoted, setHasVoted] = useState(false);
    const postId = params.slug;

    /*
    [TODO]
    - React-Query
    - 선택한 데이터 업데이트
        - 데이터 저장 성공시 : 로컬에 저장
        - 데이터 저장 실패시 : ""
    - 결과 보여주기
    */

    /*
    const votes = JSON.parse(localStorage.getItem("votes") || "{}");
    // (localStorage.getItem("votes") : 브라우저 로컬 스토리지에서 "votes" 라는 키에 저장 된 값을 가져온다.
    // 이 값은 보통 문자열형태의 JSON이다.
    // ex){"123": "option1", "456": "option2"}
    //   || "{}" : 만약 "votes"키가 존재하지 않거나 null 이라면 {}(빈 객체 문자열)을 대신 사용
    // 즉 , 초기 로컬 스토리지가 비어있는 경우에도 오류없이 동작
    // JSON.parse(...) : 문자열 형태인 JSON을 javascript 객체로 변환
    // 예: "{}" → {}
    // "{"123": "option1"}" → { 123: "option1" }
    */
    useEffect(() => {
        const votes = JSON.parse(localStorage.getItem("votes") || "{}");
        if (votes[postId]) {
            setHasVoted(true);
        }
    }, [postId]);
    const onVote = async (optionKey: "option1" | "option2") => {
        const votes = JSON.parse(localStorage.getItem("votes") || "{}");
        // 중복 투표 방지
        if (votes[postId]) {
            alert("이미 투표하셨습니다.");
            return;
        }
        try {
            // 서버에 투표 요청 보내기
            const response = await fetch(`/api/post/${params.slug}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ option: optionKey }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "투표 실패");
            // 성공 시 로컬 스토리지에 저장
            votes[postId] = optionKey;
            localStorage.setItem("votes", JSON.stringify(votes));
            setHasVoted(true);
        } catch (error) {
            alert("투표에 실패했습니다.");
            console.error(error);
        }
    };

    const fetchPost = async () => {
        const response = await fetch(`/api/post/${params.slug}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "포스트를 불러오는 데 실패했습니다.");
        }
        return data?.data;
    };

    const onDelete = async () => {
        try {
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

                throw new Error(result.message || "삭제 실패");
            }

            alert("삭제되었습니다.");
            router.push("/main");
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
            setInputPw("");
            setIsShow(false);
        }
    };

    const { isLoading, error, data: post } = useQuery({ queryKey: ["posts"], queryFn: fetchPost });

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
                            options={post?.options?.option1}
                            onVote={() => onVote("option1")}
                            voted={hasVoted}
                        />
                    )}
                    <p className="text-2xl sm:text-4xl font-bold text-center sm:px-4">VS</p>
                    {post?.options?.option2 && (
                        <OptionCard
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
