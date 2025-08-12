import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/balancegame.png";
import Text from "../atoms_/Text";

const NAV_ITEMS = [
    { href: "/main", label: "전체" },
    { href: "/main/new", label: "만들기" },
];
function NavBar() {
    return (
        <nav className="w-full px-6 pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
            <div className="flex justify-center sm:justify-start">
                <Link href={"/main"}>
                    <Image
                        src={Logo}
                        alt="Balance Game Logo"
                        className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]"
                        width={150}
                        height={150}
                        priority
                    />
                </Link>
            </div>
            {/* text-lg sm:text-xl md:text-2xl font-bold  */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-6 sm:gap-10 mt-5">
                {NAV_ITEMS.map((item) => (
                    <Link
                        rel="preload"
                        key={item.label}
                        href={item.href}
                        className="hover:underline cursor-pointer"
                    >
                        <Text bold type="large">
                            {item.label}
                        </Text>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default NavBar;
