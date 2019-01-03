import { nextUuid, resetNextUuid } from './uuid';

describe('UUID helper', () => {
    describe('nextUuid', () => {
        it('generates incremental uuids', () => {
            expect(nextUuid()).toBe(0);
            expect(nextUuid()).toBe(1);
        });
    });

    describe('resetNextUuid', () => {
        it('resets the uuid', () => {
            resetNextUuid();
            expect(nextUuid()).toBe(0);
            resetNextUuid();
            expect(nextUuid()).toBe(0);
        });
    });
});
