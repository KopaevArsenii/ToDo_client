/* VENDOR */
import React, { FC, useState } from "react"

/* APPLICATION */
import Modal from "./Modal"
import EditCategory from "../forms/EditCategory"
import RemoveCategory from "../forms/RemoveCategory"
import edit from "../icons/edit.svg"
import remove from "../icons/remove.svg"
import { ICategory } from "../types"

interface CategoryListItemProps {
    category: ICategory
}
const CategoryListItem: FC<CategoryListItemProps> = ({ category }) => {
    const [editModalActive, setEditModalActive] = useState<boolean>(false)
    const [removeModalActive, setRemoveModalActive] = useState<boolean>(false)

    const handleSwitchEditModal = (e: React.MouseEvent<HTMLButtonElement>) =>
        setEditModalActive((prev) => !prev)
    const handleSwitchRemoveModal = (e: React.MouseEvent<HTMLButtonElement>) =>
        setRemoveModalActive((prev) => !prev)

    return (
        <>
            <Modal
                name={"Edit"}
                active={editModalActive}
                setActive={setEditModalActive}
                buttonUnavailable
            >
                <EditCategory
                    category={category}
                    setModal={setEditModalActive}
                />
            </Modal>

            <Modal
                name={"Delete"}
                active={removeModalActive}
                setActive={setRemoveModalActive}
            >
                <RemoveCategory
                    setModal={setRemoveModalActive}
                    category={category}
                />
            </Modal>

            <li className="w-full py-[30px] px-[40px] flex justify-between border border-slate-200 rounded-[30px]">
                <div className={"flex flex-col gap-[20px]"}>
                    <div className={"flex gap-[20px] items-center"}>
                        <div className={"font-medium text-[22px]"}>
                            {category.name}
                        </div>
                    </div>
                    {category.description ? (
                        <div className="text-zinc-400 text-[18px]">
                            {category.description}
                        </div>
                    ) : null}
                </div>
                <div className={"flex gap-[20px] items-center"}>
                    <button
                        onClick={handleSwitchEditModal}
                        className="border border-slate-200 hover:border-indigo-500 rounded-[8px] w-[40px] h-[40px]"
                    >
                        <img className="m-auto" src={edit} alt={"edit"} />
                    </button>
                    <button
                        onClick={handleSwitchRemoveModal}
                        className="border border-slate-200 hover:border-indigo-500 rounded-[8px] w-[40px] h-[40px]"
                    >
                        <img className="m-auto" src={remove} alt={"remove"} />
                    </button>
                </div>
            </li>
        </>
    )
}

export default CategoryListItem
