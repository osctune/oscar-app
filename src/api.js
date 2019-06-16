// Make API request (createUrl).
export const createUrl = async (url) => fetch(`${API_URL}/createUrl/${encodeURI(url)}`).then(res => res.text());