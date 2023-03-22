import React, { useRef } from "react";
import ListMinus from "../public/icons/list-minus.svg";
import Edit from "../public/icons/edit-3.svg";
import Save from "../public/icons/save.svg";

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

  const addTodo = (todoListId) => {
    setTodoList((prev) => {
      return prev.map((todoList) => {
        if (todoList.id === todoListId) {
          return {
            ...todoList,
            todos: [
              ...todoList.todos,
              {
                id: todoList.todos.length + 1 + Math.random(),
                todo,
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

    if (newName === "") { return; }

    editTodoList(id, newName);
  }

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
        <ul className="overflow-hidden text-slate-800">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
