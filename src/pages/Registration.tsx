import { FC, FormEvent, useState } from "react"
import { Input } from "../ui/Input"
import { toast } from "react-toastify"

const Registration: FC = () => {
    const [firstName, setFirstName] = useState<string>("")
    const [secondName, setSecondName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!firstName || !secondName || !email || !password) {
            toast.error("Заполните все поля!")
            return
        }
        if (!email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            toast.error("Неправильный формат почты!")
            return
        }
        console.log({ firstName, secondName, email, password })
    }

    return (
        <div className="w-full bg-slate-200 h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="border border-slate-200 bg-white rounded-[30px] w-[600px] px-[60px] py-[40px] flex flex-col gap-[30px]"
            >
                <div className="font-medium text-[22px]">Регистрация</div>
                <Input
                    value={firstName}
                    placeholder={"Введите имя"}
                    setValue={setFirstName}
                />
                <Input
                    value={secondName}
                    placeholder={"Введите фамилию"}
                    setValue={setSecondName}
                />
                <Input
                    value={email}
                    placeholder={"Введите почту"}
                    setValue={setEmail}
                />
                <Input
                    value={password}
                    placeholder={"Введите пароль"}
                    setValue={setPassword}
                />
                <button
                    className="button-indigo h-[64px] rounded-[10px] w-full"
                    type="submit"
                >
                    Зарегистрироваться
                </button>
                <a
                    href="/login"
                    className="text-center w-full hover:text-indigo-500"
                >
                    Уже есть аккаунт? Войдите!
                </a>
            </form>
        </div>
    )
}

export default Registration
