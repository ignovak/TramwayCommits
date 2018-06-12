export default (state = [], action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return [
        ...state,
        ...action.data
      ];
    case 'TOGGLE_EXPAND_CARDS':
      if (action.packageName) {
        return state.map(_ => _.packageName === action.packageName ? { ..._, isExpanded: action.isExpanded } : _);
      } else {
        return state.map(_ => ({ ..._, isExpanded: action.isExpanded }));
      }
    case 'TOGGLE_PACKAGE':
      return state.map(_ => _.packageName === action.packageName ? { ..._, isRemoved: action.isRemoved, recentlyUpdated: true } : _);
    default:
      return state;
  }
};
