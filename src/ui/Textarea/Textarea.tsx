interface ModalTextareaProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Textarea: React.FC<ModalTextareaProps> = ({
  value,
  setValue,
}) => {
  return (
    <div className="modaltextarea-wrapper">
      <label htmlFor="modaltextarea">Описание</label>
      <textarea
        id="modaltextarea"
        className="modaltextarea"
        placeholder="Введите описание задачи"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
