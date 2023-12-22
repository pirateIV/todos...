import React, { useEffect, useRef, useState } from 'react';

import AddTodo from './components/AddTodo';
import { CustomFilter } from './components/Filter';
import TodoList, { TodoListLength } from './components/TodoList';

import { FaFilter, FaSearch } from 'react-icons/fa';

// set localStorage to avoid errors where null
if (localStorage.getItem('todos') === null) {
  localStorage.setItem('todos', JSON.stringify([]));
}

const App = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')));

  const [todo, setTodo] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [customFilter, setCustomFilter] = useState('All');
  const [toggleSearch, setToggleSearch] = useState(false);

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

  const handleSearch = e => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const todoItems = todos.filter(item =>
    item.todo.toLowerCase().includes(searchValue)
  );

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
          addTodoRef={addTodoRef}
          inputRef={inputRef}
          toggleSearch={toggleSearch}
          handleAddTodo={handleAddTodo}
        />
        <FilterTodos
          filter={searchValue}
          toggleSearch={toggleSearch}
          handleSearch={handleSearch}
        />

        <div>
          <button onClick={() => setToggleSearch(!toggleSearch)}>
            {!toggleSearch ? <FaFilter /> : <FaSearch />}
          </button>
        </div>
        {todos.length === 0 ? (
          <p className='empty'>No todos yet...</p>
        ) : (
          todos.length > 0 && (
            <TodoList
              todos={todoItems}
              handleSearch={handleSearch}
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

const FilterTodos = ({ filter, toggleSearch, handleSearch }) => {
  const toggleSearchDisplay = { display: toggleSearch ? 'block' : 'none' };
  return (
    <input
      type='search'
      value={filter}
      style={toggleSearchDisplay}
      placeholder='Filter Todos...'
      onChange={e => handleSearch(e)}
    />
  );
};

export default App;
