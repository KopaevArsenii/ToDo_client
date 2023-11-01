/* VENDOR */
import React, { FC, MouseEventHandler } from "react"

/* APPLICATION */
import check from "../icons/check.svg"

interface CheckboxProps {
    isChecked: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
}

const Checkbox: FC<CheckboxProps> = ({ isChecked, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-[40px] h-[40px] border border-slate-200 hover:border-indigo-500 rounded-[10px] outline-none"
        >
            {isChecked ? <img className="m-auto" src={check} alt="✓" /> : null}
        </button>
    )
}

export default Checkbox
