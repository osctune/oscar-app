import {
    localStorageKey,
    saveState,
    loadState,
    clearState,
} from '../localStore';

beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
});

describe('loadState', () => {
    it('should load state from localStorage', () => {
        const result = loadState();
        expect(result).toBe(undefined);
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledWith(localStorageKey);
    });
    it('should return null when not initialized', () => {
        const result = loadState();
        expect(result).toBe(undefined);
    });
});

describe('saveState', () => {
    it('should save state to localstore', () => {
        saveState({
            a: 1,
        });
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(localStorageKey, '{"a":1}');
    });
});

describe('clearState', () => {
    it('should clear localstore item', () => {
        clearState();
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
        expect(localStorage.removeItem).toHaveBeenCalledWith(localStorageKey);
    });
});