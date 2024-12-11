import React, { useState } from 'react';

const App = () => {

  const [todo, setTodo] = useState([])

  const saveTodo = (event) => {
    event.preventDefault();
    const inputElement = event.target.querySelector('#todoInput').value
    if (!todo.includes(inputElement)) {
      const finalTodo = [...todo, inputElement]
      setTodo(finalTodo)
    } else {
      alert("todo Already Exists...")
    }
  }

  const list = todo.map((value, index) => {
    return(
      <TodoListItems value={value} key={index} indexNumber={index} todo={todo} setTodo={setTodo}/>
    )
  })

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className=" mt-3 text-3xl font-bold text-slate-800">TaskIT</h1>
        <form className="mt-4" onSubmit={saveTodo}>
          <input
            id="todoInput"
            type="text"
            placeholder="Enter your task"
            className="border-2 border-slate-300 text-slate-800 p-2 text-lg rounded-md m-2 w-80"
          />
          <button className="border-2 px-4 py-2 rounded-md text-white bg-orange-600 border-orange-700 hover:bg-orange-500">
            Save
          </button>
        </form>

        <div className='w-[400px] ml-2 m-auto rounded-lg border-white'>
          <ul className=''>
            {list}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;

function TodoListItems({ value, indexNumber, todo, setTodo }) {
  const [status, setStatus] = useState(false);

  const deleteRow = () => {
    const finalData = todo.filter((_, i) => i !== indexNumber);
    setTodo(finalData);
  };

  const checkStatus = () => {
    setStatus(!status);
  };

  const taskStyle = status
    ? "line-through text-gray-500 transition-all duration-500"
    : "text-white transition-all duration-500"; 

  const handleDoubleClick = (e) => {
    e.preventDefault();
  };

  return (
    <li
      onClick={checkStatus}
      onDoubleClick={handleDoubleClick}
      className={`bg-black mt-3 rounded-lg p-[10px] text-xl text-left relative cursor-pointer ${taskStyle}`}
    >
      {indexNumber + 1}. {value}
      <span
        onClick={(e) => {
          e.stopPropagation(); // Prevent status toggle on delete
          deleteRow();
        }}
        className="cursor-pointer absolute right-[20px]"
      >
        &times;
      </span>
    </li>
  );
}


