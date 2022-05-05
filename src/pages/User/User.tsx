import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Modal, PostForm, Posts } from "../../components";
import { posterrContext } from "../../contexts";
import { UserProps } from "../../interfaces";
import { fakeApi } from "../../services";

import "./user.scss";

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
    fakeApi.users
      .getUserById(Number(id))
      .then((response) => setProfileUser(response.data));
  }, [id, contextUser]);

  useEffect(() => {
    if (!profileUser) return;
    setIsLoggedUser(contextUser.id === profileUser.id);
    // eslint-disable-next-line
  }, [profileUser]);

  if (!profileUser) return <></>;

  return (
    <div className="user-page-wrapper">
      {modalOpen && (
        <Modal open={modalOpen} setOpen={setModalOpen} onClose={onModalClose}>
          <div className="user-data-container">
            <img
              src={profileUser?.avatar}
              alt={`${profileUser?.id}-user-avatar`}
            />

            <div className="user-data">
              <span>{profileUser?.name}</span>
              <span>Followers: {profileUser?.followersIds.length}</span>
              <span>Following: {profileUser?.followingIds.length}</span>

              {!isLoggedUser && (
                <div className="user-buttons-container">
                  {contextUser.followingIds?.includes(profileUser.id) ? (
                    <button onClick={handleUnfollowButtonClick}>
                      Following
                    </button>
                  ) : (
                    <button onClick={handleFollowButtonClick}>Follow</button>
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
          <Posts userIds={[profileUser.id]} />
        </Modal>
      )}
    </div>
  );
};

export default User;
