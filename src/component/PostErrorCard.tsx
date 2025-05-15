function PostErrorCard() {
    return (
        <div className="w-full h-10 md:h-14 flex items-center justify-center rounded-md bg-gray-300">
            <p className="text-gray-700 text-sm">포스트 정보를 불러오지 못했습니다.</p>
        </div>
    );
}

export default PostErrorCard;
