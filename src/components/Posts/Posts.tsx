import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Outlet } from "react-router-dom";

import usePosts from "../../hooks/usePosts";
import { PostItem, UserProps } from "../../interfaces";
import { fakeApi } from "../../services";

interface OutletContext {
  loggedUser: UserProps;
  isHome: boolean;
}

const Posts = () => {
  const { createPostList } = usePosts();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const { isHome, loggedUser } = useOutletContext<OutletContext>();

  useEffect(() => {
    if (!loggedUser) return;

    if (isHome) {
      fakeApi.getPosts().then((posts) => {
        setPosts(createPostList(posts));
      });
    } else {
      fakeApi.getFollowingPosts(loggedUser.followingIds).then((posts) => {
        setPosts(createPostList(posts));
      });
    }
    //eslint-disable-next-line
  }, [loggedUser, isHome]);

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
