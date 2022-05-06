import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";

import { USER_DAILY_POSTS_LIMIT } from "../../constants";
import { posterrContext } from "../../contexts";
import { fakeApi } from "../../services";

import "./post-form.scss";

const PostForm: FC<{ repostId?: number }> = ({ repostId }) => {
  const { contextUser, setContextUser, setContextUsers, setContextPosts } =
    useContext(posterrContext);
  const [text, setText] = useState("");
  const [isDailyPostsLimitExceeded, setIsDailyPostsLimitExceeded] =
    useState(false);

  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function handlePostButtonClick() {
    fakeApi.posts
      .create(contextUser.id, setContextPosts, text, repostId)
      .then(() => {
        setText("");
        const params = { totalPosts: contextUser.totalPosts + 1 };
        fakeApi.users.update(
          contextUser.id,
          setContextUser,
          setContextUsers,
          params
        );
      });
  }

  useEffect(() => {
    const filter = {
      userIds: [contextUser.id],
      posted: new Date(),
    };
    fakeApi.posts.list(filter).then((response) => {
      setIsDailyPostsLimitExceeded(
        response.data.length >= USER_DAILY_POSTS_LIMIT
      );
    });
  }, [contextUser]);

  return (
    <div className="post-form-wrapper">
      <img src={contextUser.avatar} alt={`${contextUser.id}-user-avatar`} />

      <div className="post-form-container">
        <textarea
          placeholder="Start a post"
          rows={5}
          maxLength={777}
          value={text}
          onChange={handleTextChange}
          disabled={isDailyPostsLimitExceeded}
        />

        {isDailyPostsLimitExceeded && (
          <span className="post-limit-warn">
            You exceeded the maximum amount of posts for the day. Try again
            tomorrow
          </span>
        )}

        <div className="post-form-button-container">
          <span>{text.length}/777</span>
          <button
            onClick={handlePostButtonClick}
            disabled={!text.length || isDailyPostsLimitExceeded}
          >
            <span>Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
