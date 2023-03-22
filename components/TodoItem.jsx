import React, { useRef, useState } from "react";

import Trash from "../public/icons/trash.svg";
import Pencil from "../public/icons/pencil.svg";
import cx from "clsx";

const TodoItem = ({ name, id, deleteTodo, todoListId, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const onSubmitNewTodoName = (e) => {
    e.preventDefault();
    setIsEditing(false);

    const newTodoName = e.target[0].value;

    if (newTodoName === "") return;

    editTodo(todoListId, id, newTodoName);
  };

  return (
    <div
      className={cx("pl-2} flex min-h-[30px] flex-row justify-between", {
        "p-1": !isEditing,
      })}
    >
      {isEditing ? (
        <form className="mr-2 w-full" onSubmit={onSubmitNewTodoName}>
          <input
            type="text"
            className="min-h-[28px] w-full bg-yellow-300 pl-2 outline-none ring-red-900 focus:ring-2"
            ref={inputRef}
            defaultValue={name}
          />
        </form>
      ) : (
        <h3 className="text-base">{name}</h3>
      )}
      <div className="flex flex-row gap-1">
        <button
          onClick={() => {
            setIsEditing(true);

            setTimeout(() => {
              inputRef.current.focus();
            }, 1);
          }}
          className="group"
        >
          <Pencil className="h-5 w-5 stroke-green-700 stroke-2 transition-colors hover:stroke-green-900 group-focus:stroke-green-900" />
          <span className="sr-only">save</span>
        </button>
        <button
          onClick={() => {
            deleteTodo(todoListId, id);
          }}
          className="group"
        >
          <Trash className="h-5 w-5 stroke-red-700 stroke-2 transition-colors hover:stroke-red-900 group-focus:stroke-red-900" />
          <span className="sr-only">save</span>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
