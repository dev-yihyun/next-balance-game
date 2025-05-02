function PostEmpty() {
    return (
        <>
            <section className="h-screen flex flex-col justify-center items-center gap-10 text-center px-4">
                <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl">
                    🚧 아직 게시글이 없습니다. 🚧
                </h1>
                <div className="text-sm sm:text-base md:text-lg font-normal space-y-2">
                    <p>
                        아직 참여한 사람이 없어요.
                        <br /> 첫 이야기를 나눠볼까요?
                    </p>
                </div>
            </section>
        </>
    );
}

export default PostEmpty;
