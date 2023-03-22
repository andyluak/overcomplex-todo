import React, { useRef } from "react";
import { Kalam } from "next/font/google";

import ListMinus from "../public/icons/list-minus.svg";
import Edit from "../public/icons/edit-3.svg";
import Save from "../public/icons/save.svg";
import TodoItem from "./TodoItem";
import cx from "clsx";

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const TodoList = ({
  id,
  name,
  todos,
  setTodoList,
  deleteTodoList,
  editTodoList,
}) => {
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const addTodo = (todoListId, newTodo) => {
    setTodoList((prev) => {
      return prev.map((todoList) => {
        if (todoList.id === todoListId) {
          return {
            ...todoList,
            todos: [
              ...todoList.todos,
              {
                id: todoList.todos.length + 1 + Math.random(),
                todo: newTodo,
                isDone: false,
              },
            ],
          };
        }
        return todoList;
      });
    });
  };

  const deleteTodo = (todoListId, todoId) => {
    setTodoList((prev) => {
      return prev.map((todoList) => {
        if (todoList.id === todoListId) {
          return {
            ...todoList,
            todos: todoList.todos.filter((todo) => todo.id !== todoId),
          };
        }
        return todoList;
      });
    });
  };

  const toggleDoneTodo = (todoListId, todoId) => {
    setTodoList((prev) => {
      return prev.map((todoList) => {
        if (todoList.id === todoListId) {
          return {
            ...todoList,
            todos: todoList.todos.map((todo) => {
              if (todo.id === todoId) {
                return {
                  ...todo,
                  isDone: !todo.isDone,
                };
              }
              return todo;
            }),
          };
        }
        return todoList;
      });
    });
  };

  const editTodo = (todoListId, todoId, newTodo) => {
    setTodoList((prev) => {
      return prev.map((todoList) => {
        if (todoList.id === todoListId) {
          return {
            ...todoList,
            todos: todoList.todos.map((todo) => {
              if (todo.id === todoId) {
                return {
                  ...todo,
                  todo: newTodo,
                };
              }
            }),
          };
        }
      });
    });
  };

  const onSubmitNewName = (e) => {
    e.preventDefault();
    setIsEditing(false);
    const newName = e.target[0].value;

    if (newName === "") {
      return;
    }

    editTodoList(id, newName);
  };

  const onSubmitNewTodo = (e) => {
    e.preventDefault();
    const newTodo = e.target[0].value;

    if (newTodo === "") {
      return;
    }

    addTodo(id, newTodo);

    e.target[0].value = "";
  };

  return (
    <div className="flex w-1/2 flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        {isEditing ? (
          <form onSubmit={onSubmitNewName}>
            <input
              className="w-full rounded-md bg-transparent p-0.5 text-lg ring-2 ring-slate-300"
              type="text"
              value={name}
              onChange={(e) => editTodoList(id, e.target.value)}
              ref={inputRef}
            />
          </form>
        ) : (
          <h2 className="p-0.5 text-lg">{name}</h2>
        )}
        <div className="flex flex-row gap-1">
          {isEditing ? (
            <button
              className="group rounded-md bg-slate-600 p-1"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              <Save className="h-5 w-5 stroke-green-300 stroke-2 transition-colors group-hover:stroke-green-500" />
              <span className="sr-only">save</span>
            </button>
          ) : (
            <button
              className="group rounded-md bg-slate-600 p-1"
              onClick={() => {
                setIsEditing(true);
                setTimeout(() => {
                  inputRef.current.focus();

                  if (name === "New Todo List") {
                    inputRef.current.setSelectionRange(
                      0,
                      inputRef.current.value.length
                    );
                  }
                }, 1);
              }}
            >
              <Edit className="h-5 w-5 stroke-green-300 stroke-2 transition-colors group-hover:stroke-green-500" />
              <span className="sr-only">delete</span>
            </button>
          )}

          <button
            className="group rounded-md bg-slate-600 p-1"
            onClick={() => deleteTodoList(id)}
          >
            <ListMinus className="h-5 w-5 stroke-red-300 stroke-2 transition-colors group-hover:stroke-red-500" />
            <span className="sr-only">delete</span>
          </button>
        </div>
      </div>
      <div className="post-it min-h-[150px] w-full">
        <ul className={cx(" text-slate-800", kalam.className)}>
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todoListId={id}
                name={todo.todo}
                id={todo.id}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            );
          })}
          <form onSubmit={onSubmitNewTodo}>
            <input type="text" className="min-h-[28px] w-full pl-2 bg-yellow-300 focus:ring-2 ring-red-900 outline-none" />
          </form>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
