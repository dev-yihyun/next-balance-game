"use client";

import { MAX } from "@/types/new/type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputComponent from "./ui/InputComponent";
import LabelText from "./ui/LabelText";
import SubText from "./ui/SubText";

type DataType = {
    option1: string;
    option1description: string;
    option2: string;
    option2description: string;
    title: string;
    userId: string;
    userPw: string;
};

function CreateQuestionForm() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option1description, setOption1Description] = useState("");
    const [option2description, setOption2Description] = useState("");
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");

    const isValidLength =
        title.length <= MAX.title &&
        option1.length <= MAX.option &&
        option2.length <= MAX.option &&
        option1description.length <= MAX.reason &&
        option2description.length <= MAX.reason &&
        userId.length <= MAX.userId &&
        userPw.length <= MAX.password;

    const isFormValid =
        title.trim() !== "" &&
        option1.trim() !== "" &&
        option2.trim() !== "" &&
        userId.trim() !== "" &&
        userPw.trim() !== "" &&
        isValidLength;
    const createQuestion = async (data: DataType) => {
        const response = await fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("질문 생성 실패");
        }

        return response.json();
    };
    const setOnSuccess = () => {
        setTitle("");
        setOption1("");
        setOption2("");
        setOption1Description("");
        setOption2Description("");
        setUserId("");
        setUserPw("");
        alert("질문이 성공적으로 등록되었습니다! 메인으로 이동합니다.");
        router.push("/main");
    };
    const setOnError = (error: string) => {
        console.error("오류 발생:", error);
        alert("질문 등록 중 오류가 발생했습니다!  메인으로 이동합니다.");
        router.push("/main");
    };
    const insertQuestionMutation = useMutation({
        mutationFn: createQuestion,
        onSuccess: setOnSuccess,
        onError: setOnError,
    });

    const onCreate = async () => {
        if (!isFormValid) {
            alert("모든 필드를 공백 없이 입력해주세요!");
            return;
        }

        const addData = {
            title,
            option1,
            option2,
            option1description,
            option2description,
            userId,
            userPw,
        };

        insertQuestionMutation.mutate(addData);
    };
    return (
        <>
            <section className=" h-full flex flex-col gap-10">
                <h1 className="font-bold text-4xl mt-10">🤡진짜 밸런스는 여기서 시작된다.🫨</h1>
                <div>
                    <form className="bg-white flex flex-col rounded-md p-5 gap-8">
                        <div>
                            <LabelText text="🤯 고르기 힘든 질문을 써봐!" />
                            <InputComponent
                                placeholder="제목"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={50}
                            />
                        </div>
                        <div
                            className="border border-red-300 
                        p-5 rounded-md
                        grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div>
                                <LabelText text="🥰 첫 번째 선택지는 뭐야?" />
                                <InputComponent
                                    placeholder="예: 평생 카레만 먹기"
                                    required
                                    value={option1}
                                    onChange={(e) => setOption1(e.target.value)}
                                    maxLength={30}
                                />
                            </div>
                            <div>
                                <LabelText text=" 이게 왜 더 괴로운지 설명해봐" />
                                <InputComponent
                                    placeholder="예: 이빨도 같이 카레색 됨"
                                    value={option1description}
                                    onChange={(e) => setOption1Description(e.target.value)}
                                    maxLength={50}
                                />
                            </div>
                        </div>

                        <div
                            className="
                        border border-blue-300 
                        p-5 rounded-md
                        grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div>
                                <LabelText text="🤩 두 번째 선택지, 더 세게 가보자 " />
                                <InputComponent
                                    placeholder="예: 평생 짜장면만 먹기"
                                    required
                                    value={option2}
                                    onChange={(e) => setOption2(e.target.value)}
                                    maxLength={30}
                                />
                            </div>
                            <div>
                                <LabelText text="더 어렵게 만들고 싶으면 여기에 써" />
                                <InputComponent
                                    placeholder="예: 밥, 국물, 탕수육 못먹음"
                                    value={option2description}
                                    onChange={(e) => setOption2Description(e.target.value)}
                                    maxLength={50}
                                />
                            </div>
                        </div>

                        <div>
                            <LabelText text="ℹ️ 사용자 정보" />
                            <SubText text=" 이 비밀번호는 나중에 질문을 삭제할 때 사용됩니다. 꼭 기억해두세요!" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputComponent
                                    placeholder="사용자 아이디"
                                    required
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    maxLength={10}
                                />
                                <InputComponent
                                    type="password"
                                    placeholder="사용자 비밀번호"
                                    required
                                    value={userPw}
                                    onChange={(e) => setUserPw(e.target.value)}
                                    maxLength={10}
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <button
                                type="button"
                                disabled={!isFormValid}
                                className={`text-white text-lg font-bold p-3 rounded-md transition
                                    ${
                                        isFormValid
                                            ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                                            : "bg-green-300 cursor-not-allowed opacity-50"
                                    }
                                `}
                                onClick={onCreate}
                            >
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
