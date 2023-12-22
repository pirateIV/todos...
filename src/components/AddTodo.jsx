import { FaPlus } from 'react-icons/fa';

const AddTodo = props => {
  const { todo, setTodo, message, inputRef, addTodoRef, handleAddTodo } = props;
  return (
    <>
      <form onSubmit={handleAddTodo} className='addTodoForm'>
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
      </form>
      <span className='message'>{message}</span>
    </>
  );
};

export default AddTodo;
