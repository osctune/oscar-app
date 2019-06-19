// Remove item from list based on id.
export const removeById = (list, action) => list.filter(item => item.id !== action.id);