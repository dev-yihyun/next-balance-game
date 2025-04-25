function CreateQuestionForm() {
    return (
        <>
            <section className=" h-full flex flex-col gap-10">
                <h1 className="font-bold text-4xl mt-10">🤡진짜 밸런스는 여기서 시작된다.🫨</h1>
                <div>
                    <form className="bg-white flex flex-col rounded-md p-5 gap-8">
                        <div>
                            <label className="text-xl font-bold block mb-2 ">
                                고르기 힘든 질문을 써봐!🤯
                            </label>
                            <input
                                type="text"
                                placeholder="제목"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black-400"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xl font-bold  block mb-2">
                                    🥰 첫 번째 유혹은 뭐야?
                                </label>
                                <input
                                    type="text"
                                    placeholder="예: 평생 카레만 먹기"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black-400"
                                />
                            </div>
                            <div>
                                <label className="text-xl font-bold  block mb-2">
                                    두 번째 선택지, 더 세게 가보자 🤩
                                </label>
                                <input
                                    type="text"
                                    placeholder="예: 평생 짜장면만 먹기"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xl font-bold  block mb-2">
                                    이게 왜 더 괴로운지 설명해봐😇
                                </label>
                                <input
                                    type="text"
                                    placeholder="예: 이빨도 같이 카레색 됨"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black-400"
                                />
                            </div>
                            <div>
                                <label className="text-xl font-bold  block mb-2">
                                    더 쉽게 만들고 싶으면 여기에 써😈
                                </label>
                                <input
                                    type="text"
                                    placeholder="예: 밥, 국물, 탕수육 못먹음"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black-400"
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-2">사용자 정보</h2>
                            <p className="text-sm text-gray-500 mb-2">
                                이 비밀번호는 나중에 질문을 삭제할 때 사용됩니다. 꼭 기억해두세요!
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="사용자 아이디"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black-400"
                                />
                                <input
                                    type="password"
                                    placeholder="사용자 비밀번호"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black-400"
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <button className=" bg-green-600 hover:bg-green-700 text-white text-lg font-bold p-3 rounded-md transition cursor-pointer">
                                질문 생성
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default CreateQuestionForm;
{
    /* <label>고르기 힘든 질문을 써봐 🥸</label>
                        <input type="text" placeholder="제목목" />
                        <label>😃첫 번째 유혹은 뭐야?</label>
                        <input
                            type="text"
                            placeholder="예: 평생 카레만 먹기
"
                        />
                        <label>두 번째 선택지, 더 세게 가보자 😫</label>
                        <input
                            type="text"
                            placeholder="예: 평생 짜장면만 먹기
"
                        />
                        <label>이게 왜 더 괴로운지 설명해봐🤩</label>
                        <input
                            type="text"
                            placeholder="예: 이빨도 같이 카레색 됨
"
                        />
                        <label>더 싫게 만들고 싶으면 여기에 써👹</label>
                        <input
                            type="text"
                            placeholder="예: 밥, 국물 ,탕수육 못먹음
"
                        />
                        <label>사용자 정보</label>
                        <p>이 비밀번호는 나중에 질문을 삭제할 때 사용됩니다. 꼭 기억해두세요!</p>
                        <input
                            type="text"
                            placeholder="사용자 아이디
"
                        />
                        <input
                            type="password"
                            placeholder="사용자 비밀번호
"
                        />
                        <button type="submit">질문 생성</button> */
}
