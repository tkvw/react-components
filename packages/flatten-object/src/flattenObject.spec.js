import flattenObject from './flattenObject';

describe('flattenObject', () => {
    it('nested objects', () => {
        const object = flattenObject(
            {
                id: 1,
                name: 'Dennie',
                age: 10,
                test: [{ id: 1 }, 2],
                nested: {
                    id: 10,
                    name: 'Dennie',
                    age: 10,
                    test: [{ id: 1 }, 2],
                },
            },
            {
                excludes: ['name'],
            }
        );
        expect(object).toEqual({
            name: 'Dennie',
            age: 10,
            'test[0]': 1,
            'test[1]': 2,
        });
    });
});
