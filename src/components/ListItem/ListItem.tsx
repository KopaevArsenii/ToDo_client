/* VENDOR */
import { useState } from "react"
import { useSelector } from "react-redux"

/* APPLICATION */
import edit from "../../icons/edit.svg"
import remove from "../../icons/remove.svg"
import { getAllCategories } from "../../features/categoriesSlice"
import { EditItem } from "../../forms/EditItem"
import { RemoveItem } from "../../forms/RemoveItem"
import { Modal } from "../Modal/Modal"

interface ListItemProps {
    item: {
        id: string
        name: string
        description: string
        category?: string
    }
}

export const ListItem: React.FC<ListItemProps> = ({ item }) => {
    const categories = useSelector(getAllCategories)
    const [editModalActive, setEditModalActive] = useState<boolean>(false)
    const [removeModalActive, setRemoveModalActive] = useState<boolean>(false)

    const handleSwitchEditModal = (e: React.MouseEvent<HTMLButtonElement>) =>
        setEditModalActive((prev) => !prev)
    const handleSwitchRemoveModal = (e: React.MouseEvent<HTMLButtonElement>) =>
        setRemoveModalActive((prev) => !prev)

    const categoryName = categories.find(
        (category) => category.id === item.category,
    )?.name

    return (
        <>
            <Modal
                name={"Редактирование"}
                active={editModalActive}
                setActive={setEditModalActive}
                buttonUnavailable
            >
                <EditItem setModal={setEditModalActive} item={item} />
            </Modal>

            <Modal
                name={"Удаление"}
                active={removeModalActive}
                setActive={setRemoveModalActive}
            >
                <RemoveItem setModal={setRemoveModalActive} item={item} />
            </Modal>

            <li className="w-full py-[30px] px-[40px] flex justify-between border border-slate-200 rounded-[30px]">
                <div className={"flex flex-col gap-[20px]"}>
                    <div className={"flex gap-[20px] items-center"}>
                        <div className={"font-medium text-[22px]"}>
                            {item.name}
                        </div>
                        {categoryName ? (
                            <div className="px-[25px] py-[5px] rounded-[6px] border border-slate-200 text-[14px]">
                                {categoryName}
                            </div>
                        ) : null}
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

    // return (
    //     <>
    //         <li className="list-item">
    //             <div className="list-item-col1">
    //                 <div className="list-item-col1-row1">
    //                     <h3 className="list-item-col1-row1__title">
    //                         {item.name}
    //                     </h3>
    //                     {item.category && (
    //                         <span className="list-item-col1-row1__category">
    //                             {
    //                                 categories.find(
    //                                     (category) =>
    //                                         category.id === item.category,
    //                                 )?.name
    //                             }
    //                         </span>
    //                     )}
    //                 </div>
    //                 <div className="list-item-col1-row2">
    //                     {item.description}
    //                 </div>
    //             </div>
    //             <div className="list-item-col2">
    //                 <button
    //                     className="list-item-col2__btn"
    //                     onClick={handleSwitchEditModal}
    //                 >
    //                     <img src={edit} alt="edit" />
    //                 </button>
    //                 <button
    //                     className="list-item-col2__btn"
    //                     onClick={handleSwitchRemoveModal}
    //                 >
    //                     <img src={remove} alt="remove" />
    //                 </button>
    //             </div>
    //             <Modal
    //                 name={"Редактирование"}
    //                 active={editModalActive}
    //                 setActive={setEditModalActive}
    //                 buttonUnavailable
    //             >
    //                 <EditItem setModal={setEditModalActive} item={item} />
    //             </Modal>
    //
    //             <Modal
    //                 name={"Удаление"}
    //                 active={removeModalActive}
    //                 setActive={setRemoveModalActive}
    //             >
    //                 <RemoveItem setModal={setRemoveModalActive} item={item} />
    //             </Modal>
    //         </li>
    //     </>
}
