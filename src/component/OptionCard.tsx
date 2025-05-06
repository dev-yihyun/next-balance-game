function OptionCard() {
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
                "
        >
            <h1 className="text-2xl sm:text-3xl font-bold whitespace-normal sm:whitespace-normal">
                제목
            </h1>
            <div className="w-full h-0.5 bg-gray-300 my-2" />
            <p className="text-base sm:text-lg whitespace-normal sm:whitespace-normal">부연설명</p>
        </div>
    );
}
export default OptionCard;
