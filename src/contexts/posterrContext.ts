import { createContext } from "react";

import { PostProps, UserProps } from "../interfaces";

interface PosterContext {
  user: UserProps;
  posts: PostProps[];
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
}

const defaultUser: UserProps = {
  id: 0,
  avatar: "",
  name: "",
  followersIds: [],
  followingIds: [],
};

const defaultValues = {
  user: defaultUser,
  posts: [],
  setUser: () => {},
  setPosts: () => {},
};

const posterrContext = createContext<PosterContext>(defaultValues);

export default posterrContext;
