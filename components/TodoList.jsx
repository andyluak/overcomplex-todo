import React from "react";

const TodoList = ({ id, name, todos, setTodoList }) => {

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


  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
