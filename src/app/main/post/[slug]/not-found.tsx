import MessageCard from "@/component/molecules_/MessageCard";
import React from "react";

function NotFound() {
    return (
        <MessageCard
            title="⚠️404 - 페이지를 찾을 수 없습니다⚠️"
            description="😲해당 게시글이 존재하지 않아요."
        />
    );
}

export default React.memo(NotFound);
