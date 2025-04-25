import InputComponent from "./ui/InputComponent";
import LabelText from "./ui/LabelText";
import SubText from "./ui/SubText";

function CreateQuestionForm() {
    return (
        <>
            <section className=" h-full flex flex-col gap-10">
                <h1 className="font-bold text-4xl mt-10">🤡진짜 밸런스는 여기서 시작된다.🫨</h1>
                <div>
                    <form className="bg-white flex flex-col rounded-md p-5 gap-8">
                        <div>
                            <LabelText text="고르기 힘든 질문을 써봐!🤯" />
                            <InputComponent placeholder="제목" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <LabelText text="🥰 첫 번째 선택지는 뭐야?" />
                                <InputComponent placeholder="예: 평생 카레만 먹기" />
                            </div>
                            <div>
                                <LabelText text="두 번째 선택지, 더 세게 가보자 🤩" />
                                <InputComponent placeholder="예: 평생 짜장면만 먹기" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <LabelText text=" 이게 왜 더 괴로운지 설명해봐😇" />
                                <InputComponent placeholder="예: 이빨도 같이 카레색 됨" />
                            </div>
                            <div>
                                <LabelText text="더 쉽게 만들고 싶으면 여기에 써😈" />
                                <InputComponent placeholder="예: 밥, 국물, 탕수육 못먹음" />
                            </div>
                        </div>

                        <div>
                            <LabelText text="사용자 정보" />
                            <SubText text=" 이 비밀번호는 나중에 질문을 삭제할 때 사용됩니다. 꼭 기억해두세요!" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputComponent placeholder="사용자 아이디" />
                                <InputComponent type="password" placeholder="사용자 비밀번호" />
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
/*
- 글자수 최대 길이
*/
