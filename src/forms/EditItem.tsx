/* VENDOR */
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

/* APPLICATION */
import { Input } from "../ui/Input/Input"
import { Textarea } from "../ui/Textarea/Textarea"
import { updateTask } from "../features/tasksSlice"
import { updateCategory } from "../features/categoriesSlice"
import { Select } from "../ui/Select/Select"

interface EditItemProps {
    item: {
        id: string
        name: string
        description: string
        category?: string
    }
}

export const EditItem: React.FC<EditItemProps> = ({ item }) => {
    const dispatch = useDispatch(),
        { pathname } = useLocation(),
        isCategories = pathname.includes("categories"),
        [name, setName] = useState<string>(item.name),
        [category, setCategory] = useState<string>(item.category || ""),
        [description, setDescription] = useState<string>(item.description)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name === "") return

        if (isCategories) {
            dispatch(updateCategory({ id: item.id, name, description }))
        } else {
            dispatch(updateTask({ id: item.id, name, description, category }))
        }
    }
    return (
        <form onSubmit={onSubmit}>
            {isCategories ? (
                <Input
                    value={name}
                    label={"Название"}
                    placeholder={"Введите название"}
                    setValue={setName}
                />
            ) : (
                <div className={"modal__content_row"}>
                    <Input
                        value={name}
                        label={"Название"}
                        placeholder={"Введите название"}
                        setValue={setName}
                    />
                    <Select
                        value={category}
                        label={"Категория"}
                        placeholder={"Выберете категориб"}
                        setValue={setCategory}
                    />
                </div>
            )}

            <Textarea
                value={description}
                label={"Описание"}
                placeholder={"Введите описание"}
                setValue={setDescription}
            />
            <button type="submit">Подтвердить</button>
            <button onClick={() => window.location.reload()} type="button">
                Отмена
            </button>
        </form>
        // <Modal item={item} active={active} setActive={setActive}>
        //   <ModalHeader
        //     setActive={setActive}
        //     title={
        //       isCategories ? "Редактирование категории" : "Редактирование задачи"
        //     }
        //   />
        //   {isCategories ? (
        //     <Input name={name} setValue={setName} size="large" />
        //   ) : (
        //   <div className="modal__content_row">
        //       <Input name={name} setValue={setName} />
        //       <Select value={category} setValue={setCategory} />
        //   </div>
        //   )}
        //   <Textarea
        //     value={description}
        //     setValue={setDescription}
        //   />
        //   <ModalFooter
        //     setActive={setActive}
        //     submitBtnText="Сохранить"
        //     size="large"
        //     onSubmit={() => {
        //       dispatch(
        //         isCategories
        //           ? categoriesUpdated({ id: item.id, name, description })
        //           : tasksUpdated({ id: item.id, name, description, category })
        //       );
        //       setActive(false);
        //     }}
        //   />
        // </Modal>
    )
}
