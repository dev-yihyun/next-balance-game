import PostErrorCard from "./PostErrorCard";

type Props = {
    posttitle: string;
};

function PostListCard({ posttitle }: Props) {
    if (!posttitle) {
        return <PostErrorCard />;
    }
    return (
        <p
            className="
        w-full h-10 md:h-14 flex items-center justify-center cursor-pointer rounded-md bg-[linear-gradient(to_right,_#FF5A5F,_#0099FF)]
        text-white font-bold lg:text-xl  md:text-base sm:text-xs"
        >
            {posttitle ?? "⚠️ 오류 발생 관리자에게 문의하세요 🥸"}
        </p>
    );
}

export default PostListCard;
