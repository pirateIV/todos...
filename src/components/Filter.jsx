import { FILTER_NAMES } from '../services/filter';

export const FilterTodos = ({ filter, toggleSearch, handleSearch }) => {
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

export const CustomFilter = ({ e, handleCustomFilter }) => {
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      handleCustomFilter={handleCustomFilter}
    />
  ));
  return <div className='custom-btn-filter'>{filterList}</div>;
};

export const FilterButton = ({ name, handleCustomFilter }) => {
  return (
    <button name={name} onClick={() => handleCustomFilter(name)}>
      {name}
    </button>
  );
};
