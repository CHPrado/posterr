import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { useUser } from "../../hooks";
import usePosts from "../../hooks/usePosts";
import { PostItem } from "../../interfaces";
import { fakeApi } from "../../services";

const Posts = () => {
  const { getUser } = useUser();
  const { createPostList } = usePosts();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [user] = useState(getUser());

  useEffect(() => {
    if (!user) return;

    if (isHome) {
      fakeApi.getPosts().then((response) => {
        setPosts(createPostList(response.data));
      });
    } else {
      fakeApi.getFollowingPosts(user.followingIds).then((response) => {
        setPosts(createPostList(response.data));
      });
    }
    //eslint-disable-next-line
  }, [user, isHome]);

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id}>
          <img
            src={post.user.avatar}
            alt={`${post.user.id}-user-avatar-${post.id}`}
            style={{ height: "40px" }}
          />
          <Link to={`/user/${post.user.id}`}>
            <span>{post.user.name}</span>
          </Link>

          <p>{post.text}</p>
          <p>{post.repost?.text}</p>
        </div>
      ))}

      <Outlet />
    </>
  );
};

export default Posts;
