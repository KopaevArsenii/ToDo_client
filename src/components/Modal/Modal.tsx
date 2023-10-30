/* VENDOR */
import React from "react";

/* APPLICATION */
import "./Modal.css";
import close from "../../icons/close.svg"

interface ModalProps {
      item?: {
            id: string;
            name: string;
            description: string;
            category?: string;
      };
      name: string;
      active: boolean;
      setActive: React.Dispatch<React.SetStateAction<boolean>>;
      children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ active, setActive, name, children, }) => {
  return (
        <div
              className={active ? "modal active" : "modal"}
              onClick={() => {
                    setActive(false);
              }}
        >

            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className={"modal__content-header"}>
                    <div className={"modal__content-title "}>{name}</div>
                    <button onClick={() => setActive(false)} className={"modal__content-header__btn"}>
                        <img src={close} alt="close"/>
                    </button>
                </div>
                {children}
            </div>
        </div>
  );
};
