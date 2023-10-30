/* VENDOR */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/* APPLICATION */
import { Modal } from "../components/Modal/Modal";
import { Input } from "../ui/Input/Input";
import { Textarea } from "../ui/Textarea/Textarea";
import { tasksUpdated } from "../features/tasksSlice";
import { categoriesUpdated } from "../features/categoriesSlice";
import {Select} from "../ui/Select/Select";

interface ModalEditItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    category?: string;
  };
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditItem: React.FC<ModalEditItemProps> = ({
  item,
  active,
  setActive,
}) => {
  const dispatch = useDispatch(),
    { pathname } = useLocation(),
    isCategories = pathname.includes("categories"),
    [name, setName] = useState<string>(item.name),
    [category, setCategory] = useState<string>(item.category || ""),
    [description, setDescription] = useState<string>(item.description);

  return (
      <div>Edit item form</div>
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
  );
};
