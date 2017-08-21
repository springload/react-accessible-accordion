import { isArraysEqual } from './index';

describe('isArrayEqual', () => {
    it('exists', () => {
        expect(isArraysEqual).toBeDefined();
    });

    it('Arrays are equal but not same ref', () => {
        const arrayA = [3, 4, 7];
        const arrayB = [3, 4, 7];
        expect(isArraysEqual(arrayA, arrayB)).toBeTruthy();
    });

    it('Arrays are same ref', () => {
        const arrayA = [3, 4, 7];
        const arrayB = arrayA;
        expect(isArraysEqual(arrayA, arrayB)).toBeTruthy();
    });

    it('Params are not arrays', () => {
        let arrayA = [3, 4, 7];
        let arrayB = 'string';
        expect(isArraysEqual(arrayA, arrayB)).toBeFalsy();

        arrayA = 5;
        arrayB = [1, 4];
        expect(isArraysEqual(arrayA, arrayB)).toBeFalsy();
    });

    it('Params are not same length', () => {
        const arrayA = [3, 4, 7];
        const arrayB = [1];
        expect(isArraysEqual(arrayA, arrayB)).toBeFalsy();
    });

    it('Array are different', () => {
        const arrayA = [3, 4, 7];
        const arrayB = [1, 6, 8];
        expect(isArraysEqual(arrayA, arrayB)).toBeFalsy();
    });

    it('Array are different', () => {
        const arrayA = [3, 4, 7];
        const arrayB = [1, 6, 8];
        expect(isArraysEqual(arrayA, arrayB)).toBeFalsy();
    });
});
