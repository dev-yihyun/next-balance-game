"use client";

import { Post } from "@/model/post";
import { useQuery } from "@tanstack/react-query";
import DataFetchError from "./DataFetchError";
import LoadingSpinner from "./LoadingSpinner";
import PostEmpty from "./PostEmpty";
import PostListCard from "./PostListCard";

/*
[TODO]
무한 스크롤
*/

function PostList() {
    const getFetchPosts = async () => {
        const response = await fetch("/api/post");
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "포스트를 불러오는 데 실패했습니다.");
        }
        return data?.data; // posts 배열
    };

    const {
        isLoading,
        error,
        data: posts,
    } = useQuery({
        queryKey: ["posts"],
        queryFn: getFetchPosts,
    });

    if (isLoading) return <LoadingSpinner />;

    if (error) return <DataFetchError error={error} />;
    return (
        <section className="flex flex-col gap-5 p-5 pt-10 h-auto ">
            {posts.length === 0 ? (
                <PostEmpty />
            ) : (
                <>
                    {posts.map((post: Post) => (
                        <PostListCard key={post.postid} post={post} />
                    ))}
                </>
            )}
        </section>
    );
}

export default PostList;
