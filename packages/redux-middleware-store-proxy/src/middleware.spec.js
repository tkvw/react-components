import middleware from './middleware';

describe('middleware', () => {
    it('returns a function', () => {
        const m = middleware();
        expect(typeof m === 'function');
    });
    it('has a callback function', () => {
        const m = middleware();
        expect(typeof m.withStore === 'function');
    });
    it('delays with state cals', () => {
        const m = middleware();
        const withStore = jest.fn();
        m.withStore(withStore);
        expect(withStore).toHaveBeenCalledTimes(0);
        const store = {};
        withStore(store);
        expect(withStore).toHaveBeenCalledTimes(1);
        expect(withStore).toHaveBeenCalledWith(store);
    });
});
