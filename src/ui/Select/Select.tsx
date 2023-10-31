/* VENDOR */
import React, { useState } from "react"
import { useSelector } from "react-redux"

/* APPLICATION */
import down from "../../icons/down.svg"
import "./Select.css"
import { selectAllCategories } from "../../features/categoriesSlice"

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
    const options = useSelector(selectAllCategories)

    return (
        <div className="dropdown" onClick={() => setIsActive(!isActive)}>
            <span className="dropdown-label">{label}</span>
            <div
                className={value ? "dropdown-btn" : "dropdown-btn placeholder"}
            >
                {options.find((option) => option.id === value)?.name ||
                    placeholder}
                <img src={down} alt="open dropdown" />
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map((option) => (
                        <div
                            className="dropdown-item"
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
