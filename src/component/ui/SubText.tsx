type Props = {
    text: string;
};

function SubText({ text }: Props) {
    return <p className="text-sm text-gray-500 block mb-2">{text}</p>;
}

export default SubText;
