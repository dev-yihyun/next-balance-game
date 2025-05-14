import { initializeApp } from "firebase/app";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    setDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";

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
    const getQuery = query(collection(db, "posts"), orderBy("postid", "desc"));
    const querySnapshot = await getDocs(getQuery);
    let nextPostId = 0;
    if (!querySnapshot.empty) {
        const lastPost = querySnapshot.docs[0];
        nextPostId = lastPost.data().postid + 1;
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

    const postIdString = String(nextPostId);
    const newDataRef = doc(db, "posts", postIdString);
    await setDoc(newDataRef, addData);
    return addData;
}

// 단일 게시글
export async function fetchSinglelPost(postid: string) {
    if (!postid) {
        return null;
    }

    const fetchDataDocRef = doc(db, "posts", postid);
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
        createdAt: data?.createdAt.toDate().toLocaleString(),
    };
}

export async function deletedPost(postid: string) {
    const fetchedData = await fetchSinglelPost(postid);

    if (fetchedData === null) {
        return null;
    }

    await deleteDoc(doc(db, "posts", postid));
    return fetchedData;
}

export async function voteOption(postid: string, option: string) {
    const postRef = doc(db, "posts", postid);
    const snap = await getDoc(postRef);
    if (!snap.exists()) throw new Error("Post not found");

    if (!option) {
        throw new Error(`Option '${option}' not found in post ${postid}`);
    }

    const currentCount = snap.data().options[option].voteCount || 0;
    const currentTotalCount = snap.data().options.voteCount || 0;
    await updateDoc(postRef, {
        [`options.${option}.voteCount`]: currentCount + 1,
        [`options.voteCount`]: currentTotalCount + 1,
    });
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
