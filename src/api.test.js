import { createUrl } from './api';

beforeAll(() => {
    global.API_URL = 'API_URL';
    //global.REDIRECT_URL = 'REDIRECT_URL';
    global.fetch = async () => {};
});

beforeEach(() => {
    const mockJsonPromise = Promise.resolve({});
    const mockTextPromise = Promise.resolve('');
    const mockFetchPromise = Promise.resolve({
        text: () => mockTextPromise,
        json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
});

afterEach(() => {
    global.fetch.mockClear();
});

describe('createUrl', () => {
    it('should call fetch once with encoded url', async () => {
        const testUrl = 'https://duckduckgo.com/   123';
        const expectedRequestUrl = `${API_URL}/createUrl/https://duckduckgo.com/%20%20%20123`;
        await createUrl(testUrl);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(expectedRequestUrl);
    });
});