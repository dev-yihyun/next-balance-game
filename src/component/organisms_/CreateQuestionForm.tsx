"use client";

import { MAX } from "@/types/new/type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../atoms_/Button";
import Input from "../atoms_/Input";
import Text from "../atoms_/Text";

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
        <section className=" h-full flex flex-col gap-10 mt-10">
            <Text bold type="title">
                🤡진짜 밸런스는 여기서 시작된다.🫨
            </Text>
            <div>
                <form className="bg-white flex flex-col rounded-md border border-[#c1bfbf] p-5 gap-8">
                    <div className="flex flex-col gap-4">
                        <Text bold type="medium">
                            🤯 고르기 힘든 질문을 써봐!
                        </Text>
                        <Input
                            placeholder="제목"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={50}
                        />
                    </div>
                    <div className="border border-red-300 rounded-md grid grid-cols-1 md:grid-cols-2 p-5 gap-4">
                        <div className="flex flex-col gap-4">
                            <Text>🥰 첫 번째 선택지는 뭐야?</Text>
                            <Input
                                placeholder="예: 평생 카레만 먹기"
                                required
                                value={option1}
                                onChange={(e) => setOption1(e.target.value)}
                                maxLength={30}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Text> 이게 왜 더 괴로운지 설명해봐 </Text>
                            <Input
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
                        rounded-md
                        grid grid-cols-1 md:grid-cols-2  p-5 gap-4"
                    >
                        <div className="flex flex-col gap-4">
                            <Text>🤩 두 번째 선택지, 더 세게 가보자 </Text>
                            <Input
                                placeholder="예: 평생 짜장면만 먹기"
                                required
                                value={option2}
                                onChange={(e) => setOption2(e.target.value)}
                                maxLength={30}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Text>더 어렵게 만들고 싶으면 여기에 써</Text>
                            <Input
                                placeholder="예: 밥, 국물, 탕수육 못먹음"
                                value={option2description}
                                onChange={(e) => setOption2Description(e.target.value)}
                                maxLength={50}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Text>ℹ️ 사용자 정보 </Text>
                        <Text>
                            이 비밀번호는 나중에 질문을 삭제할 때 사용됩니다. 꼭 기억해두세요!
                        </Text>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                placeholder="사용자 아이디"
                                required
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                maxLength={10}
                            />
                            <Input
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
                        <Button buttonType="confirm" disabled={!isFormValid} onClick={onCreate}>
                            <Text bold type="medium">
                                질문 생성
                            </Text>
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default CreateQuestionForm;
