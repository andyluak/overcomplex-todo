import { Nunito_Sans } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import cx from "clsx";

import ListPlus from "../public/icons/list-plus.svg";

const inter = Nunito_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  const addTodoList = () => {
    setTodoList((prev) => {
      return {
        name: "New Todo List",
        id: prev.length + 1 + Math.random(),
        todos: [],
      };
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
          "flex min-h-screen flex-col items-center bg-gradient-to-tl from-slate-900 to-slate-700 p-24",
          inter.className
        )}
      >
        <h1 className="text-4xl">Overcomplicated Todo App</h1>
        <section>
          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-tl from-purple-700 to-blue-800 p-0.5 text-sm font-medium text-slate-300 hover:stroke-white hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600">
            <span className="relative flex items-center justify-center gap-2 rounded-md bg-gray-900 px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
              <ListPlus className="-mt-[1px] stroke-gray-300 group-hover:stroke-gray-100" />
              Add New Todo List
            </span>
          </button>
        </section>
      </main>
    </>
  );
}
