// @flow

import { isArraysEqualShallow } from './index';

describe('isArrayEqual', () => {
    it('exists', () => {
        expect(isArraysEqualShallow).toBeDefined();
    });

    it('Arrays are equal but not same ref', () => {
        const arrayA = [3, 4, 7];
        const arrayB = [3, 4, 7];
        expect(isArraysEqualShallow(arrayA, arrayB)).toBeTruthy();
    });

    it('Arrays are same ref', () => {
        const arrayA = [3, 4, 7];
        const arrayB = arrayA;
        expect(isArraysEqualShallow(arrayA, arrayB)).toBeTruthy();
    });

    it('Params are not arrays', () => {
        let arrayA = [3, 4, 7];
        let arrayB = 'string';
        expect(isArraysEqualShallow(arrayA, arrayB)).toBeFalsy();

        arrayA = 5;
        arrayB = [1, 4];
        expect(isArraysEqualShallow(arrayA, arrayB)).toBeFalsy();
    });

    it('Params are not same length', () => {
        const arrayA = [3, 4, 7];
        const arrayB = [1];
        expect(isArraysEqualShallow(arrayA, arrayB)).toBeFalsy();
    });

    it('Array are different', () => {
        const arrayA = [3, 4, 7];
        const arrayB = [1, 6, 8];
        expect(isArraysEqualShallow(arrayA, arrayB)).toBeFalsy();
    });

    it('Array are different', () => {
        const arrayA = [3, 4, 7];
        const arrayB = [1, 6, 8];
        expect(isArraysEqualShallow(arrayA, arrayB)).toBeFalsy();
    });
});
