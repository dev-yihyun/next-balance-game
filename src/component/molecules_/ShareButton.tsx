"use client";

import Button from "../atoms_/Button";
import Text from "../atoms_/Text";

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

    // try-catch? then-catch?
    const handleShare = () => {
        if (!navigator.canShare()) {
            //Web Share API 사용 가능
            console.log("Web Share API 사용 가능");
            try {
                navigator.share(shareData);
            } catch (error) {
                console.error("공유 실패:", error);
                alert("문제가 발생했습니다. 다시 시도해 주세요.");
                return;
            }
        } else {
            // Web Share API 미지원: 링크 복사
            console.log(" Web Share API 미지원: 링크 복사");
            try {
                navigator.clipboard.writeText(shareData.url);
                alert("링크가 복사되었습니다!");
            } catch (error) {
                console.error("공유 실패:", error);
                alert("이 브라우저는 공유를 지원하지 않습니다.");
                return;
            }
        }
    };

    return (
        <Button buttonType="share" onClick={handleShare}>
            <Text bold type="medium">
                공유
            </Text>
        </Button>
    );
}
