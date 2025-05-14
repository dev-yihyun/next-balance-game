type Props = {
    options?: {
        title: string;
        description: string;
        voteCount: number;
    };
    voted?: boolean;
    onVote?: () => void;
};
function OptionCard({ options, onVote, voted }: Props) {
    return (
        <button
            className={`flex flex-col rounded-md w-full max-w-[550px] sm:max-w-[40vw] h-auto items-center justify-evenly p-6 sm:p-8 shadow-md text-center overflow-hidden md:flex-wrap gap-5 transition-all duration-200 
    ${
        voted
            ? "bg-gray-500 opacity-50 cursor-not-allowed"
            : "bg-white hover:bg-gray-300 cursor-pointer"
    }`}
            onClick={onVote}
            disabled={voted}
        >
            <h1 className="text-2xl sm:text-3xl font-bold whitespace-normal sm:whitespace-normal">
                {options?.title}
            </h1>
            {options?.description && (
                <>
                    <div className="w-full h-0.5 bg-gray-300 my-2" />
                    <p className="text-base sm:text-lg whitespace-normal sm:whitespace-normal">
                        {options?.description}
                    </p>
                </>
            )}
        </button>
    );
}
export default OptionCard;
