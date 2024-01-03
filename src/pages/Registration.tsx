import { FC, FormEvent, useState } from "react"
import { Input } from "../ui/Input"
import { toast } from "react-toastify"
import axios, { AxiosError } from "axios"
import { Token } from "../types"
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
            toast.error("Fill all fields!")
            return
        }
        if (!email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            toast.error("Wrong email format!")
            return
        }
        try {
            const { data } = await axios.post<Token>("/api/auth/register", {
                firstname,
                lastname,
                email,
                password,
            })

            localStorage.setItem("jwt", data.token)
            navigate("/tasks")
        } catch (e: unknown | AxiosError) {
            if (axios.isAxiosError(e)) {
                toast.error(e?.response?.data)
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
                <div className="font-medium text-[22px]">Registration</div>
                <Input
                    value={firstname}
                    placeholder={"Enter firstname"}
                    setValue={setFirstname}
                />
                <Input
                    value={lastname}
                    placeholder={"Enter lastname"}
                    setValue={setLastname}
                />
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
                    className="button-indigo h-[64px] rounded-[10px] w-full"
                    type="submit"
                >
                    Sign up
                </button>
                <a
                    href="/login"
                    className="text-center w-full hover:text-indigo-500"
                >
                    Already have an account? Sign in!
                </a>
            </form>
        </div>
    )
}

export default Registration
