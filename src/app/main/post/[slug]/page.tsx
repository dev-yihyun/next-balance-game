"use client";

import DataFetchError from "@/component/DataFetchError";
import LoadingSpinner from "@/component/LoadingSpinner";
import OptionCard from "@/component/OptionCard";
import PostListCard from "@/component/PostListCard";
import InputComponent from "@/component/ui/InputComponent";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    const fetchPost = async () => {
        const response = await fetch(`/api/post/${params.slug}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "포스트를 불러오는 데 실패했습니다.");
        }
        return data?.data;
    };
    const [isShow, setIsShow] = useState(false);
    const [inputPw, setInputPw] = useState("");
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
                    {post?.options?.option1 && <OptionCard options={post?.options?.option1} />}
                    <p className="text-2xl sm:text-4xl font-bold text-center sm:px-4">VS</p>
                    {post?.options?.option2 && <OptionCard options={post?.options?.option2} />}
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
