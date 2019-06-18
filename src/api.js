"use strict";

// Make API request (createUrl).
export const createUrl = async (url) => {
    return fetch(`${API_URL}/api/createUrl/${encodeURIComponent(url)}`, {
        method: 'POST',
    });
};