import reducer from './reducer';

import {
    inputUrl,
    createUrl,
    createUrlOk,
    createUrlCancel,
    createUrlFail,
    createUrlTimeout,
} from './action';

import {
    getInputUrl,
    getPending,
    getHistory,
    getStash,
} from './selector';

describe('reducer (inputUrl)', () => {
    it('should default to empty string', () => {
        const state = reducer(undefined, {});
        const url = getInputUrl(state);
        expect(url).toBe('');
    });
    it('should store url in state', () => {
        const state = reducer(undefined, inputUrl('123'));
        const url = getInputUrl(state);
        expect(url).toBe('123');
    });
});

describe('reducer (createUrl)', () => {
    const url = 'https://test.com';
    const createUrlAction = createUrl({ url, });

    it('should store pending createUrl actions', () => {
        const state = reducer(undefined, createUrlAction);
        const pending = getPending(state);
        expect(pending).toStrictEqual([createUrlAction]);
    });

    it('should store ok createUrl actions in stash', () => {
        const createUrlResultAction = createUrlOk(createUrlAction);
        let state = reducer(undefined, createUrlAction);
        state = reducer(state, createUrlResultAction);
        const pending = getPending(state);
        const stash = getStash(state);
        expect(pending).toStrictEqual([]);
        expect(stash).toStrictEqual([createUrlResultAction]);
    });

    it('should keep only latest item with unique url in stash', () => {
        const createUrlAction = createUrl({ url: `http://localhost:8080/`, });
        let state = reducer(undefined, createUrlAction);
        state = reducer(state, createUrlOk(createUrlAction));
        state = reducer(state, createUrlAction);
        state = reducer(state, createUrlOk(createUrlAction));
        const stash = getStash(state);
        expect(stash.length).toBe(1);
    });

    it('should make sure stash size do not go over 10 items', () => {
        let state;
        for(let i = 0; i < 11; i++) {
            const createUrlAction = createUrl({ url: `http://localhost:8080/${i}`, });
            state = reducer(state, createUrlAction);
            state = reducer(state, createUrlOk(createUrlAction));
        }
        const stash = getStash(state);
        expect(stash.length).toBe(10);
    });

    const testCreateUrlResult = (createUrlAction, createUrlResultAction) => {
        it(`should clear ${createUrlResultAction.type} actions from pending list and add them to history`, () => {
            let state = reducer(undefined, createUrlAction);
            state = reducer(state, createUrlResultAction);
    
            const pending = getPending(state);
            const history = getHistory(state);
            
            expect(pending).toStrictEqual([]);
            expect(history).toStrictEqual([createUrlResultAction]);
        });
    };

    testCreateUrlResult(createUrlAction, createUrlOk(createUrlAction));
    testCreateUrlResult(createUrlAction, createUrlCancel(createUrlAction));
    testCreateUrlResult(createUrlAction, createUrlFail(createUrlAction));
    testCreateUrlResult(createUrlAction, createUrlTimeout(createUrlAction));
});