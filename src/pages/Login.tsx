import { Input } from "../ui/Input"
import { FC, FormEvent, useState } from "react"
import { toast } from "react-toastify"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { Token } from "../types"

export const Login: FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error("Fill all fields!")
            return
        }
        if (!email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            toast.error("Wrong email format!")
            return
        }

        try {
            const { data } = await axios.post<Token>("/api/auth/login", {
                email,
                password,
            })

            localStorage.setItem("jwt", data.token)
            navigate("/tasks")
        } catch (e: unknown | AxiosError) {
            if (axios.isAxiosError(e)) {
                toast.error("Wrong login or password!")
            } else {
                toast.error("Uncaught exception, try later!")
            }
        }
    }

    return (
        <div className="w-full bg-slate-200 h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="border border-slate-200 bg-white rounded-[30px] w-[600px] px-[60px] py-[40px] flex flex-col gap-[30px]"
            >
                <div className="font-medium text-[22px]">Authorization</div>
                <Input
                    value={email}
                    placeholder={"Enter email"}
                    setValue={setEmail}
                />
                <Input
                    value={password}
                    placeholder={"Enter password"}
                    setValue={setPassword}
                />
                <button
                    className="button-indigo h-[64px] rounded-[10px]"
                    type="submit"
                >
                    Sign in
                </button>
                <a
                    href="/registration"
                    className="w-full text-center hover:text-indigo-500"
                >
                    Don't have an account yet? Sign up!
                </a>
            </form>
        </div>
    )
}
