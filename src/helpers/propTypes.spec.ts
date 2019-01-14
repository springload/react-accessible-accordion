import * as propTypes from './propTypes';

describe('propTypes', () => {
    describe('wildcard', () => {
        it('does not return an error, no matter what you throw at it', () => {
            const tests = [null, undefined, 1, 'foo', { foo: 'foo' }, ['foo']];
            expect.assertions(tests.length);

            // tslint:disable-next-line:no-any
            tests.forEach((test: any) =>
                expect(propTypes.wildcard(test)).not.toBeInstanceOf(Error),
            );
        });
    });
});
