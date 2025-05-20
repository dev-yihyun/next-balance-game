"use client";

import { Post } from "@/types/post";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataFetchError from "./DataFetchError";
import LoadingSpinner from "./LoadingSpinner";
import PostEmpty from "./PostEmpty";
import PostListCard from "./PostListCard";

function PostList() {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const getFetchPosts = async () => {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch("/api/post");
        const data = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setIsError(true);
            throw new Error(data.message || "포스트를 불러오는 데 실패했습니다.");
        }
        return data?.data;
    };

    const setOnSuccess = (data: Post[]) => {
        setPosts(data);
        setIsLoading(false);
        setIsError(false);
    };

    const setOnError = (error: string) => {
        console.error(`오류: ${error}`);
        setIsLoading(false);
        setIsError(true);
    };

    const fetchPostMutation = useMutation({
        mutationFn: getFetchPosts,
        onSuccess: setOnSuccess,
        onError: setOnError,
    });

    useEffect(() => {
        fetchPostMutation.mutate();
    }, []);

    return (
        <section className="flex flex-col gap-5 p-5 pt-10 h-auto ">
            {isLoading ? (
                <LoadingSpinner />
            ) : isError ? (
                <DataFetchError />
            ) : posts?.length === 0 ? (
                <PostEmpty />
            ) : (
                <>
                    {posts?.map((post: Post) => (
                        <Link key={post.postid} href={`/main/post/${post?.postid}`}>
                            <PostListCard posttitle={post?.title ?? ""} />
                        </Link>
                    ))}
                </>
            )}
        </section>
    );
}

export default PostList;
