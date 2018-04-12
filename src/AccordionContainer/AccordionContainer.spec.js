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

    it('can set "accordion" state', () => {
        expect(container.state.accordion).toBe(true);
        container.setAccordion(false);
        expect(container.state.accordion).toBe(false);
    });

    it('can set "onChange" state', () => {
        const newFn = jest.fn();
        container.setOnChange(newFn);
        container.state.onChange();
        expect(newFn).toHaveBeenCalled();
    });

    it('can add an item', () => {
        const item = {
            uuid: 'foo',
            expanded: true,
            disabled: true,
        };
        expect(container.state.items).toHaveLength(0);
        container.addItem(item);
        expect(container.state.items).toHaveLength(1);
        expect(container.state.items[0]).toEqual(item);
    });

    it('can remove an item', () => {
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
        container.addItem(fooItem);
        container.addItem(barItem);
        expect(container.state.items).toHaveLength(2);
        container.removeItem(fooItem.uuid);
        expect(container.state.items).toHaveLength(1);
        expect(container.state.items[0]).toEqual(barItem);
    });

    it('adding an expanded item to a strict-accordion closes other items', () => {
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
        container.setAccordion(true);
        container.addItem(fooItem);
        expect(container.state.items).toHaveLength(1);
        expect(container.state.items[0].expanded).toBe(true);
        container.addItem(barItem);
        expect(container.state.items).toHaveLength(2);
        expect(container.state.items[0].expanded).toBe(false);
        expect(container.state.items[1].expanded).toBe(true);
    });

    it("adding an expanded item to a non-strict-accordion doesn't close other items", () => {
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
        container.setAccordion(false);
        container.addItem(fooItem);
        expect(container.state.items).toHaveLength(1);
        expect(container.state.items[0].expanded).toBe(true);
        container.addItem(barItem);
        expect(container.state.items).toHaveLength(2);
        expect(container.state.items[0].expanded).toBe(true);
        expect(container.state.items[1].expanded).toBe(true);
    });

    it('can set the expanded property of an item', () => {
        const item = {
            uuid: 'foo',
            expanded: true,
            disabled: true,
        };
        container.addItem(item);
        expect(container.state.items).toHaveLength(1);
        container.setExpanded(item.uuid, false);
        expect(container.state.items[0].expanded).toBe(false);
    });

    it('setting the expanded property to true in a strict accordion closes all other items', () => {
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
        container.setAccordion(true);
        container.addItem(fooItem);
        container.addItem(barItem);
        expect(container.state.items).toHaveLength(2);
        container.setExpanded(barItem.uuid, true);
        expect(container.state.items[0].expanded).toBe(false);
        expect(container.state.items[1].expanded).toBe(true);
    });

    it('setting the expanded property to true in a non-strict accordion does not close all other items', () => {
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
        container.setAccordion(false);
        container.addItem(fooItem);
        container.addItem(barItem);
        expect(container.state.items).toHaveLength(2);
        container.setExpanded(barItem.uuid, true);
        expect(container.state.items[0].expanded).toBe(true);
        expect(container.state.items[1].expanded).toBe(true);
    });
});
