import OptionCard from "@/component/OptionCard";
import PostListCard from "@/component/PostListCard";

async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: postid } = await params;

    return (
        <>
            <section className="flex flex-col gap-5 p-5 pt-10 h-auto ">
                <div className="">
                    <PostListCard posttitle={"텍스트입니다."} />
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-around sm:items-center gap-15 sm:gap-10">
                    <OptionCard />
                    <p className="text-2xl sm:text-4xl font-bold text-center sm:px-4">VS</p>
                    <OptionCard />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 mt-4">
                    {/* 왼쪽 빈 영역 (데스크탑만 표시) */}
                    <div className="hidden sm:block sm:w-1/3" />

                    {/* 가운데 - 이전/다음 버튼 */}
                    <div className="flex justify-center gap-4 w-full sm:w-1/3">
                        <button className="whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300">
                            {"<"}이전 질문
                        </button>
                        <button className=" whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300">
                            다음 질문{">"}
                        </button>
                    </div>

                    {/* 오른쪽 - 작성자/삭제 버튼 */}
                    <div className="flex justify-center sm:justify-end gap-4 w-full sm:w-1/3">
                        <p className="flex items-center whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300">
                            작성자이름
                        </p>
                        <button className="whitespace-nowrap rounded-md p-2 font-bold bg-gray-200 cursor-pointer hover:bg-gray-300">
                            삭제
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
export default PostPage;
