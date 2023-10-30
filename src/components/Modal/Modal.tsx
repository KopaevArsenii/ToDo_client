/* VENDOR */
import React from "react";

/* APPLICATION */
import "./Modal.css";

interface ModalProps {
  item?: {
    id: string;
    name: string;
    description: string;
    category?: string;
  };
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  active,
  setActive,
  children,
}) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => {
        setActive(false);
      }}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
