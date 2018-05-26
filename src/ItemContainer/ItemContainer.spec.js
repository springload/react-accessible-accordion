// @flow

import ItemContainer, { resetNextUuid } from './ItemContainer';

describe('ItemContainer', () => {
    it('correctly instantiates with all expected methods/state', () => {
        const itemContainer = new ItemContainer();
        expect(itemContainer.state.uuid).toBeDefined();
        expect(itemContainer.setUuid).toBeDefined();
    });

    it('can be initialized with values in the constructor', () => {
        const itemContainer = new ItemContainer({ uuid: 'foo' });
        expect(itemContainer.state.uuid).toBe('foo');
    });

    it('correctly sets the value', async () => {
        const itemContainer = new ItemContainer();
        const uuid = 'uniqueID';
        await itemContainer.setUuid(uuid);
        expect(itemContainer.state.uuid).toBe(uuid);
    });

    it('generated uuids are different', () => {
        const itemContainer1 = new ItemContainer();
        const itemContainer2 = new ItemContainer();
        expect(itemContainer1.state.uuid).not.toBe(itemContainer2.state.uuid);
    });

    it('reset uuids works', () => {
        resetNextUuid();
        const itemContainer1 = new ItemContainer();
        resetNextUuid();
        const itemContainer2 = new ItemContainer();
        expect(itemContainer1.state.uuid).toBe(itemContainer2.state.uuid);
    });
});
