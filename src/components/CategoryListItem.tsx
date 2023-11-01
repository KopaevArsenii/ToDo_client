import React, { FC, useState } from "react"
import { Modal } from "./Modal"
import edit from "../icons/edit.svg"
import remove from "../icons/remove.svg"
import EditCategory from "../forms/EditCategory"
import RemoveCategory from "../forms/RemoveCategory"

interface CategoryListItemProps {
    item: {
        id: string
        name: string
        description: string
    }
}
const CategoryListItem: FC<CategoryListItemProps> = ({ item }) => {
    const [editModalActive, setEditModalActive] = useState<boolean>(false)
    const [removeModalActive, setRemoveModalActive] = useState<boolean>(false)

    const handleSwitchEditModal = (e: React.MouseEvent<HTMLButtonElement>) =>
        setEditModalActive((prev) => !prev)
    const handleSwitchRemoveModal = (e: React.MouseEvent<HTMLButtonElement>) =>
        setRemoveModalActive((prev) => !prev)

    return (
        <>
            <Modal
                name={"Редактирование"}
                active={editModalActive}
                setActive={setEditModalActive}
                buttonUnavailable
            >
                <EditCategory item={item} setModal={setEditModalActive} />
            </Modal>

            <Modal
                name={"Удаление"}
                active={removeModalActive}
                setActive={setRemoveModalActive}
            >
                <RemoveCategory setModal={setRemoveModalActive} item={item} />
            </Modal>

            <li className="w-full py-[30px] px-[40px] flex justify-between border border-slate-200 rounded-[30px]">
                <div className={"flex flex-col gap-[20px]"}>
                    <div className={"flex gap-[20px] items-center"}>
                        <div className={"font-medium text-[22px]"}>
                            {item.name}
                        </div>
                    </div>
                    {item.description ? (
                        <div className="text-zinc-400 text-[18px]">
                            {item.description}
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
