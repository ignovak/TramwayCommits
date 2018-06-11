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
