/* VENDOR */
import React from "react"

/* APPLICATION */

interface ModalProps {
    name: string
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
    buttonUnavailable?: boolean
}

export const Modal: React.FC<ModalProps> = ({
    active,
    setActive,
    name,
    children,
    buttonUnavailable = false,
}) => {
    return (
        <div
            className={`bg-black/30 h-full z-10 w-full fixed top-0 left-0 flex items-center justify-center ${
                active ? "" : "hidden"
            }`}
            onClick={
                !buttonUnavailable
                    ? () => {
                          setActive(false)
                      }
                    : () => {}
            }
        >
            <div
                className="bg-white px-[60px] py-[40px] rounded-[16px] w-[770px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex pb-[30px]">
                    <div className="font-medium text-[22px]">{name}</div>
                </div>
                {children}
            </div>
        </div>
    )
}
