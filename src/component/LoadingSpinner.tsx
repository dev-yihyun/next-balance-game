import { BeatLoader } from "react-spinners";

function LoadingSpinner() {
    return (
        <section className="h-screen flex flex-col justify-center items-center gap-10 text-center px-4">
            <BeatLoader color="#000000" size={25} />
        </section>
    );
}

export default LoadingSpinner;
