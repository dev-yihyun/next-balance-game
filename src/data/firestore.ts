import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
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
    const querySnapshot = await getDocs(collection(db, "posts"));
    if (querySnapshot.empty) {
        return [];
    }

    const posts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        createdAt: doc.data()["createdAt"].toDate().toLocaleString(),
    }));
    return posts;
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
