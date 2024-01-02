/* VENDOR */
import React, { FC, useState } from "react"
import { useAppDispatch } from "../redux/hooks"

/* APPLICATION */
import { createCategoryById } from "../features/categoriesSlice"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { toast } from "react-toastify"

interface CreateCategoryProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateCategory: FC<CreateCategoryProps> = ({ setModal }) => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    function clearForm() {
        setName("")
        setDescription("")
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name === "" || description === "") {
            toast.error("Fill all fields")
            return
        }
        dispatch(createCategoryById({ name, description }))
        clearForm()
        setModal(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setModal(false)
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-[30px]">
            <Input
                value={name}
                label={"Title"}
                placeholder={"Enter title"}
                setValue={setName}
                required
            />
            <Textarea
                value={description}
                label={"Description"}
                placeholder={"Enter description"}
                setValue={setDescription}
                required
            />
            <div className="flex gap-[30px] h-[64px]">
                <button
                    className="button button-default"
                    onClick={handleCancel}
                    type="button"
                >
                    Cancel
                </button>
                <button className="button button-indigo" type="submit">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default CreateCategory
