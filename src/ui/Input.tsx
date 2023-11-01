/* APPLICATION */
import important from "../icons/important.svg"

interface InputProps {
    value: string
    placeholder: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    label?: string
    required?: boolean
}

export const Input: React.FC<InputProps> = ({
    value,
    label,
    required = false,
    placeholder,
    setValue,
}) => {
    return (
        <div className={"flex flex-col gap-[10px] w-full"}>
            {label && (
                <div className="flex gap-[4px]">
                    <div className="text-[14px] text-zinc-400">{label}</div>
                    {required && <img src={important} alt="required" />}
                </div>
            )}
            <input
                className="border border-slate-200 hover:border-indigo-500 focus:border-indigo-500 outline-none rounded-[10px] h-[64px] px-[20px]"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
