import PostList from "@/component/PostList";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "ComingSoon",
    description: "더 나은 서비스를 위해 해당 페이지를 개발 중입니다.",
};

function MainPage() {
    return (
        <>
            <PostList />
        </>
    );
}

export default MainPage;
