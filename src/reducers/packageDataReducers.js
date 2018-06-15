export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMMIT':
      const data = [...state];
      const item = state.find(_ => _.packageName === action.packageName);
      if (item) {
        item.commits = [...item.commits, { commit: action.commit }];
      } else {
        data.push({
          packageName: action.packageName,
          commits: [{ commit: action.commit }]
        });
        data.sort((a, b) => a.packageName.localeCompare(b.packageName));
      }
      return data;
    case 'ADD_TAG':
      return state.map(_ => {
        return { ..._, tags: _.packageName === action.packageName ? [..._.tags, action.tag] : _.tags };
      });
    case 'DELETE_TAG':
      return state.map(_ => {
        return { ..._, tags: _.packageName === action.packageName ? [..._.tags.filter(_ => _ !== action.tag)] : _.tags };
      });
    case 'LOAD_DATA':
      return [
        ...state,
        ...action.data
      ];
    case 'TOGGLE_COMMIT':
      return state.map(_ => {
        return { ..._, commits: _.commits.map(_ => _.commit === action.commit ? { ..._, isRemoved: action.isRemoved } : _) };
      });
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
