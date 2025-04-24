function ComingSoonMessage() {
    return (
        <section className="h-screen flex flex-col justify-center items-center gap-10 text-center px-4">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl">🚧 준비중 입니다. 🚧</h1>
            <div className="text-sm sm:text-base md:text-lg font-normal space-y-2">
                <p>📢 더 나은 서비스를 위해 해당 페이지를 개발 중입니다.</p>
                <p>조금만 기다려주세요! 🫡</p>
            </div>
        </section>
    );
}

export default ComingSoonMessage;
