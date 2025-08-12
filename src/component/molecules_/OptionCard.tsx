import Button from "../atoms_/Button";
import Text from "../atoms_/Text";

type Props = {
    options?: {
        title: string;
        description: string;
        voteCount: number;
    };
    total?: number;
    voted?: boolean;
    onVote?: () => void;
};
function OptionCard({ options, onVote, voted, total = 0 }: Props) {
    const totalvote = options?.voteCount || 0;
    const percent = total > 0 ? ((totalvote / total) * 100).toFixed(1) : "0.0";

    return (
        // <div>
        <Button buttonType="none" disabled={voted} onClick={onVote}>
            {/* <div className="flex flex-col rounded-md w-full max-w-full sm:max-w-[550px] h-auto items-center justify-evenly p-6 sm:p-8 shadow-md text-center overflow-hidden md:flex-wrap gap-5 transition-all duration-200"> */}
            <div className="flex flex-col gap-5">
                <Text bold type="large">
                    {options?.title || "선택지"}
                </Text>
                {options?.description && (
                    <>
                        <div className="w-full h-0.5 bg-gray-300 my-2" />
                        <Text type="medium">{options?.description || "선택지"}</Text>
                    </>
                )}
                {voted && (
                    <>
                        <div className="w-full h-0.5 bg-gray-300 my-2" />
                        <Text type="medium">{percent}%</Text>
                        <Text type="medium">{totalvote}</Text>
                    </>
                )}
            </div>
        </Button>
        // </div>
    );
}
export default OptionCard;
