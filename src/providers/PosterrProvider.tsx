import React, { FC, ReactNode, useState } from "react";

import { posterrContext } from "../contexts";
import { PostProps, UserProps } from "../interfaces";

const PosterrProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const defaultUser: UserProps = {
    id: 0,
    avatar: "",
    name: "",
    createdAt: new Date(),
    followersIds: [],
    followingIds: [],
    totalPosts: 0,
  };
  const [contextUser, setContextUser] = useState<UserProps>(defaultUser);
  const [contextUsers, setContextUsers] = useState<UserProps[]>([]);
  const [contextPosts, setContextPosts] = useState<PostProps[]>([]);

  return (
    <posterrContext.Provider
      value={{
        contextUser,
        contextPosts,
        contextUsers,
        setContextUsers,
        setContextUser,
        setContextPosts,
      }}
    >
      {children}
    </posterrContext.Provider>
  );
};

export default PosterrProvider;
