import { Input } from "../ui/Input"
import { FC, FormEvent, useState } from "react"
import { toast } from "react-toastify"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { IToken } from "../types"

export const Login: FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error("Заполните все поля!")
            return
        }
        if (!email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            toast.error("Неправильный формат почты!")
            return
        }

        try {
            const { data } = await axios.post<IToken>("/api/auth/login", {
                email,
                password,
            })

            localStorage.setItem("jwt", data.token)
            navigate("/tasks")
        } catch (e: unknown | AxiosError) {
            //ToDo: deal with this tricky piece of code =)
            if (axios.isAxiosError(e)) {
                toast.error("Неправильный логин или пароль!")
            } else {
                toast.error("Неизвестная сервера, попробуйте позже!")
            }
        }
    }

    return (
        <div className="w-full bg-slate-200 h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="border border-slate-200 bg-white rounded-[30px] w-[600px] px-[60px] py-[40px] flex flex-col gap-[30px]"
            >
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
