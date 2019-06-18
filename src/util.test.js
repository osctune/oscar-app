import { removeById } from './util';

describe('removeById', () => {
    it('should return a new list without items with the same id as the item provided', () => {
        const list = [
            { id: 1, },
            { id: 2, },
            { id: 3, },
        ];

        const newList = removeById(list, { id: 2 });

        expect(list).toStrictEqual([
            { id: 1, },
            { id: 2, },
            { id: 3, },
        ]);

        expect(newList).toStrictEqual([
            { id: 1, },
            { id: 3, },
        ]);
    });
});