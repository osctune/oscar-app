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