import React, { FC, useContext, useEffect, useState } from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

import { Modal, Post, PostForm } from "../../components";
import { posterrContext } from "../../contexts";
import { disablePageScroll } from "../../helpers";
import { PostProps, UserProps } from "../../interfaces";
import { fakeApi } from "../../services";

import "./posts.scss";

type PostsParams = {
  userId: UserProps["id"];
  userIds?: UserProps["id"][];
};

const Posts: FC<PostsParams> = ({ userId, userIds }) => {
  const { contextUser, contextPosts, setContextPosts } =
    useContext(posterrContext);
  const [posts, setPosts] = useState(contextPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [quotePost, setQuotePost] = useState<PostProps>();

  function handleRePostButtonClick(repostId: number) {
    fakeApi.posts.createPost(contextUser.id, setContextPosts, "", repostId);
  }

  function handleQuotePostButtonClick(repostId: number) {
    fakeApi.posts.getPostById(repostId).then((response) => {
      setQuotePost(response.data);
      setModalOpen(true);
    });
  }

  useEffect(() => {
    if (userIds?.length) {
      fakeApi.posts.getPostsFromUsers(userIds).then((response) => {
        setPosts(response.data);
      });
    } else {
      fakeApi.posts.getPosts().then((response) => {
        setPosts(response.data);
      });
    }
    //eslint-disable-next-line
  }, [userIds, contextPosts]);

  useEffect(() => {
    disablePageScroll(false);
    setModalOpen(false);
  }, [contextPosts]);

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
    </>
  );
};

export default Posts;
