type InputType = "text" | "password";

type Props = {
    type?: InputType;
    placeholder: string;
};

function InputComponent({ type = "text", placeholder }: Props) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black-400"
        />
    );
}

export default InputComponent;
