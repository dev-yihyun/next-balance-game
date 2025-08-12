import React from "react";

type Props = {
    children: string | React.ReactNode; //  | React.ReactNode
    type?: "default" | "small" | "medium" | "large" | "title";
    bold?: boolean;
};

function Text({ children, type = "default", bold = false }: Props) {
    // const basicStyle = "sm:text-2xl md:text-3xl"; ${basicStyle}
    // sm:bg-blue-200 md:bg-red-200 lg:bg-gray-200
    // sm: md: lg:
    const textSize = () => {
        switch (type) {
            case "small":
                return "text-sm";
            case "medium":
                return "text-xl sm:text-base md:text-lg lg:text-xl ";
            case "large":
                return "text-3xl sm:text-xl md:text-3xl lg:text-3xl ";
            case "title":
                return "text-5xl sm:text-xl md:text-3xl lg:text-5xl";
            case "default":
                return "text-base";
            default:
                return "text-base";
        }
    };

    return <p className={` ${textSize()} ${bold ? "font-bold" : "font-normal"}  `}>{children}</p>;
}

export default React.memo(Text);
