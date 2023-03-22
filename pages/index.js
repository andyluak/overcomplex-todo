import { Nunito_Sans } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import cx from "clsx";

import ListPlus from "../public/icons/list-plus.svg";
import TodoList from "@/components/TodoList";

const inter = Nunito_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  const addTodoList = () => {
    setTodoList((prev) => {
      return [
        ...prev,
        {
          name: "New Todo List",
          id: prev.length + 1 + Math.random(),
          todos: [],
        },
      ];
    });
  };

  const editTodoList = (todoListId, newTodoListName) => {
    setTodoList((prev) => {
      return prev.map((todoList) => {
        if (todoList.id === todoListId) {
          return {
            ...todoList,
            name: newTodoListName,
          };
        }
        return todoList;
      });
    });
  };

  const deleteTodoList = (todoListId) => {
    setTodoList((prev) => {
      return prev.filter((todoList) => todoList.id !== todoListId);
    });
  };

  return (
    <>
      <Head key="head">
        <title>Overcomplicated Todo App</title>
      </Head>
      <main
        className={cx(
          "flex min-h-screen flex-col items-center gap-4 bg-gradient-to-tl from-slate-900 to-slate-700 p-24",
          inter.className
        )}
      >
        <h1 className="text-4xl">Overcomplicated Todo App</h1>
        <button
          className="text-md group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-tl from-yellow-500 to-yellow-200 p-0.5 font-medium text-slate-300 hover:stroke-white hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={addTodoList}
        >
          <span
            className="relative flex items-center justify-center gap-2 rounded-md bg-gray-900 px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-gray-900 group-hover:[text-shadow:0_0_1px_black;]"
            data-text="Add New Todo List"
          >
            <ListPlus className="-mt-[1px] stroke-gray-300 group-hover:stroke-gray-900" />
            Add New Todo List
          </span>
          
        </button>
        <section className="grid w-full grid-cols-2 gap-8">
          {todoList.length !== 0 &&
            todoList.map((todoList) => (
              <TodoList
                key={todoList.id}
                id={todoList.id}
                name={todoList.name}
                todos={todoList.todos}
                setTodoList={setTodoList}
                editTodoList={editTodoList}
                deleteTodoList={deleteTodoList}
              />
            ))}
        </section>
      </main>
    </>
  );
}
