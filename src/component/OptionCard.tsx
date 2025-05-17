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
        <button
            title={options?.title || "선택지"}
            className={`flex flex-col rounded-md w-full max-w-[550px] sm:max-w-[40vw] h-auto items-center justify-evenly p-6 sm:p-8 shadow-md text-center overflow-hidden md:flex-wrap gap-5 transition-all duration-200 
    ${
        voted
            ? "bg-gray-500 opacity-50 cursor-not-allowed"
            : "bg-white hover:bg-gray-300 cursor-pointer"
    }`}
            onClick={onVote}
            disabled={voted}
        >
            <h1
                title={options?.title || "선택지"}
                className="text-2xl sm:text-3xl font-bold whitespace-normal sm:whitespace-normal"
            >
                {options?.title}
            </h1>
            {options?.description && (
                <>
                    <div className="w-full h-0.5 bg-gray-300 my-2" />
                    <p
                        title={options?.description || "설명글"}
                        className="text-base sm:text-lg whitespace-normal sm:whitespace-normal"
                    >
                        {options?.description}
                    </p>
                </>
            )}
            {voted && (
                <>
                    <div className="w-full h-0.5 bg-gray-300 my-2" />
                    <p
                        title={`${percent}%`}
                        className="text-base sm:text-lg whitespace-normal sm:whitespace-normal"
                    >
                        {`${percent}%`}
                    </p>
                    <p
                        title={`${totalvote}`}
                        className="text-base sm:text-lg whitespace-normal sm:whitespace-normal"
                    >
                        {totalvote}
                    </p>
                </>
            )}
        </button>
    );
}
export default OptionCard;
