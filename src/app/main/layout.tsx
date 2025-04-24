import NavBar from "@/component/NavBar";

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <NavBar />
            {children}
        </section>
    );
}
export default MainLayout;
