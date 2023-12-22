import React, { useRef, useState } from 'react';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', checked: false },
    { id: 2, text: 'Write code', checked: true },
    { id: 3, text: 'Go for a run', checked: true },
    // Add more todos as needed
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('');
  const [customFilter, setCustomFilter] = useState('');
  const [message, setMessage] = useState('');

  const searchField = useRef();

  const setTodoValue = e => {
    const todo = e.target.value;
    setNewTodo(todo);
  };

  const createNewTodo = e => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      const newTodoObj = {
        id: todos.length + 1,
        text: newTodo,
        checked: false,
      };
      setTodos([...todos, newTodoObj]);
      setNewTodo('');
    }
  };

  // const setMessage = () => {};
  const filterTodos = e => {
    setFilter(e.target.value.toLowerCase());
    e.preventDefault();
  };

  const filteredTodos = todos.filter(todo => {
    return todo.text.trim().toLowerCase().includes(filter);
  });

  const filterThis = filter => {
    let updatedTodos = [...todos];
    // setTodos( 
     console.log(
      updatedTodos.filter(todo => {
        if (filter === 'All') return true;
        if (filter === 'Active') return !todo.checked;
        if (filter === 'checked') return todo.checked;

        // default condition: return true for any other filter value
        return true
      })
     )
    // );
  };

  const handleToggle = id => {
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setTodos([...updatedTodos]);
  };

  const handleDelete = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos([...updatedTodos]);
  };

  const handleSearch = () => {
    searchField.current.focus()
      ? searchField.current.placeholder === 'Search for todos'
      : searchField.current.placeholder === 'add todos...';
  };

  return (
    <>
      <main id='todoApp'>
        <div>
          <h1>Todo App</h1>

          <AddTodo
            newTodo={newTodo}
            setTodo={setTodoValue}
            handleAddTodo={createNewTodo}
          />
          <section className='status'>
            <div className='icons'>
              <i>
                {' '}
                <FaSearch onClick={() => handleSearch()} />
              </i>
            </div>
            <p>
              {todos.length} {todos.length === 1 ? 'item' : 'items'} remaining
            </p>
            <div className='filter-btn-group'>
              <button onClick={() => filterThis('All')}>All</button>
              <button onClick={() => filterThis('Active')}>Active</button>
              <button onClick={() => filterThis('checked')}>checked</button>
            </div>
          </section>
          <TodoList
            filteredTodos={filteredTodos}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        </div>

        {todos.length > 0 && (
          <Filter filterTodos={filterTodos} searchRef={searchField} />
        )}
      </main>
    </>
  );
};

const Filter = ({ filterTodos, searchRef }) => {
  return (
    <input
      type='search'
      className='filterTodos'
      placeholder='filter todos...'
      onChange={filterTodos}
      ref={searchRef}
    />
  );
};
// createNewTodo
const AddTodo = ({ handleAddTodo, newTodo, setTodo }) => {
  return (
    <form onSubmit={handleAddTodo}>
      <input
        type='text'
        placeholder='add todo...'
        value={newTodo}
        onChange={setTodo}
      />
      <button>Add</button>
    </form>
  );
};

const TodoList = props => {
  const { filteredTodos, handleToggle, handleDelete } = props;
  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id}>
          <input
            type='checkbox'
            className='todoInput'
            checked={todo.checked}
            onChange={() => handleToggle(todo.id)}
          />
          <label htmlFor='todoInput'>{todo.text}</label>
          <FaTrashAlt
            onClick={() => handleDelete(todo.id)}
            role='button'
            tabIndex={0}
            aria-label={`Delete ${todo.text}`}
          />
        </li>
      ))}
    </ul>
  );
};

const StatusMessage = ({ message }) => {
  return (
    <div className='status'>
      <p>{message}</p>
    </div>
  );
};

export default App;
