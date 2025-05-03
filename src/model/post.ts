export type UserInfo = {
    userid: string;
    userpw: string;
};

export type Option = { title: string; description: string; voteCount: number };

export type Post = {
    postid: number;
    title: string;
};

export type AllPost = {
    postid: number;
    createdAt: string;
    title: string;
    options: {
        option1: Option;
        option2: Option;
    };
    userinfo: UserInfo;
};

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
