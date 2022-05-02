import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { posterrContext } from "../../contexts";
import usePosts from "../../hooks/usePosts";
import { PostItem } from "../../interfaces";
import { fakeApi } from "../../services";

const Posts = () => {
  const { user, posts, setPosts } = useContext(posterrContext);
  const { createPostList } = usePosts();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [postList, setPostList] = useState<PostItem[]>([]);

  useEffect(() => {
    if (!user) return;

    if (isHome) {
      fakeApi.getPosts().then((response) => {
        setPosts(response.data);
      });
    } else {
      fakeApi.getFollowingPosts(user.followingIds).then((response) => {
        setPosts(response.data);
      });
    }
    //eslint-disable-next-line
  }, [user, isHome]);

  useEffect(() => {
    if (!posts || !posts.length) return;

    async function asyncPostList() {
      setPostList(await createPostList(posts));
    }

    asyncPostList();
    // eslint-disable-next-line
  }, [posts]);

  return (
    <div>
      {postList?.map((post) => {
        return (
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
        );
      })}

      <Outlet />
    </div>
  );
};

export default Posts;
