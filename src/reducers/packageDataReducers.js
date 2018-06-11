export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};
