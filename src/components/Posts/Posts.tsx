import React, { FC, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Outlet } from "react-router-dom";

import usePosts from "../../hooks/usePosts";
import { PostItem, UserProps } from "../../interfaces";
import { fakeApi } from "../../services";

interface PostParams {
  followingPosts?: boolean;
}

const Posts: FC<PostParams> = ({ followingPosts }) => {
  const { createPostList } = usePosts();
  const [posts, setPosts] = useState<PostItem[]>([]);

  const user = useOutletContext<UserProps>();

  useEffect(() => {
    if (!user) return;

    if (followingPosts) {
      fakeApi.getFollowingPosts(user.followingIds).then((posts) => {
        setPosts(createPostList(posts));
      });
    } else {
      fakeApi.getPosts().then((posts) => {
        setPosts(createPostList(posts));
      });
    }
    //eslint-disable-next-line
  }, [user, followingPosts]);

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
