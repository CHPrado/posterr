import { createContext } from "react";

import { PostProps, UserProps } from "../interfaces";

interface PosterrContext {
  contextUser: UserProps;
  contexPosts: PostProps[];
  setContextUser: React.Dispatch<React.SetStateAction<UserProps>>;
  setContextPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
}

const defaultUser: UserProps = {
  id: 0,
  avatar: "",
  name: "",
  followersIds: [],
  followingIds: [],
};

const defaultValues: PosterrContext = {
  contextUser: defaultUser,
  contexPosts: [],
  setContextUser: () => {},
  setContextPosts: () => {},
};

const posterrContext = createContext<PosterrContext>(defaultValues);

export default posterrContext;
