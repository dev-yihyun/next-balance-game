function NavBar() {
    return (
        <nav className="w-full px-6 pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
            {/* Logo */}
            <div className="flex justify-center sm:justify-start ">
                <img
                    src="/images/balancegame.png"
                    alt="balancegame"
                    className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]"
                    width={150}
                    height={150}
                />
            </div>

            {/* Menu */}
            <div className="flex justify-center sm:justify-end gap-6 sm:gap-10 text-lg sm:text-xl mt-5 md:text-2xl font-bold">
                <p>전체</p>
                <p>만들기</p>
            </div>
        </nav>
    );
}

export default NavBar;
