export default (state = [], action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return [
        ...state,
        ...action.data
      ];
    case 'TOGGLE_PACKAGE':
      return state.map(_ => _.packageName === action.packageName ? { ..._, isRemoved: action.isRemoved, recentlyUpdated: true } : _);
    default:
      return state;
  }
};
