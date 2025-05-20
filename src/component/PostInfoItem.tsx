type Props = {
    title: string;
    value: string;
};

function PostMetaItem({ title, value }: Props) {
    return (
        <p
            title={title}
            className="flex items-center whitespace-nowrap rounded-md p-2 font-bold bg-gray-200"
        >
            {value}
        </p>
    );
}

export default PostMetaItem;
