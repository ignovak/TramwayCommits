export default (state = [], action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return [
        ...state,
        ...action.data
      ];
    case 'TOGGLE_PACKAGE':
      console.log('TOGGLE_PACKAGE', action);
      return state.map(_ => _.packageName === action.packageName ? { ..._, isRemoved: action.isRemoved } : _);
    default:
      return state;
  }
};
