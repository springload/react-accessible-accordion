import { getClosestElement } from './getClosestElement';

describe('getClosestElement', () => {
    it('gets the closest ancestor matching the given selector', () => {
        const ANCESTOR_ID = 'foo';

        const ancestor = document.createElement('div');
        ancestor.setAttribute('id', ANCESTOR_ID);

        const descendant = document.createElement('div');

        ancestor.appendChild(descendant);

        expect(getClosestElement(descendant, `#${ANCESTOR_ID}`)).toEqual(
            ancestor,
        );
    });
});
