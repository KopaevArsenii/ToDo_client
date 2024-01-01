/* VENDOR */
import React from "react"
import important from "../icons/important.svg"

interface ModalTextareaProps {
    value: string
    label: string
    placeholder: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    required: boolean
}

export const Textarea: React.FC<ModalTextareaProps> = ({
    value,
    label,
    placeholder,
    setValue,
    required,
}) => {
    return (
        <div className="flex flex-col gap-[10px]">
            {label && (
                <div className="flex gap-[4px]">
                    <div className="text-[14px] text-zinc-400">{label}</div>
                    {required && <img src={important} alt="required" />}
                </div>
            )}
            <textarea
                className="p-[20px] border border-slate-200 hover:border-indigo-500 outline-none rounded-[10px] h-[200px] resize-none"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
