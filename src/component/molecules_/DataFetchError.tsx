import Text from "../atoms_/Text";

type ErrorProp = {
    error?: Error;
};
function DataFetchError({ error }: ErrorProp) {
    return (
        <section className="h-screen flex flex-col justify-center items-center gap-10 text-center px-4">
            {/* <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl">
                ⚠️ 데이터 로딩 중 오류가 발생했습니다. ⚠️
            </h1>
            <div className="text-sm sm:text-base md:text-lg font-normal space-y-2">
                <p>⌛ 잠시 후 다시 시도해주세요. 🥸</p>
                <p>{`"An error has occurred: " + ${error?.message ?? "Unknown error"}`}</p>
            </div> */}
            <Text bold type="title">
                ⚠️ 데이터 로딩 중 오류가 발생했습니다. ⚠️
            </Text>
            <div className="space-y-2">
                <Text type="medium">⌛ 잠시 후 다시 시도해주세요. 🥸</Text>
                <Text type="medium">{`"An error has occurred: " + ${
                    error?.message ?? "Unknown error"
                }`}</Text>
            </div>
        </section>
    );
}

export default DataFetchError;
