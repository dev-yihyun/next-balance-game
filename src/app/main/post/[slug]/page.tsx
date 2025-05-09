"use client";

import DataFetchError from "@/component/DataFetchError";
import LoadingSpinner from "@/component/LoadingSpinner";
import OptionCard from "@/component/OptionCard";
import PostListCard from "@/component/PostListCard";
import { useQuery } from "@tanstack/react-query";

/*
[TODO]
postid가 없는 경우
존재하지 않는 데이터
*/

type Post = {
    postid: string;
    createdAt: string; // 또는 Date
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
    const fetchPost = async () => {
        const response = await fetch(`/api/post/${params.slug}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "포스트를 불러오는 데 실패했습니다.");
        }
        return data?.data;
    };

    const { isLoading, error, data: post } = useQuery({ queryKey: ["posts"], queryFn: fetchPost });
    if (isLoading) return <LoadingSpinner />;

    if (error) return <DataFetchError error={error} />;
    return (
        <>
            <section className="flex flex-col gap-5 p-5 pt-10 h-auto ">
                <div className="">
                    <PostListCard posttitle={post?.title ?? "제목 없음"} />
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-around sm:items-center gap-15 sm:gap-10">
                    {post?.options?.option1 && <OptionCard options={post?.options?.option1} />}
                    <p className="text-2xl sm:text-4xl font-bold text-center sm:px-4">VS</p>
                    {post?.options?.option2 && <OptionCard options={post?.options?.option2} />}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 mt-4">
                    {/* 왼쪽 빈 영역 (데스크탑만 표시) */}
                    <div className="hidden sm:block sm:w-1/3" />

                    {/* 가운데 - 이전/다음 버튼 */}
                    <div className="flex justify-center gap-4 w-full sm:w-1/3">
                        <button className="whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300">
                            {"<"}이전 질문
                        </button>
                        <button className=" whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300">
                            다음 질문{">"}
                        </button>
                    </div>

                    {/* 오른쪽 - 작성자/삭제 버튼 */}
                    <div className="flex justify-center sm:justify-end gap-4 w-full sm:w-1/3">
                        <p className="flex items-center whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300">
                            {post?.userinfo?.userid ?? "익명"}
                        </p>
                        <button className="whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300">
                            삭제
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
export default PostPage;
