import { FC } from "react";
import { ITodos } from "../../../entities/todo/types/types";
import clsx from "clsx";

interface ITodoCard {
  isPending: (id: string) => boolean;
  todo: ITodos;
  onUpdate: (id: string, done: boolean) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TodoCard: FC<ITodoCard> = ({
  isPending,
  todo: { title, id, done },
  onUpdate,
  onDelete,
}) => {
  const handleUpdateTodo = () => {
    onUpdate(id, done);
  };
  return (
    <div className="border p-2 rounded-lg flex justify-between  items-center">
      <section>
        <h1 className={clsx(done && "line-through")}>{title}</h1>
        <input type="checkbox" checked={done} onChange={handleUpdateTodo} />
      </section>
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
};

export default TodoCard;
