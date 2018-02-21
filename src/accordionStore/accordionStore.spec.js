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
                uuid: 'foo',
                expanded: true,
                disabled: false,
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
                uuid: 'foo',
                expanded: true,
                disabled: false,
            });

            expect(store.items.length).toEqual(1);
            store.addItem({
                uuid: 'bar',
                expanded: true,
                disabled: false,
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
                uuid: 'foo',
                expanded: true,
                disabled: false,
            });

            store.addItem({
                uuid: 'bar',
                expanded: true,
                disabled: false,
            });

            store.setExpanded('foo', false);
            expect(store.items.filter(item => item.expanded).length).toEqual(1);
        });

        it('will collapse any open item if accordion=true', () => {
            const store = createAccordionStore({
                accordion: true,
                onChange: jest.fn(),
            });

            store.addItem({
                uuid: 'foo',
                expanded: true,
                disabled: false,
            });

            store.addItem({
                uuid: 'bar',
                expanded: false,
                disabled: false,
            });

            store.setExpanded('bar', true);
            expect(store.items.filter(item => item.expanded).length).toEqual(1);
        });

        it("won't collapse any open item if accordion=false", () => {
            const store = createAccordionStore({
                accordion: false,
                onChange: jest.fn(),
            });

            store.addItem({
                uuid: 'foo',
                expanded: true,
                disabled: false,
            });

            store.addItem({
                uuid: 'bar',
                expanded: false,
                disabled: false,
            });

            store.setExpanded('bar', true);
            expect(store.items.filter(item => item.expanded).length).toEqual(2);
        });

        it('closes expanded items when expanded item is added and accordion=true', () => {
            const store = createAccordionStore({
                accordion: true,
                onChange: jest.fn(),
            });

            store.addItem({
                uuid: 'foo',
                expanded: true,
                disabled: false,
            });

            store.addItem({
                uuid: 'bar',
                expanded: true,
                disabled: false,
            });

            expect(store.items.filter(item => item.expanded).length).toEqual(1);
        });
    });
});
