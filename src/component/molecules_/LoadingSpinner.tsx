import React from "react";
import Loading from "../atoms_/Loading";

function LoadingSpinner() {
    return (
        <section className="h-screen flex flex-col justify-center items-center gap-10 text-center px-4">
            <Loading />
        </section>
    );
}

export default React.memo(LoadingSpinner);
