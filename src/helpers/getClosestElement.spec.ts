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

    it('gets the closest ancestor several levels up', () => {
        const ANCESTOR_ID = 'foo';
        const DESCENDANT_ID = 'bar';

        const ancestor = document.createElement('div');
        ancestor.setAttribute('id', ANCESTOR_ID);

        const middleMan = document.createElement('div');

        const descendant = document.createElement('div');
        descendant.setAttribute('id', DESCENDANT_ID);

        middleMan.appendChild(descendant);
        ancestor.appendChild(middleMan);

        expect(getClosestElement(descendant, `#${ANCESTOR_ID}`)).toEqual(
            ancestor,
        );
    });

    it('no ancestor that matches selector', () => {
        const ANCESTOR_ID = 'foo';
        const DESCENDANT_ID = 'bar';

        const ancestor = document.createElement('div');

        const descendant = document.createElement('div');
        descendant.setAttribute('id', DESCENDANT_ID);

        ancestor.appendChild(descendant);

        expect(getClosestElement(descendant, `#${ANCESTOR_ID}`)).toBeNull();
    });
});
