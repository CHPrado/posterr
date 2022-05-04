import React, { useContext, useEffect, useState } from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { posterrContext } from "../../contexts";
import { disablePageScroll } from "../../helpers";
import { PostProps } from "../../interfaces";
import { fakeApi } from "../../services";
import Modal from "../Modal";
import Post from "../Post/Post";
import PostForm from "../PostForm";

import "./posts.scss";

const Posts = () => {
  const { user, posts, setPosts } = useContext(posterrContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [quotePost, setQuotePost] = useState<PostProps>();
  const location = useLocation();
  const isHome = location.pathname === "/";

  function handleRePostButtonClick(repostId: number) {
    fakeApi.createPost(user.id, setPosts, "", repostId);
  }

  function handleQuotePostButtonClick(repostId: number) {
    fakeApi.getPostById(repostId).then((response) => {
      setQuotePost(response.data);
      setModalOpen(true);
    });
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

  useEffect(() => {
    disablePageScroll(false);
    setModalOpen(false);
  }, [posts]);

  return (
    <>
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
                <button onClick={() => handleQuotePostButtonClick(repostId)}>
                  <FaRegEdit size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {modalOpen && quotePost && (
        <Modal open={modalOpen} setOpen={setModalOpen}>
          <PostForm
            repostId={quotePost?.text ? quotePost?.id : quotePost?.repostId!}
          />
          <div className="modal-quote-post-container">
            <Post post={quotePost!} />
          </div>
        </Modal>
      )}
      <Outlet />
    </>
  );
};

export default Posts;
