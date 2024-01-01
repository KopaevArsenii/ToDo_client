/* VENDOR */
import React from "react"
import { useAppDispatch } from "../redux/hooks"

/* APPLICATION */
import { deleteCategoryById } from "../features/categoriesSlice"
import { ICategory } from "../types"

interface RemoveCategoryProps {
    category: ICategory
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RemoveCategory: React.FC<RemoveCategoryProps> = ({
    category,
    setModal,
}) => {
    const dispatch = useAppDispatch()
    const text = `Are you sure you want delete category "${category.name}"?`

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(deleteCategoryById(category.id))
        setModal(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setModal(false)
    }

    return (
        <form className="flex flex-col gap-[30px]" onSubmit={onSubmit}>
            <div className="text-[22px]">{text}</div>
            <div className="flex gap-[30px] h-[64px]">
                <button
                    className="button button-default"
                    onClick={handleCancel}
                    type="button"
                >
                    Cancel
                </button>
                <button className="button button-red" type="submit">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default RemoveCategory
