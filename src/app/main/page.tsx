import PostList from "@/component/PostList";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "극한의 선택, 당신이라면 어느 쪽?",
    description: "절대 고르고 싶지 않지만… 꼭 골라야 하는 밸런스 지옥!",
};

function MainPage() {
    return <PostList />;
}

export default MainPage;
