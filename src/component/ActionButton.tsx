type Variant = "default" | "delete" | "primary";

type Props = {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: Variant;
};

function ActionButton({ text, onClick, disabled = false, variant = "default" }: Props) {
    const baseClass = "whitespace-nowrap rounded-md p-2 font-bold cursor-pointer";
    const variantClasses: Record<Variant, string> = {
        default: "bg-gray-200 hover:bg-gray-300",
        delete: "bg-red-300 hover:bg-red-400",
        primary: "bg-blue-500 text-white hover:bg-blue-600",
    };

    return (
        <button
            className={`${baseClass} ${variantClasses[variant]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default ActionButton;
