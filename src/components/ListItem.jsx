import { FaTrashAlt, FaEdit } from 'react-icons/fa';

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

export default ListItem;
