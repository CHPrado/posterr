import React, { FC, ReactNode, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import "./modal.scss";

type ModalParams = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
};

const Modal: FC<ModalParams> = ({ open, setOpen, children }) => {
  function handleCloseModal() {
    document.documentElement.style.overflow = "auto scroll";
    document.documentElement.style.overscrollBehaviorY = "none";
    setOpen(false);
  }

  function handleModalCloseButtonClick() {
    handleCloseModal();
  }

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehaviorY = "none";
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
