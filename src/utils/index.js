// eslint-disable-next-line
export const isArraysEqual = (array, other) => {
    if (array === other) {
        return true;
    }
    if (!Array.isArray(array) || !Array.isArray(other) || array.length !== other.length) {
        return false;
    }

    let result = true;
    const arrLength = array.length;
    for (let index = 0; index < arrLength; index += 1) {
        if (array[index] !== other[index]) {
            result = false;
            break;
        }
    }
    return result;
};
