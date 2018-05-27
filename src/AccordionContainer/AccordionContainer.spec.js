// @flow

import AccordionContainer from './AccordionContainer';
// import { mount } from 'enzyme';

describe('Accordion', () => {
    let container;

    beforeEach(() => {
        container = new AccordionContainer();
    });

    it('correctly instantiates with all expected methods', () => {
        expect(container).toBeDefined();
        expect(container.setAccordion).toBeDefined();
        expect(container.setOnChange).toBeDefined();
        expect(container.addItem).toBeDefined();
        expect(container.removeItem).toBeDefined();
        expect(container.setExpanded).toBeDefined();
    });

    it('can be initialized with values in the constructor', () => {
        expect(
            new AccordionContainer({ accordion: true }).state.accordion,
        ).toBe(true);
        expect(
            new AccordionContainer({ accordion: false }).state.accordion,
        ).toBe(false);
        const mock = jest.fn();
        expect(new AccordionContainer({ onChange: mock }).state.onChange).toBe(
            mock,
        );
    });

    it('can set "accordion" state', async () => {
        expect(container.state.accordion).toBe(true);
        await container.setAccordion(false);
        expect(container.state.accordion).toBe(false);
    });

    it('can set "onChange" state', async () => {
        const newFn = jest.fn();
        await container.setOnChange(newFn);
        container.state.onChange();
        expect(newFn).toHaveBeenCalled();
    });

    it('can add an item', async () => {
        const item = {
            uuid: 'foo',
            expanded: true,
            disabled: true,
        };
        expect(container.state.items).toHaveLength(0);
        await container.addItem(item);
        expect(container.state.items).toHaveLength(1);
        expect(container.state.items[0]).toEqual(item);
    });

    it('can remove an item', async () => {
        const fooItem = {
            uuid: 'foo',
            expanded: true,
            disabled: true,
        };
        const barItem = {
            uuid: 'bar',
            expanded: true,
            disabled: true,
        };
        expect(container.state.items).toHaveLength(0);
        await container.addItem(fooItem);
        await container.addItem(barItem);
        expect(container.state.items).toHaveLength(2);
        await container.removeItem(fooItem.uuid);
        expect(container.state.items).toHaveLength(1);
        expect(container.state.items[0]).toEqual(barItem);
    });

    it('adding an expanded item to a strict-accordion closes other items', async () => {
        const fooItem = {
            uuid: 'foo',
            expanded: true,
            disabled: true,
        };
        const barItem = {
            uuid: 'bar',
            expanded: true,
            disabled: true,
        };
        await container.setAccordion(true);
        await container.addItem(fooItem);
        expect(container.state.items).toHaveLength(1);
        expect(container.state.items[0].expanded).toBe(true);
        await container.addItem(barItem);
        expect(container.state.items).toHaveLength(2);
        expect(container.state.items[0].expanded).toBe(false);
        expect(container.state.items[1].expanded).toBe(true);
    });

    it("adding an expanded item to a non-strict-accordion doesn't close other items", async () => {
        const fooItem = {
            uuid: 'foo',
            expanded: true,
            disabled: true,
        };
        const barItem = {
            uuid: 'bar',
            expanded: true,
            disabled: true,
        };
        await container.setAccordion(false);
        await container.addItem(fooItem);
        expect(container.state.items).toHaveLength(1);
        expect(container.state.items[0].expanded).toBe(true);
        await container.addItem(barItem);
        expect(container.state.items).toHaveLength(2);
        expect(container.state.items[0].expanded).toBe(true);
        expect(container.state.items[1].expanded).toBe(true);
    });

    it('can set the expanded property of an item', async () => {
        const item = {
            uuid: 'foo',
            expanded: true,
            disabled: true,
        };
        await container.addItem(item);
        expect(container.state.items).toHaveLength(1);
        await container.setExpanded(item.uuid, false);
        expect(container.state.items[0].expanded).toBe(false);
    });

    it('setting the expanded property to true in a strict accordion closes all other items', async () => {
        const fooItem = {
            uuid: 'foo',
            expanded: true,
            disabled: true,
        };
        const barItem = {
            uuid: 'bar',
            expanded: false,
            disabled: true,
        };
        await container.setAccordion(true);
        await container.addItem(fooItem);
        await container.addItem(barItem);
        expect(container.state.items).toHaveLength(2);
        await container.setExpanded(barItem.uuid, true);
        expect(container.state.items[0].expanded).toBe(false);
        expect(container.state.items[1].expanded).toBe(true);
    });

    it('setting the expanded property to true in a non-strict accordion does not close all other items', async () => {
        const fooItem = {
            uuid: 'foo',
            expanded: true,
            disabled: true,
        };
        const barItem = {
            uuid: 'bar',
            expanded: false,
            disabled: true,
        };
        await container.setAccordion(false);
        await container.addItem(fooItem);
        await container.addItem(barItem);
        expect(container.state.items).toHaveLength(2);
        await container.setExpanded(barItem.uuid, true);
        expect(container.state.items[0].expanded).toBe(true);
        expect(container.state.items[1].expanded).toBe(true);
    });

    it('can add multiple items at the same time', async () => {
        await Promise.all([
            container.addItem({
                uuid: 'foo',
            }),
            container.addItem({
                uuid: 'bar',
            }),
        ]);

        expect(container.state.items.length).toBe(2);
    });
});
