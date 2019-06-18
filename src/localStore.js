export const localStorageKey = 'state';
const { localStorage } = window ? window : global;

export const loadState = () => {
    try {
        // Load and parse item, default to undefined.
        return JSON.parse(localStorage.getItem(localStorageKey)) || undefined;
    } catch(err) {
        // If invalid state, default to undefined.
        return undefined;
    }
};

export const saveState = (state) => {
    // Don't allow undefined state.
    if(state === undefined) {
        throw new Error('Value is required.');
    }
    // Serialize and save.
    localStorage.setItem(localStorageKey, JSON.stringify(state || null));
};

export const clearState = () => {
    localStorage.removeItem(localStorageKey);
};