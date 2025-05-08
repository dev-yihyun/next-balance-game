import { fetchSinglelPost } from "@/data/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const postData = await fetchSinglelPost(params?.slug);

    try {
        return NextResponse.json(
            {
                message: "데이터 가져오기 성공",
                success: true,
                data: postData,
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
