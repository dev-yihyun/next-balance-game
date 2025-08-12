"use client";

import ActionButton from "./ActionButton";

type Props = {
    posttitle: string;
};
export default function ShareButton({ posttitle }: Props) {
    console.log("##", posttitle);
    // const userBrowser = window.navigator.userAgent;
    const getShareUrl = typeof window !== "undefined" ? window.location.href : "";

    const shareData = {
        title: posttitle || "킹받는 밸런스 게임 - 너라면 뭘 고를래?",
        text: "어떤 선택을 할까?",
        url: getShareUrl,
    };

    const handleShare = async () => {
        if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
            await navigator
                .share(shareData)
                .then(() => {
                    console.log("성공적으로 공유되었습니다.");
                    return;
                })
                .catch((error) => {
                    console.log("공유 실패:", error);
                    alert("이 브라우저는 공유를 지원하지 않습니다.");
                    return;
                });
        } else {
            // Web Share API를 지원하지 않는 경우 대체 공유 기능 구현
            console.log("Web Share API를 지원하지 않는 환경입니다.");
            navigator.clipboard.writeText(shareData.url);
            alert("링크가 복사되었습니다!");
        }
        // try {
        //     if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
        //         await navigator.share(shareData);
        //         return;
        //     } else {
        //         navigator.clipboard.writeText(shareData.url);
        //         alert("링크가 복사되었습니다!");
        //     }
        // } catch (error) {
        //     console.error("공유 실패:", error);
        //     alert("이 브라우저는 공유를 지원하지 않습니다.");
        //     return;
        // }
    };

    return <ActionButton text="공유하기" onClick={handleShare} variant="primary" />;
}
