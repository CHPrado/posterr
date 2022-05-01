import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserProps } from "../../interfaces";
import { fakeApi } from "../../services";

const User = () => {
  const { id } = useParams<"id">();
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    fakeApi.getUserById(Number(id)).then((response) => setUser(response.data));
  }, [id]);

  return (
    <div>
      <img src={user?.avatar} alt={`${user?.id}-user-avatar`} />
      <span>{user?.name}</span>

      <p>Followers: {user?.followersIds.length}</p>
      <p>Following: {user?.followingIds.length}</p>
    </div>
  );
};

export default User;
