import { Post } from "@/model/post";
import PostErrorCard from "./PostErrorCard";

type Props = {
    post: Post;
};

function PostListCard({ post }: Props) {
    if (!post || !post.title) {
        return <PostErrorCard />;
    }
    return (
        <div className="w-full h-10 md:h-14 flex items-center justify-center cursor-pointer rounded-md bg-[linear-gradient(to_right,_#FF5A5F,_#0099FF)]">
            <p className="text-white font-bold lg:text-xl  md:text-base sm:text-xs">
                {post?.title ?? "⚠️ 오류 발생 관리자에게 문의하세요 🥸"}
            </p>
        </div>
    );
}

export default PostListCard;
