export default (state = [], action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return [
        ...state,
        ...action.data
      ];
    case 'TOGGLE_EXPAND_CARD':
      return state.map(_ => _.packageName === action.packageName ? { ..._, isExpanded: action.isExpanded } : _);
    case 'TOGGLE_EXPAND_CARDS':
      return state.map((_, i) => ({
        ..._,
        isExpanded: action.start <= i && i < action.end ? action.isExpanded : _.isExpanded
      }));
    case 'TOGGLE_PACKAGE':
      return state.map(_ => _.packageName === action.packageName ? { ..._, isRemoved: action.isRemoved, recentlyUpdated: true } : _);
    default:
      return state;
  }
};
