import React, { FC, ReactNode, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { disablePageScroll } from "../../helpers";

import "./modal.scss";

type ModalParams = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
};

const Modal: FC<ModalParams> = ({ open, setOpen, children }) => {
  function handleCloseModal() {
    disablePageScroll(false);
    setOpen(false);
  }

  function handleModalCloseButtonClick() {
    handleCloseModal();
  }

  useEffect(() => {
    disablePageScroll(true);
  }, []);

  return (
    <div className={`modal-wrapper-${open ? "open" : "close"}`}>
      <div className="modal-frame">
        <div className="modal-header">
          <button onClick={handleModalCloseButtonClick}>
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
