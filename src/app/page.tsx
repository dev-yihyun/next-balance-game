import Link from "next/link";

export default function Home() {
    return (
        <section className="h-screen flex flex-col justify-center items-center gap-10 px-4">
            <img
                src="/images/balancegame.png"
                alt="balancegame"
                className="w-[250px] sm:w-[300px] md:w-[400px] drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]"
            />

            <div className="text-center font-bold text-xl sm:text-2xl md:text-3xl space-y-1">
                <p>딱 하나만 고른다면?</p>
                <p>극한의 선택, 당신이라면 어느 쪽?</p>
            </div>

            <Link
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl sm:text-3xl md:text-4xl px-4 py-2 sm:px-6 sm:py-3 rounded-md cursor-pointer"
                href={"/main"}
            >
                START
            </Link>
        </section>
    );
}
