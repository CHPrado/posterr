import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Modal, Posts } from "../../components";
import { UserProps } from "../../interfaces";
import { fakeApi } from "../../services";

import "./user.scss";

const User = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);
  const [profileUser, setProfileUser] = useState<UserProps>();

  function onModalClose() {
    navigate("/");
  }

  useEffect(() => {
    fakeApi
      .getUserById(Number(id))
      .then((response) => setProfileUser(response.data));
  }, [id]);

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
            </div>
          </div>

          <Posts userId={profileUser.id} userIds={[profileUser.id]} />
        </Modal>
      )}
    </div>
  );
};

export default User;
