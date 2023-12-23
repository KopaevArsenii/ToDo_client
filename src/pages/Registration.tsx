import { FC, FormEvent, useState } from "react"
import { Input } from "../ui/Input"
import { toast } from "react-toastify"
import axios, { AxiosError } from "axios"
import { IToken } from "../types"
import { useNavigate } from "react-router-dom"

const Registration: FC = () => {
    const navigate = useNavigate()

    const [firstname, setFirstname] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!firstname || !lastname || !email || !password) {
            toast.error("Заполните все поля!")
            return
        }
        if (!email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            toast.error("Неправильный формат почты!")
            return
        }
        try {
            const { data } = await axios.post<IToken>("/api/auth/register", {
                firstname,
                lastname,
                email,
                password,
            })

            localStorage.setItem("jwt", data.token)
            navigate("/tasks")
        } catch (e: unknown | AxiosError) {
            //ToDo: deal with this tricky piece of code =)
            if (axios.isAxiosError(e)) {
                toast.error(e?.response?.data)
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
                <div className="font-medium text-[22px]">Регистрация</div>
                <Input
                    value={firstname}
                    placeholder={"Введите имя"}
                    setValue={setFirstname}
                />
                <Input
                    value={lastname}
                    placeholder={"Введите фамилию"}
                    setValue={setLastname}
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
