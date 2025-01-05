import { FC } from "react";
import { ITodos } from "../../../entities/todo/types/types";

interface ITodoCard {
  isPending: (id: string) => boolean;
  todo: ITodos;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TodoCard: FC<ITodoCard> = ({
  isPending,
  todo: { title, id },
  onDelete,
}) => (
  <div className="border p-2 rounded-lg flex justify-between  items-center">
    <h1>{title}</h1>
    <button
      value={id}
      onClick={onDelete}
      disabled={isPending(id)}
      className="border bg-red-400 text-white p-2 px-4 rounded-lg"
    >
      удалить
    </button>
  </div>
);

export default TodoCard;
