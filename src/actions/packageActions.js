export const addCommit = (packageName, commit) => {
  return {
    type: 'ADD_COMMIT',
    packageName,
    commit
  }
}

export const toggleCommit = (commit, isRemoved) => {
  return {
    type: 'TOGGLE_COMMIT',
    commit,
    isRemoved
  }
}

export const toggleExpandCard = (isExpanded, packageName) => {
  return {
    type: 'TOGGLE_EXPAND_CARD',
    packageName,
    isExpanded
  };
}

export const toggleExpandCards = (isExpanded, start, end) => {
  return {
    type: 'TOGGLE_EXPAND_CARDS',
    start,
    end,
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
