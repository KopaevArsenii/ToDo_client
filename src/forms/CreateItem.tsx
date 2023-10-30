/* VENDOR */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/* APPLICATION */
import { Modal } from "../components/Modal/Modal";
import { Input } from "../ui/Input/Input";
import { Textarea } from "../ui/Textarea/Textarea";
import { tasksAdded, tasksUpdated } from '../features/tasksSlice'
import { categoriesAdded, categoriesUpdated } from '../features/categoriesSlice';
import {Select} from "../ui/Select/Select";

interface ModalCreateItemProps {
}

export const CreateItem: React.FC<ModalCreateItemProps> = ({}) => {
  const dispatch = useDispatch(),
    { pathname } = useLocation(),
    isCategories = pathname.includes("categories"),
    [name, setName] = useState<string>(""),
    [category, setCategory] = useState<string>(""),
    [description, setDescription] = useState<string>("");

  function clearState() {
    setName("");
    setDescription("");
    setCategory("");
  }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (isCategories) {
            dispatch(categoriesAdded({ name, description}))
        } else {
            dispatch(tasksAdded({ name, description, category}))
        }
    }

  return (
      <form onSubmit={onSubmit}>
          {isCategories ? (
              <Input value={name} label={"Название"} placeholder={"Введите название"} setValue={setName} />
            ) : (
            <div className="modal__content_row">
                <Input value={name} label={"Название"} placeholder={"Введите название"} setValue={setName} />
                <Select value={category} label={"Категории"} placeholder={"Выберете категорию"} setValue={setCategory} />
            </div>
            )}
          <Textarea value={description} label={"Описание"} placeholder={"Введите описание"} setValue={setDescription} />
          <button type="submit">Подтвердить</button>
          <button onClick={() => window.location.reload()} type="button">Отмена</button>
      </form>
    //     clearState={clearState}
    //     submitBtnText="Создать"
    //     size="large"
    //     onSubmit={
    //       name
    //         ? () => {
    //             dispatch(
    //               isCategories
    //                 ? categoriesAdded({ name, description })
    //                 : tasksAdded({
    //                     name,
    //                     description,
    //                     category,
    //                   })
    //             );
    //             clearState();
    //             setActive(false);
    //           }
    //         : () => {}
    //     }
    //   />
    // </Modal>
  );
};
