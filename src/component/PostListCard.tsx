import PostErrorCard from "./PostErrorCard";

type Props = {
    posttitle: string;
    pointer?: boolean; // 선택적 prop으로 지정
};

function PostListCard({ posttitle, pointer = true }: Props) {
    if (!posttitle) {
        return <PostErrorCard />;
    }

    return (
        <p
            title={posttitle}
            className={`
                w-full 
                h-10 sm:h-12 md:h-14 lg:h-16 
                flex items-center justify-center 
                ${pointer ? "cursor-pointer" : "cursor-default"} 
                rounded-md 
                bg-[linear-gradient(to_right,_#FF5A5F,_#0099FF)]
                text-white font-bold 
                text-base sm:text-base md:text-base lg:text-xl
                px-2 text-center
                text-ellipsis whitespace-nowrap overflow-hidden
            `}
        >
            {posttitle ?? "⚠️ 오류 발생 관리자에게 문의하세요 🥸"}
        </p>
    );
}

export default PostListCard;
