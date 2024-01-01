/* VENDOR */
import React, { useState } from "react"

/* APPLICATION */
import down from "../icons/down.svg"
import { ICategory } from "../types"

interface SelectProps {
    options: ICategory[]
    value: ICategory["id"] | undefined
    label?: ICategory["name"]
    placeholder: string
    setValue: React.Dispatch<React.SetStateAction<ICategory["id"]>>
}

//ToDo: show something when no categories
export const Select: React.FC<SelectProps> = ({
    options,
    value,
    label,
    placeholder,
    setValue,
}) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    return (
        <div className="flex flex-col gap-[10px] w-full">
            {label && <div className="text-[14px] text-zinc-400">{label}</div>}
            <div
                className="h-[64px] border border-slate-200 hover:border-indigo-500 focus:border-indigo-500 rounded-[10px] px-[40px] flex items-center relative"
                onClick={() => setIsActive(!isActive)}
            >
                <div className="flex gap-[20px] w-full justify-between items-center">
                    <div className="text-[22px] text-indigo-500 truncate">
                        {options.find((option) => option.id === value)?.name ||
                            "Category"}
                    </div>
                    <img
                        src={down}
                        className={`${isActive ? "rotate-180" : ""}`}
                        alt="open dropdown"
                    />
                </div>
                {isActive && (
                    <div
                        className="fixed inset-0"
                        onClick={() => setIsActive(false)}
                    ></div>
                )}
                {isActive && (
                    <div className="top-[80px] left-0 bg-white w-full absolute z-10 rounded-[10px] border border-slate-200 text-[18px] overflow-y-auto max-h-[239px]">
                        {options.map((option) => (
                            <div
                                className="cursor-pointer truncate hover:text-white border-b border-slate-200  hover:bg-indigo-500 first:rounded-t-[10px] last:rounded-b-[10px] last:border-0 px-[20px] py-[10px]"
                                onClick={() => {
                                    setValue(option.id)
                                    setIsActive(false)
                                }}
                                key={option.id}
                            >
                                {option.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
