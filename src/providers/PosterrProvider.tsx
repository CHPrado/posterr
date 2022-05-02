import React, { FC, ReactNode, useState } from "react";

import { posterrContext } from "../contexts";
import { PostProps, UserProps } from "../interfaces";

const PosterrProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const defaultUser: UserProps = {
    id: 0,
    avatar: "",
    name: "",
    followersIds: [],
    followingIds: [],
  };
  const [user, setUser] = useState<UserProps>(defaultUser);
  const [posts, setPosts] = useState<PostProps[]>([]);

  return (
    <posterrContext.Provider value={{ user, posts, setUser, setPosts }}>
      {children}
    </posterrContext.Provider>
  );
};

export default PosterrProvider;
