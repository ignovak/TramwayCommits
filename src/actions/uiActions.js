export const toggleExpandCards = isExpanded => {
  return {
    type: 'TOGGLE_EXPAND_CARDS',
    isExpanded
  }
}

export const toggleRemovedPackages = showRemoved => {
  return {
    type: 'TOGGLE_REMOVED_PACKAGES',
    showRemoved
  }
}