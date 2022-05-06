import React, { FC, useContext, useEffect, useState } from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

import { Modal, Post, PostForm } from "../../components";
import { posterrContext } from "../../contexts";
import { disablePageScroll } from "../../helpers";
import { PostProps, UserProps } from "../../interfaces";
import { fakeApi } from "../../services";

import "./posts.scss";

type PostsParams = {
  userIds?: UserProps["id"][];
};

const Posts: FC<PostsParams> = ({ userIds }) => {
  const {
    contextUser,
    setContextUser,
    setContextUsers,
    contextPosts,
    setContextPosts,
  } = useContext(posterrContext);
  const { isHome } = useOutletContext<{ isHome: boolean }>();
  const [posts, setPosts] = useState(contextPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [quotePost, setQuotePost] = useState<PostProps>();

  function handleRePostButtonClick(repostId: number) {
    fakeApi.posts
      .create(contextUser.id, setContextPosts, "", repostId)
      .then(() => {
        const params = { totalPosts: contextUser.totalPosts + 1 };
        fakeApi.users.update(
          contextUser.id,
          setContextUser,
          setContextUsers,
          params
        );
      });
  }

  function handleQuotePostButtonClick(repostId: number) {
    fakeApi.posts.get(repostId).then((response) => {
      setQuotePost(response.data);
      setModalOpen(true);
    });
  }

  useEffect(() => {
    if (isHome) {
      fakeApi.posts.list().then((response) => {
        setPosts(response.data);
      });
    } else {
      const filter = { userIds: userIds! };
      fakeApi.posts.list(filter).then((response) => {
        setPosts(response.data);
      });
    }
  }, [userIds, contextPosts, isHome]);

  useEffect(() => {
    disablePageScroll(false);
    setModalOpen(false);
  }, [contextPosts]);

  return (
    <>
      <div className="posts-wrapper">
        {posts.length ? (
          <>
            {posts.map((post) => {
              const repostId = post.text ? post.id : post.repostId!;

              return (
                <div key={post.id} className="post-wrapper">
                  <Post post={post} />
                  <div className="post-buttons-container">
                    <button onClick={() => handleRePostButtonClick(repostId)}>
                      <AiOutlineRetweet size={20} />
                    </button>
                    <button
                      onClick={() => handleQuotePostButtonClick(repostId)}
                    >
                      <FaRegEdit size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <h2>No posts to show</h2>
        )}
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
