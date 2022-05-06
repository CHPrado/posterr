import React, { useContext, useEffect, useState } from "react";
import { VscCalendar } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router-dom";

import { format } from "date-fns";

import { Modal, PostForm, Posts } from "../../components";
import { posterrContext } from "../../contexts";
import { UserProps } from "../../interfaces";
import { fakeApi } from "../../services";

import "./user-profile.scss";

const User = () => {
  const { id } = useParams<"id">();
  const { contextUser, setContextUser, setContextUsers } =
    useContext(posterrContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);
  const [profileUser, setProfileUser] = useState<UserProps>();
  const [isLoggedUser, setIsLoggedUser] = useState(false);

  function onModalClose() {
    navigate("/");
  }

  function handleUnfollowButtonClick() {
    fakeApi.users.unFollowUser(
      contextUser.id,
      profileUser?.id!,
      setContextUser,
      setContextUsers
    );
  }

  function handleFollowButtonClick() {
    fakeApi.users.followUser(
      contextUser.id,
      profileUser?.id!,
      setContextUser,
      setContextUsers
    );
  }

  useEffect(() => {
    if (!contextUser || !id) return;
    fakeApi.users
      .get(Number(id))
      .then((response) => setProfileUser(response.data));
  }, [id, contextUser]);

  useEffect(() => {
    if (!profileUser) return;
    setIsLoggedUser(contextUser.id === profileUser.id);
  }, [profileUser]);

  if (!profileUser) return <></>;

  return (
    <div className="user-page-wrapper">
      {modalOpen && (
        <Modal open={modalOpen} setOpen={setModalOpen} onClose={onModalClose}>
          <div className="user-page-container">
            <img
              src={profileUser?.avatar}
              alt={`${profileUser?.id}-user-avatar`}
            />

            <div className="user-data-container">
              <div className="user-data-container-2">
                <span className="user-name">{profileUser?.name}</span>

                <div className="user-username-container">
                  <span className="user-info-description">{`@${profileUser?.username}`}</span>
                </div>

                <div className="user-info-container">
                  <span className="user-info-description">
                    <VscCalendar />
                    {` Joined ${format(
                      new Date(profileUser.createdAt),
                      "MMM d, yyyy"
                    )}`}
                  </span>
                </div>

                <div className="user-info-container">
                  <span className="user-info-value">
                    {profileUser?.followingIds.length}
                  </span>
                  <span className="user-info-description">Following</span>
                  <span className="user-info-value">
                    {profileUser?.followersIds.length}
                  </span>
                  <span className="user-info-description">Followers</span>
                </div>

                <div className="user-info-container">
                  <span className="user-info-value">
                    {profileUser.totalPosts}
                  </span>
                  <span className="user-info-description">Total posts</span>
                </div>
              </div>

              {!isLoggedUser && (
                <div className="user-buttons-container">
                  {contextUser.followingIds?.includes(profileUser.id) ? (
                    <button
                      className="user-buttons-unfollow"
                      onClick={handleUnfollowButtonClick}
                    >
                      <span>Following</span>
                    </button>
                  ) : (
                    <button
                      className="user-buttons-follow"
                      onClick={handleFollowButtonClick}
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {isLoggedUser && (
            <div className="user-post-form-container">
              <PostForm />
            </div>
          )}

          <div className="user-posts-container">
            <Posts userIds={[profileUser.id]} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default User;
