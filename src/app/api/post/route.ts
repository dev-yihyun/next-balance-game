import { addPost, fetchAllPost } from "@/data/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const fetchedPostData = await fetchAllPost();
        return NextResponse.json(
            {
                message: "데이터 가져오기 성공",
                success: true,
                data: fetchedPostData,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("서버 에러:", error);
        return NextResponse.json(
            { message: "서버 에러", success: false, error: String(error) },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const addData = await request.json();
        await addPost(addData);
        return NextResponse.json(
            {
                message: "데이터 가져오기 성공",
                success: true,
                data: addData,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("서버 에러:", error);
        return NextResponse.json(
            { message: "서버 에러", success: false, error: String(error) },
            { status: 500 }
        );
    }
}
