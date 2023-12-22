import React, { useEffect, useRef, useState } from 'react';

import AddTodo from './components/AddTodo';
import { CustomFilter } from './components/Filter';
import TodoList, { TodoListLength } from './components/TodoList';

// set localStorage to avoid errors where null
if (localStorage.getItem('todos') === null) {
  localStorage.setItem('todos', JSON.stringify([]));
}

const App = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')));

  const [todo, setTodo] = useState('');
  const [filter, setFilter] = useState('My first Task');
  const [customFilter, setCustomFilter] = useState('All');

  const [message, setMessage] = useState('');

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
        setInterval(() => {
          setMessage('');
        }, 5000);
      }
    };
    handleInput();
  }, [todo]);

  const handleAddTodo = e => {
    e.preventDefault();
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const newTodo = { id, todo, checked: false };
    const todoItems = [...todos, newTodo];

    inputRef.current.focus();
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

  const handleFilter = () => {
    
  }

  const handleCustomFilter = name => {
    setCustomFilter(name);
  };

  return (
    <main id='app'>
      <h1>TodoList</h1>

      <section className='todolist-app'>
        <AddTodo
          todo={todo}
          message={message}
          setTodo={setTodo}
          inputRef={inputRef}
          addTodoRef={addTodoRef}
          handleAddTodo={handleAddTodo}
        />
        <FilterTodos filter={filter} setFilter={setFilter} />
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

        <CustomFilter handleCustomFilter={handleCustomFilter} />

        {todos.length > 0 && <TodoListLength todos={todos} />}
      </section>
    </main>
  );
};

const FilterTodos = ({ filter, setFilter }) => {
  return (
    <input
      type='search'
      value={filter}
      onChange={e => setFilter(e.target.value)}
      placeholder='Filter Todos...'
    />
  );
};

export default App;
