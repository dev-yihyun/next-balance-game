type Props = {
    options?: {
        title: string;
        description: string;
        voteCount: number;
    };
};
function OptionCard({ options }: Props) {
    return (
        <div
            className="flex flex-col
                bg-white rounded-md
                w-full   max-w-[550px] sm:max-w-[40vw] 
                h-auto
                items-center justify-evenly
                p-6 sm:p-8 shadow-md
                text-center
                overflow-hidden
                md:flex-wrap
                gap-5
                cursor-pointer
                "
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
        </div>
    );
}
export default OptionCard;
