import Text from "../atoms_/Text";
import PostErrorCard from "./PostErrorCard";

import React from "react";

type Props = {
    posttitle: string;
    pointer?: boolean;
};

function PostCard({ posttitle, pointer = true }: Props) {
    if (!posttitle) {
        return <PostErrorCard />;
    }

    return (
        <div
            className={`${
                pointer
                    ? "cursor-pointer hover:shadow-xl active:shadow-inner transition duration-200 ease-in-out "
                    : "cursor-default "
            } 
        bg-white border border-gray-700 rounded-lg 
        p-3 flex items-center justify-center  w-full `}
        >
            <Text bold type="medium">
                {posttitle ?? "⚠️ 오류 발생 관리자에게 문의하세요 🥸"}
            </Text>
        </div>
    );
}

export default React.memo(PostCard);
/* text-ellipsis whitespace-nowrap overflow-hidden*/
