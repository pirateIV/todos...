import React, { useEffect, useRef, useState } from 'react';

import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';

const FILTER_MAP = {
  All: () => true,
  Active: todo => !todo.completed,
  Completed: todo => todo.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

if (localStorage.getItem('todos') === null) {
  localStorage.setItem('todos', JSON.stringify([]));
}

const App = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')));

  const [todo, setTodo] = useState('');
  const [message, setMessage] = useState('');
  const [customFilter, setCustomFilter] = useState('All');

  const setAndUpdateItems = todos => {
    setTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const addTodoRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const handleInput = () => {
      if (todo.length >= 5) {
        addTodoRef.current.disabled = false;
        setMessage('');
      } else {
        addTodoRef.current.disabled = true;
        setMessage(
          todo.length > 0
            ? `Required length remaining ${5 - todo.length}`
            : todo.length === 0 && 'Maximum required length is 5'
        );
      }
    };
    handleInput();
  }, [todo]);

  const handleAddTodo = e => {
    e.preventDefault();
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const newTodo = { id, todo, checked: false };
    const todoItems = [...todos, newTodo];

    setAndUpdateItems(todoItems);
    setTodo('');
  };

  const handleCheck = id => {
    const todoItems = todos.map(todo =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setAndUpdateItems(todoItems);
  };

  const handleDelete = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setAndUpdateItems(updatedTodos);
  };

  const handleFilter = name => {
    console.log(name);
    setCustomFilter(name);
  };

  return (
    <div>
      <h1>TodoList</h1>

      <AddTodo
        todo={todo}
        message={message}
        setTodo={setTodo}
        inputRef={inputRef}
        addTodoRef={addTodoRef}
        handleAddTodo={handleAddTodo}
      />
      {todos.length === 0 ? (
        <p className='empty'>No todos yet...</p>
      ) : (
        todos.length > 0 && (
          <TodoList
            todos={todos}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            customFilter={customFilter}
          />
        )
      )}

      <CustomFilter handleFilter={handleFilter} />

      {todos.length > 0 && <TodoListLength todos={todos} />}
    </div>
  );
};

const AddTodo = ({
  todo,
  setTodo,
  message,
  inputRef,
  addTodoRef,
  handleAddTodo,
}) => {
  return (
    <form onSubmit={handleAddTodo}>
      <input
        ref={inputRef}
        type='text'
        placeholder='Enter Todo...'
        value={todo}
        onChange={e => setTodo(e.target.value)}
      />
      <button ref={addTodoRef} disabled>
        Add Todo
        <FaPlus />
      </button>
      <span className='message'>{message}</span>
    </form>
  );
};

const TodoList = ({ todos, handleCheck, handleDelete, customFilter }) => {
  const customTodos = [...todos].filter(FILTER_MAP[customFilter]);
  return (
    <ul>
      {customTodos.map(todo => (
        <ListItem
          key={todo.id}
          todo={todo}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

const TodoListLength = ({ todos }) => {
  return (
    <>
      <pre className='todosCount'>{todos.length}</pre>
    </>
  );
};

const ListItem = ({ todo, handleCheck, handleDelete }) => (
  <li>
    <input
      type='checkbox'
      checked={todo.checked}
      onChange={() => handleCheck(todo.id)}
    />
    <label htmlFor='todoItem'>{todo.todo}</label>
    <span className='icons'>
      <FaEdit
        tabIndex={0}
        className='editIcon'
        aria-label={`Edit item ${todo.id}`}
      />
      <FaTrashAlt
        tabIndex={0}
        className='deleteIcon'
        aria-label={`Delete item ${todo.id}`}
        onClick={() => handleDelete(todo.id)}
      />
    </span>
  </li>
);

const CustomFilter = ({ e, handleFilter }) => {
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} handleFilter={handleFilter} />
  ));
  return (
    <>
      <div className='custom-btn-filter'>{filterList}</div>
    </>
  );
};

const FilterButton = ({ name, handleFilter }) => {
  return (
    <button name={name} onClick={() => handleFilter(name)}>
      {name}
    </button>
  );
};

export default App;
