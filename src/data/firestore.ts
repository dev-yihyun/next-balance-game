import { initializeApp } from "firebase/app";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    setDoc,
    Timestamp,
} from "firebase/firestore";
/*
[TODO]
- 사용자 정보 암호화
- 게시글 저장 동시성 문제 해결하기
: 현재 저장된 postid중 가장 큰 값 +1로 하면 경합조건 문제를 일으킬 수 있다.
동시에 여러 사용자가 글을 올릴 경우 postid가 중복될 수있기 때문에 완전히 안전하게 처리하는 방법 구현하기
*/

// Firebase 설정
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
};
// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 모든 게시글 가져오기
export async function fetchAllPost() {
    const postQuery = query(collection(db, "posts"), orderBy("createdAt", "desc")); // 최신순 정렬
    const querySnapshot = await getDocs(postQuery);
    if (querySnapshot.empty) {
        return [];
    }

    const posts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        createdAt: doc.data()["createdAt"].toDate().toLocaleString(),
    }));
    return posts;
}

// 게시글 추가하기
export async function addPost(postData: {
    title: string;
    option1: string;
    option2: string;
    option1description: string;
    option2description: string;
    userId: string;
    userPw: string;
}) {
    const { title, option1, option2, option1description, option2description, userId, userPw } =
        postData;
    // const newDataRef = doc(collection(db, "posts"));
    const getQuery = query(collection(db, "posts"), orderBy("postid", "desc"));
    const querySnapshot = await getDocs(getQuery);
    let nextPostId = 0;
    if (!querySnapshot.empty) {
        // 가장 큰 postId 가져오기
        const lastPost = querySnapshot.docs[0];
        nextPostId = lastPost.data().postid + 1; // 마지막 postId + 1
    }
    const addData = {
        postid: nextPostId,
        createdAt: Timestamp.fromDate(new Date()),
        title: title,
        options: {
            option1: { title: option1, description: option1description, voteCount: 0 },
            option2: { title: option2, description: option2description, voteCount: 0 },
            voteCount: 0,
        },
        userInfo: {
            userid: userId,
            userpw: userPw,
        },
    };

    // 문서 ID를 postid와 동일하게 설정
    const postIdString = String(nextPostId);
    const newDataRef = doc(db, "posts", postIdString);
    await setDoc(newDataRef, addData);
    return addData;
}

// src/data/firestore.ts
export async function fetchSinglelPost(postid: string) {
    if (!postid) {
        return null;
    }

    const fetchDataDocRef = doc(db, "posts", postid);
    // const fetchDataDocRef = doc(db, "posts", "thd7T90G60");
    const fetchDataDocSnap = await getDoc(fetchDataDocRef);

    if (!fetchDataDocSnap.exists()) {
        return null;
    }

    const data = fetchDataDocSnap.data();

    return {
        postid: data?.postid,
        title: data?.title,
        options: data?.options,
        userinfo: data?.userInfo,
    };
}

// posts (Collection)
//  └─ {postId} (Document)
//       ├─ postid
//       ├─ createdAt
//       ├─ title
//       ├─ options (Map)
//       │    ├─ option1: { title, description, voteCount }
//       │    ├─ option2: { title, description, voteCount }
//       ├    └─ voteCount
//       └─ userinfo (Map)
//            ├─ userid
//            └─ userpw
