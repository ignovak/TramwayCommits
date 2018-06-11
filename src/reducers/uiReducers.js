export default (state = {}, action) => {
  switch (action.type) {
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
