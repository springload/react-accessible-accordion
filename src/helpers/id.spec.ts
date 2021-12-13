import {
    assertValidHtmlId,
    useGlobalCounterId,
    resetGlobalCounterId,
} from './id';

describe('UUID helper', () => {
    describe('useGlobalCounterId', () => {
        it('generates incremental ids', () => {
            expect(useGlobalCounterId()).toBe('raa-0');
            expect(useGlobalCounterId()).toBe('raa-1');
        });
    });

    describe('resetGlobalCounterId', () => {
        it('resets the id', () => {
            resetGlobalCounterId();
            expect(useGlobalCounterId()).toBe('raa-0');
            resetGlobalCounterId();
            expect(useGlobalCounterId()).toBe('raa-0');
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
