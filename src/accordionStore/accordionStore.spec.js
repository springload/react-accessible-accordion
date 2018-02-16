// @flow

import { createAccordionStore } from './accordionStore';

describe('accordionStore', () => {
    describe('createAccordionStore', () => {
        it('initializes a new store', () => {
            const store = createAccordionStore({
                accordion: true,
                onChange: jest.fn(),
            });
            expect(store).toMatchSnapshot();
        });

        it('can add a new item', () => {
            const store = createAccordionStore({
                accordion: true,
                onChange: jest.fn(),
            });

            expect(store.items.length).toEqual(0);
            store.addItem({
                itemkey: 'foo',
                itemUuid: 1,
                expanded: true,
            });
            expect(store.items.length).toEqual(1);
        });

        it('can remove an item after adding some items', () => {
            const store = createAccordionStore({
                accordion: true,
                onChange: jest.fn(),
            });

            expect(store.items.length).toEqual(0);
            store.addItem({
                itemkey: 'foo',
                itemUuid: 1,
                expanded: true,
            });

            expect(store.items.length).toEqual(1);
            store.addItem({
                itemkey: 'bar',
                itemUuid: 2,
                expanded: true,
            });

            expect(store.items.length).toEqual(2);
            store.removeItem('foo');
            expect(store.items.length).toEqual(1);
        });

        it('can modify the expanded property of an item', () => {
            const store = createAccordionStore({
                accordion: true,
                onChange: jest.fn(),
            });

            store.addItem({
                itemkey: 'foo',
                itemUuid: 1,
                expanded: true,
            });

            store.addItem({
                itemkey: 'bar',
                itemUuid: 2,
                expanded: true,
            });

            store.setExpanded('foo', false);
            expect(store.items.filter(item => item.expanded).length).toEqual(1);
        });
    });
});
