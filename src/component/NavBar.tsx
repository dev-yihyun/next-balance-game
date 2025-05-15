import Link from "next/link";

const NAV_ITEMS = [
    { href: "/main", label: "전체" },
    { href: "/main/new", label: "만들기" },
];
function NavBar() {
    return (
        <nav className="w-full px-6 pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
            <div className="flex justify-center sm:justify-start">
                <Link href={"/main"}>
                    <img
                        src="/images/balancegame.png"
                        alt="Balance Game Logo"
                        className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]"
                        width={150}
                        height={150}
                    />
                </Link>
            </div>

            <div className="flex justify-center sm:justify-end gap-6 sm:gap-10 text-lg sm:text-xl md:text-2xl font-bold mt-5">
                {NAV_ITEMS.map((item) => (
                    <Link key={item.label} href={item.href} className="hover:underline">
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default NavBar;
