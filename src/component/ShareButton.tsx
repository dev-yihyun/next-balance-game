"use client";
type ShareData = {
    title?: string;
    text?: string;
    url?: string;
    files?: File[];
};
type Props = {
    posttitle: string;
};
export default function ShareButton({ posttitle }: Props) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: posttitle || "킹받는 밸런스 게임 - 너라면 뭘 고를래?",
                    text: "같은 질문, 다른 선택. 공유하고 누가 더 이상한지(?) 확인해보자!",
                    url: window.location.href,
                });
            } catch (err) {
                console.error("공유 실패:", err);
            }
        } else {
            alert("이 브라우저는 공유를 지원하지 않습니다.");
        }
    };

    return (
        <button
            className="whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300"
            type="button"
            onClick={handleShare}
        >
            공유하기
        </button>
    );
}
