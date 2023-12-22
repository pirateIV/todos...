import { FILTER_MAP  } from '../services/filter'
import ListItem from './ListItem';

const TodoList = props => {
  const { todos, handleCheck, handleDelete, customFilter } = props;
  const customTodos = [...todos].filter(FILTER_MAP[customFilter]);
  return (
    <ul className='todos'>
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

export const TodoListLength = ({ todos }) => {
  return <pre className='todosCount'>{todos.length}</pre>;
};

export default TodoList;
