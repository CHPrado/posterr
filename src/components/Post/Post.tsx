import React, { FC, ReactNode, useEffect, useState } from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { Link } from "react-router-dom";

import { format } from "date-fns";

import { usePosts } from "../../hooks";
import { PostItem, PostProps } from "../../interfaces";
import "./post.scss";

const LinkToUserPage: FC<{ postItem: PostItem; children?: ReactNode }> = ({
  postItem,
  children,
}) => <Link to={`/user/${postItem.user.id}`}>{children}</Link>;

const Post: FC<{ post: PostProps }> = ({ post }) => {
  const { createPostItem } = usePosts();
  const [postItem, setPostItem] = useState<PostItem>();

  useEffect(() => {
    async function asyncCreatePostItem() {
      await createPostItem(post).then((item) => setPostItem(item));
    }

    asyncCreatePostItem();
  }, []);

  if (!postItem) return <></>;

  return (
    <div key={postItem.id} className={"post-card"}>
      <div className="post-content-container">
        {postItem.text && (
          <img
            src={postItem.user.avatar}
            alt={`${postItem.user.id}-user-avatar-${postItem.id}`}
          />
        )}

        <div className={postItem.text ? "post-info" : "repost-info"}>
          {postItem.text ? (
            <div className="post-info-container">
              <div>
                <LinkToUserPage postItem={postItem!}>
                  <span className="post-info-name">{postItem.user.name}</span>
                  <span className="post-info-username">{`@${postItem.user.username}`}</span>
                </LinkToUserPage>
                <span className="post-info-date">{`• ${format(
                  new Date(postItem.createdAt),
                  "MMM d, yyyy"
                )}`}</span>
              </div>

              <span className="post-text">{postItem.text}</span>
            </div>
          ) : (
            <div className="repost-info-container">
              <AiOutlineRetweet size={20} />
              <LinkToUserPage postItem={postItem!}>
                <span>{postItem.user.name}</span>
              </LinkToUserPage>
              <span>Reposted</span>
              <span className="post-info-date">{`• ${format(
                new Date(postItem.createdAt),
                "MMM d, yyyy"
              )}`}</span>
            </div>
          )}

          {postItem.repost && (
            <div className="sub-post-container">
              <Post post={postItem.repost} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
