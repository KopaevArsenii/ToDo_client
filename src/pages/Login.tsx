import { Input } from "../ui/Input"
import { FC, useState } from "react"

export const Login: FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    return (
        <div className="w-full bg-slate-200 h-screen flex justify-center items-center">
            <form className="border border-slate-200 bg-white rounded-[30px] w-[600px] px-[60px] py-[40px] flex flex-col gap-[30px]">
                <div className="font-medium text-[22px]">Авторизация</div>
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
                    className="button-indigo h-[64px] rounded-[10px]"
                    type="submit"
                >
                    Войти
                </button>
                <a
                    href="/registration"
                    className="w-full text-center hover:text-indigo-500"
                >
                    Ещё нет аккакунта? Заригестрируйтесь!
                </a>
            </form>
        </div>
    )
}
