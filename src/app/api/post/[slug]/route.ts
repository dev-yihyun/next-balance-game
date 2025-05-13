import { deletedPost, fetchSinglelPost } from "@/data/firestore";
import { NextRequest, NextResponse } from "next/server";

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

// 데이터 단일 삭제
export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
    const { inputPw } = await request.json();
    const postid = params?.slug;

    if (!inputPw) {
        return NextResponse.json(
            { message: "비밀번호를 입력해 주세요.", success: false },
            { status: 400 }
        );
    }

    if (!postid) {
        return NextResponse.json(
            { message: "게시글 삭제 중중 오류 발생. 관리자에게 문의하세요.", success: false },
            { status: 400 }
        );
    }

    try {
        const postRef = await fetchSinglelPost(postid);
        if (postRef === null) {
            return NextResponse.json(
                { message: "게시글이 존재하지 않습니다.", success: false },
                { status: 404 }
            );
        }

        if (postRef?.userinfo?.userpw !== inputPw) {
            return NextResponse.json(
                { message: "비밀번호가 일치하지 않습니다.", success: false },
                { status: 403 }
            );
        }
        if (postRef?.userinfo?.userpw === inputPw) {
            await deletedPost(postid);

            const response = { message: "데이터 단일 삭제 성공", success: true };
            return NextResponse.json(response, { status: 200 });
        }
    } catch (error) {
        console.error("삭제 중 오류:", error);
        return NextResponse.json(
            { message: "서버 오류", success: false, error: String(error) },
            { status: 500 }
        );
    }

    return NextResponse.json({ status: 200 });
}
