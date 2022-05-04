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
  const [contextUser, setContextUser] = useState<UserProps>(defaultUser);
  const [contexPosts, setContextPosts] = useState<PostProps[]>([]);

  return (
    <posterrContext.Provider
      value={{ contextUser, contexPosts, setContextUser, setContextPosts }}
    >
      {children}
    </posterrContext.Provider>
  );
};

export default PosterrProvider;
