export default (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_CARDS':
      return {
        ...state,
        isExpanded: action.isExpanded
      };
    default:
      return state;
  }
};
