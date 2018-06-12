export const toggleExpandCards = (isExpanded, packageName) => {
  return {
    type: 'TOGGLE_EXPAND_CARDS',
    packageName,
    isExpanded
  };
}

export const togglePackage = (packageName, isRemoved) => {
  return {
    type: 'TOGGLE_PACKAGE',
    packageName,
    isRemoved
  }
}

export const loadData = data => {
  return {
    type: 'LOAD_DATA',
    data
  }
}
