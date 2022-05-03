import React, { useContext, useEffect } from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { posterrContext } from "../../contexts";
import { usePosts } from "../../hooks";
import { fakeApi } from "../../services";
import Post from "../Post/Post";

import "./posts.scss";

const Posts = () => {
  const { user, posts, setPosts } = useContext(posterrContext);
  const { sortPostsByDateAsc } = usePosts();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!user) return;

    if (isHome) {
      fakeApi.getPosts().then((response) => {
        setPosts(sortPostsByDateAsc(response.data));
      });
    } else {
      fakeApi.getFollowingPosts(user.followingIds).then((response) => {
        setPosts(sortPostsByDateAsc(response.data));
      });
    }
    //eslint-disable-next-line
  }, [user, isHome]);

  return (
    <div className="posts-wrapper">
      {posts?.map((post) => (
        <div className="post-wrapper">
          <Post key={post.id} post={post} />
          <div className="post-buttons-container">
            <button>
              <AiOutlineRetweet size={20} />
            </button>
            <button>
              <FaRegEdit size={20} />
            </button>
          </div>
        </div>
      ))}

      <Outlet />
    </div>
  );
};

export default Posts;
