// Make API request (createUrl).
export const createUrl = async (url) => fetch(`/api/createUrl/${encodeURI(url)}`).then(res => res.text());