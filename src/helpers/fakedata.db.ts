import profileAvatar from "../assets/default_profile_avatar.png";
import { PostProps, UserProps } from "../interfaces";

const users: UserProps[] = [
  {
    id: 1,
    name: "Amazing User Name",
    avatar: profileAvatar,
    followingIds: [2],
    followersIds: [],
  },
  {
    id: 2,
    name: "Elon Musk",
    avatar: profileAvatar,
    followingIds: [],
    followersIds: [],
  },
  {
    id: 3,
    name: "Bill Gates",
    avatar: profileAvatar,
    followingIds: [],
    followersIds: [],
  },
  {
    id: 4,
    name: "Mark Zuckerberg",
    avatar: profileAvatar,
    followingIds: [],
    followersIds: [],
  },
];

const posts: PostProps[] = [
  {
    id: 1,
    text: "Elon Musk first post",
    userId: 2,
  },
  {
    id: 2,
    text: "Elon Musk second post",
    userId: 2,
  },
  {
    id: 3,
    text: "Bill Gates first post",
    userId: 3,
  },
  {
    id: 4,
    text: "Bill Gates second post",
    userId: 3,
  },
  {
    id: 5,
    text: "Mark Zuckerberg first post",
    userId: 4,
  },
  {
    id: 6,
    text: "Mark Zuckerberg second post",
    userId: 4,
  },
  {
    id: 7,
    userId: 2,
    postId: 9,
  },
  {
    id: 8,
    text: "Elon Musk quote Mark Zuckerberg's post",
    userId: 2,
    postId: 9,
  },
];

export { users, posts };
