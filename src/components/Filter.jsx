import { FILTER_NAMES } from '../services/filter';

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
