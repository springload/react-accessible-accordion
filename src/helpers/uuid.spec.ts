import { nextUuid, resetNextUuid } from './uuid';

describe('UUID helper', () => {
    describe('nextUuid', () => {
        it('generates incremental uuids', () => {
            expect(nextUuid()).toBe('raa-0');
            expect(nextUuid()).toBe('raa-1');
        });
    });

    describe('resetNextUuid', () => {
        it('resets the uuid', () => {
            resetNextUuid();
            expect(nextUuid()).toBe('raa-0');
            resetNextUuid();
            expect(nextUuid()).toBe('raa-0');
        });
    });
});
