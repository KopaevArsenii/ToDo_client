/* VENDOR */
import React, { useState } from "react"
import { useSelector } from "react-redux"

/* APPLICATION */
import down from "../icons/down.svg"
// import "./Select/Select.css"
import { getAllCategories } from "../features/categoriesSlice"

interface SelectProps {
    value: string | undefined
    label: string
    placeholder: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export const Select: React.FC<SelectProps> = ({
    value,
    label,
    placeholder,
    setValue,
}) => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const options = useSelector(getAllCategories)

    return (
        <div
            className="h-[64px] min-w-max border border-slate-200 hover:border-indigo-500 focus:border-indigo-500 rounded-[10px] px-[40px] flex items-center relative"
            onClick={() => setIsActive(!isActive)}
        >
            {/*<span className="dropdown-label">{label}</span>*/}
            <div className="flex gap-[20px] items-center">
                <div className="text-[22px] text-indigo-500">
                    {options.find((option) => option.id === value)?.name ||
                        "Категории"}
                </div>
                <img src={down} alt="open dropdown" />
            </div>
            {isActive && (
                <div
                    className="fixed inset-0"
                    onClick={() => setIsActive(false)}
                ></div>
            )}
            {isActive && (
                <div className="top-[80px] left-0 bg-white p-[10px] max-w-[300px] absolute z-10 rounded-[10px] border border-slate-200 text-[18px]">
                    {options.map((option) => (
                        <div
                            className="cursor-pointer truncate hover:text-indigo-500"
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
    )
}
