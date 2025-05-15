import NavBar from "@/component/NavBar";

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <NavBar />
            <main>{children}</main>
        </section>
    );
}
export default MainLayout;
