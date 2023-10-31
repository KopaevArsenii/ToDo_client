interface InputProps {
    value: string
    label?: string
    placeholder: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    size?: string
}

export const Input: React.FC<InputProps> = ({
    value,
    label,
    placeholder,
    setValue,
}) => {
    return (
        <div className={"flex flex-col gap-[10px] w-full"}>
            {label && <div className="text-[14px] text-zinc-400">{label}</div>}
            <input
                className="border border-slate-200 hover:border-indigo-500 focus:border-indigo-500 outline-none rounded-[10px] h-[64px] px-[40px]"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
