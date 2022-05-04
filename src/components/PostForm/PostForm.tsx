import React, { ChangeEvent, FC, useContext, useState } from "react";

import { posterrContext } from "../../contexts";
import { fakeApi } from "../../services";

import "./post-form.scss";

const PostForm: FC<{ repostId?: number }> = ({ repostId }) => {
  const { contextUser, setContextPosts } = useContext(posterrContext);
  const [text, setText] = useState("");

  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function handlePostButtonClick() {
    fakeApi.posts
      .createPost(contextUser.id, setContextPosts, text, repostId)
      .then(() => setText(""));
  }

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
        />

        <div className="post-form-button-container">
          <span>{text.length}/777</span>
          <button
            className={!text.length ? "disabled-button" : ""}
            onClick={handlePostButtonClick}
            disabled={!text.length}
          >
            <span>Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
