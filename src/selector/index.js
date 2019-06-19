export const getInputUrl = state => state.url;
export const getPending = state => state.pending;
export const getStash = state => state.stash;
export const getHistory = state => state.history;
export const getPersistedState = state => ({
    stash: state.stash,
});