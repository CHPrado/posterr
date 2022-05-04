import React, { useContext, useEffect } from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { posterrContext } from "../../contexts";
import { fakeApi } from "../../services";
import Post from "../Post/Post";

import "./posts.scss";

const Posts = () => {
  const { user, posts, setPosts } = useContext(posterrContext);
  const location = useLocation();
  const isHome = location.pathname === "/";

  function handleRePostButtonClick(repostId: number) {
    fakeApi.createPost(user.id, setPosts, "", repostId);
  }

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

  return (
    <div className="posts-wrapper">
      {posts?.map((post) => {
        const repostId = post.text ? post.id : post.repostId!;

        return (
          <div key={post.id} className="post-wrapper">
            <Post post={post} />
            <div className="post-buttons-container">
              <button onClick={() => handleRePostButtonClick(repostId)}>
                <AiOutlineRetweet size={20} />
              </button>
              <button>
                <FaRegEdit size={20} />
              </button>
            </div>
          </div>
        );
      })}

      <Outlet />
    </div>
  );
};

export default Posts;
