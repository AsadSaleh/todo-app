import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import { loadTodos, saveTodos } from "./database/todo";

/*
todo = {
  id: uuid,
  title: string,
  isCompleted: boolean,
}
*/

export default function App() {
  const [todos, setTodos] = useState(() => loadTodos());

  function createTodo(todoItem) {
    setTodos(todos.concat(todoItem));
  }

  function toggleTodoComplete(id) {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      })
    );
  }

  function handleDeleteTodo(id) {
    setTodos((todos) => {
      return todos.filter((todo) => todo.id !== id);
    });
  }

  // Setiap ada perubahan `todos`, simpan ke local storage:
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const activeTodos = todos.filter((e) => !e.isCompleted);
  const completedTodos = todos.filter((e) => e.isCompleted);

  return (
    <div className="p-5">
      <h1 className="text-2xl">Awesome Todo App!</h1>

      {/* Form untuk Create New Todo */}
      <form
        className="mt-3"
        onSubmit={(e) => {
          e.preventDefault();
          const formValue = e.target.elements.todo.value;
          e.target.elements.todo.value = "";
          createTodo({ id: uuidv4(), title: formValue, isCompleted: false });
        }}
      >
        <input
          name="todo"
          className="border-2"
          placeholder="Create New Todo..."
        />
        <button type="submit" className="bg-green-200 mx-2 px-2 rounded-lg">
          Buat Baru
        </button>
      </form>

      {/* Tampilkan Datanya */}
      <div className="mt-3">
        <h4>Harus dikerjakan:</h4>
        {activeTodos.length !== 0 ? (
          activeTodos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-2">
              <button onClick={() => toggleTodoComplete(todo.id)}>
                &#9711;
              </button>
              <div
                className={classNames("font-extralight", {
                  "line-through": todo.isCompleted,
                  "text-gray-600": todo.isCompleted,
                })}
              >
                {todo.title}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-xs">
            Todo list kosong. Have a great day 😊 !
          </div>
        )}
      </div>

      {/* Tampilkan item yang sudah complete */}
      {completedTodos.length !== 0 && (
        <div className="mt-3">
          <h4>Selesai:</h4>
          {completedTodos.map((todo) => (
            <div
              key={todo.id}
              className="group relative flex items-center gap-2"
            >
              <button onClick={() => toggleTodoComplete(todo.id)}>
                &#9711;
              </button>
              <div
                className={classNames("font-extralight", {
                  "line-through": todo.isCompleted,
                  "text-gray-600": todo.isCompleted,
                })}
              >
                {todo.title}
              </div>
              <button
                className="group-hover:block hidden"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <span className="text-red-800">&#x2715;</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
