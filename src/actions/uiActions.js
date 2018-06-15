export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    user
  }
}

export const filterByAuthor = author => {
  return {
    type: 'FILTER_BY_AUTHOR',
    author
  }
}

export const loadAuthors = authors => {
  return {
    type: 'LOAD_AUTHORS',
    authors
  }
}

export const toggleRemovedPackages = showRemoved => {
  return {
    type: 'TOGGLE_REMOVED_PACKAGES',
    showRemoved
  }
}

export const updateTags = tags => {
  return {
    type: 'UPDATE_TAGS',
    tags
  }
}
