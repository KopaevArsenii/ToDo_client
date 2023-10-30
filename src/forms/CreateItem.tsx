/* VENDOR */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/* APPLICATION */
import { Modal } from "../components/Modal/Modal";
import { Input } from "../ui/Input/Input";
import { Textarea } from "../ui/Textarea/Textarea";
import { tasksAdded } from "../features/tasksSlice";
import { categoriesAdded } from "../features/categoriesSlice";
import {Select} from "../ui/Select/Select";

interface ModalCreateItemProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateItem: React.FC<ModalCreateItemProps> = ({
  active,
  setActive,
}) => {
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

  return (
      <div>Create Item Form</div>
    // <Modal active={active} setActive={setActive} clearState={clearState}>
    //   <ModalHeader
    //     clearState={clearState}
    //     setActive={setActive}
    //     title={isCategories ? "Создание категории" : "Создание задачи"}
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
