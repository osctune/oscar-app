export const localStorageKey = 'state';
const { localStorage } = window ? window : global;

export const loadState = () => {
    try {
        // Load and parse item, default to null.
        return JSON.parse(localStorage.getItem(localStorageKey)) || null;
    } catch(err) {
        // If invalid state, default to null.
        return null;
    }
};

export const saveState = (state) => {
    // Don't allow undefined state.
    if(state === undefined) {
        throw new Error('Value is required.');
    }
    // Serialize and save.
    localStorage.setItem(localStorageKey, JSON.stringify(state));
};

export const clearState = () => {
    localStorage.removeItem(localStorageKey);
};