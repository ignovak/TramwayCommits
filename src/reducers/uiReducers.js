export default (state = {}, action) => {
  switch (action.type) {
    case 'FILTER_BY_AUTHOR':
      return {
        ...state,
        author: action.author
      };
    case 'LOAD_AUTHORS':
      return {
        ...state,
        authors: action.authors
      };
    case 'TOGGLE_EXPAND_CARDS':
      return {
        ...state,
        isExpanded: action.isExpanded
      };
    case 'TOGGLE_REMOVED_PACKAGES':
      return {
        ...state,
        showRemoved: action.showRemoved
      };
    default:
      return state;
  }
};
