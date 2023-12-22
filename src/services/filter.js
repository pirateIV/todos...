export const FILTER_MAP = {
  All: () => true,
  Active: todo => !todo.completed,
  Completed: todo => todo.completed,
};

export const FILTER_NAMES = Object.keys(FILTER_MAP);

