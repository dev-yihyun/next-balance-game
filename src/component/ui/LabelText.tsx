type Props = {
    text: string;
};

function LabelText({ text }: Props) {
    return <label className="text-xl font-bold block mb-2">{text}</label>;
}

export default LabelText;
