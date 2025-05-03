type InputType = "text" | "password";

type Props = {
    type?: InputType;
    placeholder: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
    showLength?: boolean;
};

function InputComponent({
    type = "text",
    placeholder,
    required = false,
    value = "",
    onChange,
    maxLength,
    showLength = false,
}: Props) {
    const isOverLimit = maxLength !== undefined && value.length > maxLength;
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 transition
                ${
                    isOverLimit
                        ? "border-red-500 ring-red-500"
                        : "border-gray-300 focus:ring-black-400"
                }
            `}
            />
            {showLength && maxLength !== undefined && (
                <div className="text-sm text-right text-gray-500">
                    {value.length}/{maxLength}
                </div>
            )}
            {/* 오류 메시지 */}
            {isOverLimit && (
                <div className="text-sm text-red-500">
                    ❌ 글자 수가 {maxLength}자를 초과했습니다.
                </div>
            )}
        </>
    );
}

export default InputComponent;
