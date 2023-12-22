import  { FILTER_NAMES } from '../services/filter'

export const CustomFilter = ({ e, handleFilter }) => {
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} handleFilter={handleFilter} />
  ));
  return <div className='custom-btn-filter'>{filterList}</div>;
};

export const FilterButton = ({ name, handleFilter }) => {
  return (
    <button name={name} onClick={() => handleFilter(name)}>
      {name}
    </button>
  );
};
