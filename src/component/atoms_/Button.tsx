import React from "react";

type ButtonType = "confirm" | "cancel" | "share" | "report" | "basic" | "default" | "none";

type Props = {
    children: string | React.ReactNode;
    buttonType?: ButtonType;
    disabled?: boolean;
    onClick?: () => void;
};

function Button({ children, buttonType = "default", disabled = false, onClick }: Props) {
    //  px-4 py-2  sm:px-6 sm:py-3
    // sm:text-3xl md:text-4xl

    // text-2xl
    //  bg-white hover:bg-gray-300 cursor-pointer rounded-md shadow-lg hover:shadow-xl active:shadow-inner transition duration-200 ease-in-out
    const basicStyle =
        "font-bold px-4 py-2 rounded cursor-pointer shadow-lg hover:shadow-xl active:shadow-inner transition duration-200 ease-in-out ";
    const typeStyle = () => {
        if (disabled) {
            if (buttonType === "none") {
                return "w-full p-5 rounded-md bg-gray-300 text-gray-500 cursor-not-allowed opacity-50";
            }
            return "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50";
        }

        switch (buttonType) {
            case "none":
                return "w-full p-5    bg-white hover:bg-gray-300 cursor-pointer rounded-md shadow-lg hover:shadow-xl active:shadow-inner transition duration-200 ease-in-out";
            case "confirm":
                return "bg-[#FBCB0A] hover:bg-[#e6b809] active:bg-[#cc9e07]";
            case "basic":
                return "bg-blue-500 hover:bg-blue-600 active:bg-blue-700";
            case "cancel":
                return "bg-[#D9D9D9] hover:bg-[#c0c0c0] active:bg-[#a8a8a8]";
            case "share":
                return "bg-[#2C73D2] text-white hover:bg-[#2462b3] active:bg-[#1c5194]";
            case "report":
                return "bg-[#FF6B6B] hover:bg-[#e55e5e] active:bg-[#cc5050]";
            case "default":
            default:
                return "bg-[#F2F2F2] hover:bg-[#f2f2f2] active:bg-[#e5e5e5]";
        }
    };

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`${buttonType !== "none" ? basicStyle : ""} ${typeStyle()} `}
        >
            {children}
        </button>
    );
}

export default React.memo(Button);
