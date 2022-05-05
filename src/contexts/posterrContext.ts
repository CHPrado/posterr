import { createContext } from "react";

import { PostProps, UserProps } from "../interfaces";

interface PosterrContext {
  contextUser: UserProps;
  contextUsers: UserProps[];
  contextPosts: PostProps[];
  setContextUser: React.Dispatch<React.SetStateAction<UserProps>>;
  setContextUsers: React.Dispatch<React.SetStateAction<UserProps[]>>;
  setContextPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
}

const defaultUser: UserProps = {
  id: 0,
  avatar: "",
  name: "",
  createdAt: new Date(),
  followersIds: [],
  followingIds: [],
  totalPosts: 0,
};

const defaultValues: PosterrContext = {
  contextUser: defaultUser,
  contextUsers: [],
  contextPosts: [],
  setContextUser: () => {},
  setContextUsers: () => {},
  setContextPosts: () => {},
};

const posterrContext = createContext<PosterrContext>(defaultValues);

export default posterrContext;
