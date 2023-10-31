import "./Textarea.css"
interface ModalTextareaProps {
    value: string
    label: string
    placeholder: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export const Textarea: React.FC<ModalTextareaProps> = ({
    value,
    label,
    placeholder,
    setValue,
}) => {
    return (
        <div className="modaltextarea-wrapper">
            <label htmlFor="modaltextarea">{label}</label>
            <textarea
                id="modaltextarea"
                className="modaltextarea"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
