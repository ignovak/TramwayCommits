export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        authors: [...state.authors, action.user].sort()
      };
    case 'FILTER_BY_AUTHOR':
      return {
        ...state,
        author: action.author
      };
    case 'FILTER_BY_TAG':
      return {
        ...state,
        tag: action.tag
      };
    case 'LOAD_AUTHORS':
      return {
        ...state,
        authors: action.authors
      };
    case 'TOGGLE_REMOVED_PACKAGES':
      return {
        ...state,
        showRemoved: action.showRemoved
      };
    case 'UPDATE_TAGS':
      return {
        ...state,
        suggestions: new Set([...state.suggestions, ...action.tags])
      };
    default:
      return state;
  }
};
