import { assertValidHtmlId, nextUuid, resetNextUuid } from './uuid';

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

    describe('assertValidHtmlId', () => {
        it("returns false in case there's a whitespace or an empty string", () => {
            expect(assertValidHtmlId('a a')).toBe(false);
            expect(assertValidHtmlId('')).toBe(false);
        });

        it('returns true on a valid id', () => {
            expect(assertValidHtmlId('💜')).toBe(true);
            expect(assertValidHtmlId('✅')).toBe(true);
        });
    });
});
