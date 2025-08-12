import NavBar from "@/component/molecules_/NavBar";

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <NavBar />
            <main>{children}</main>
        </section>
    );
}
export default MainLayout;
