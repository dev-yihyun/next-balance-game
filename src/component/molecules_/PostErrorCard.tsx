import Text from "../atoms_/Text";

function PostErrorCard() {
    return (
        <div className="w-full h-10 md:h-14 flex items-center justify-center rounded-md bg-gray-300">
            {/* className="text-gray-700 text-sm" */}
            <Text bold type="medium">
                포스트 정보를 불러오지 못했습니다.
            </Text>
        </div>
    );
}

export default PostErrorCard;
