// @flow

import React from 'react';
import { mount } from 'enzyme';
import { Provider, Consumer } from './AccordionContainer';

const DEFAULT_ITEM = {
    uuid: 'foo',
    expanded: false,
    disabled: false,
    focus: false,
};

describe('Accordion', () => {
    let mock;
    beforeEach(() => {
        mock = jest.fn(() => null);
    });

    it('correctly instantiates with all expected methods', () => {
        const container = mount(<Provider />).instance();
        expect(container).toBeDefined();
        expect(container.addItem).toBeDefined();
        expect(container.removeItem).toBeDefined();
        expect(container.setExpanded).toBeDefined();
    });

    it('works without any props', () => {
        mount(
            <Provider>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        expect(mock).toHaveBeenCalledWith({
            accordion: false,
            items: [],
            addItem: expect.anything(),
            removeItem: expect.anything(),
            setExpanded: expect.anything(),
            removeFocus: expect.anything(),
            setFocusToHead: expect.anything(),
            setFocusToTail: expect.anything(),
            setFocusToPrevious: expect.anything(),
            setFocusToNext: expect.anything(),
        });
    });

    it('respects the `accordion` prop', () => {
        mount(
            <Provider accordion>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                accordion: true,
            }),
        );
    });

    it('respects the `items` prop', () => {
        const items = [DEFAULT_ITEM];
        mount(
            <Provider items={items}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items,
            }),
        );
    });

    it('can add an item', () => {
        const wrapper = mount(
            <Provider>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({ items: [] }),
        );

        wrapper
            .find(Provider)
            .instance()
            .addItem(DEFAULT_ITEM);

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({ items: [DEFAULT_ITEM] }),
        );
    });

    it('can remove an item', () => {
        const itemFoo = { ...DEFAULT_ITEM, uuid: 'foo' };
        const itemBar = { ...DEFAULT_ITEM, uuid: 'bar' };
        const items = [itemFoo, itemBar];

        const wrapper = mount(
            <Provider items={items}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items,
            }),
        );

        wrapper
            .find(Provider)
            .instance()
            .removeItem(itemFoo.uuid);

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [itemBar],
            }),
        );
    });

    it('adding an expanded item to a strict-accordion closes other items', () => {
        const wrapper = mount(
            <Provider
                accordion
                items={[{ ...DEFAULT_ITEM, uuid: 'foo', expanded: true }]}
            >
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        wrapper
            .find(Provider)
            .instance()
            .addItem({
                ...DEFAULT_ITEM,
                uuid: 'bar',
                expanded: true,
            });

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ uuid: 'foo', expanded: false }),
                    expect.objectContaining({ uuid: 'bar', expanded: true }),
                ],
            }),
        );
    });

    it("adding an expanded item to a non-strict-accordion doesn't close other items", () => {
        const wrapper = mount(
            <Provider
                items={[{ ...DEFAULT_ITEM, uuid: 'foo', expanded: true }]}
            >
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        wrapper
            .find(Provider)
            .instance()
            .addItem({
                ...DEFAULT_ITEM,
                uuid: 'bar',
                expanded: true,
            });

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ uuid: 'foo', expanded: true }),
                    expect.objectContaining({ uuid: 'bar', expanded: true }),
                ],
            }),
        );
    });

    it('can expand an item', () => {
        const item = {
            ...DEFAULT_ITEM,
            expanded: false,
        };

        const wrapper = mount(
            <Provider items={[item]}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        wrapper
            .find(Provider)
            .instance()
            .setExpanded(item.uuid, !item.expanded);

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    {
                        ...item,
                        expanded: !item.expanded,
                    },
                ],
            }),
        );
    });

    it('setting the expanded property to true in a strict accordion closes all other items', () => {
        const fooItem = {
            ...DEFAULT_ITEM,
            uuid: 'foo',
            expanded: true,
        };
        const barItem = {
            ...DEFAULT_ITEM,
            uuid: 'bar',
            expanded: false,
        };

        const wrapper = mount(
            <Provider accordion items={[fooItem, barItem]}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        wrapper
            .find(Provider)
            .instance()
            .setExpanded(barItem.uuid, true);

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ expanded: false }),
                    expect.objectContaining({ expanded: true }),
                ],
            }),
        );
    });

    it('setting the expanded property to true in a non-strict accordion does not close all other items', () => {
        const fooItem = {
            ...DEFAULT_ITEM,
            uuid: 'foo',
            expanded: true,
        };
        const barItem = {
            ...DEFAULT_ITEM,
            uuid: 'bar',
            expanded: false,
        };

        const wrapper = mount(
            <Provider items={[fooItem, barItem]}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        wrapper
            .find(Provider)
            .instance()
            .setExpanded(barItem.uuid, true);

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ expanded: true }),
                    expect.objectContaining({ expanded: true }),
                ],
            }),
        );
    });

    /*
     * These tests were mostly added to assert that the callback-style setState
     * was being used and race-conditions weren't causing multiple setState
     * calls to cancel one-another out.
     */
    describe('Race conditions', () => {
        it('can add multiple items at the same time', () => {
            const fooItem = {
                ...DEFAULT_ITEM,
                uuid: 'foo',
                expanded: true,
            };
            const barItem = {
                ...DEFAULT_ITEM,
                uuid: 'bar',
                expanded: false,
            };

            const wrapper = mount(
                <Provider>
                    <Consumer>{mock}</Consumer>
                </Provider>,
            );

            const instance = wrapper.find(Provider).instance();

            instance.addItem(fooItem);
            instance.addItem(barItem);

            expect(mock).toHaveBeenCalledWith(
                expect.objectContaining({
                    items: [fooItem, barItem],
                }),
            );
        });

        it('can remove multiple items at the same time', () => {
            const fooItem = {
                ...DEFAULT_ITEM,
                uuid: 'foo',
                expanded: true,
            };
            const barItem = {
                ...DEFAULT_ITEM,
                uuid: 'bar',
                expanded: false,
            };

            const wrapper = mount(
                <Provider items={[fooItem, barItem]}>
                    <Consumer>{mock}</Consumer>
                </Provider>,
            );

            const instance = wrapper.find(Provider).instance();

            instance.removeItem(fooItem.uuid);
            instance.removeItem(barItem.uuid);

            expect(mock).toHaveBeenCalledWith(
                expect.objectContaining({
                    items: [],
                }),
            );
        });

        it('can update expanded state of multiple items at the same time', () => {
            const fooItem = {
                ...DEFAULT_ITEM,
                uuid: 'foo',
                expanded: false,
            };
            const barItem = {
                ...DEFAULT_ITEM,
                uuid: 'bar',
                expanded: false,
            };

            const wrapper = mount(
                <Provider items={[fooItem, barItem]}>
                    <Consumer>{mock}</Consumer>
                </Provider>,
            );

            const instance = wrapper.find(Provider).instance();

            instance.setExpanded(fooItem.uuid, true);
            instance.setExpanded(barItem.uuid, true);

            expect(mock).toHaveBeenCalledWith(
                expect.objectContaining({
                    items: [
                        expect.objectContaining({ expanded: true }),
                        expect.objectContaining({ expanded: true }),
                    ],
                }),
            );
        });
    });

    it('raises console error in case of duplicate uuid', () => {
        const uuid = 'uniqueCustomID';
        jest.spyOn(global.console, 'error');

        const instance = mount(<Provider />).instance();

        instance.addItem({
            ...DEFAULT_ITEM,
            uuid,
            expanded: false,
        });
        instance.addItem({
            ...DEFAULT_ITEM,
            uuid,
            expanded: false,
        });

        // eslint-disable-next-line no-console
        expect(console.error).toBeCalled();
    });

    it('triggers "onChange" with uuid when a true accordion', () => {
        const onChange = jest.fn();
        const item = {
            ...DEFAULT_ITEM,
            expanded: false,
        };

        const instance = mount(
            <Provider accordion items={[item]} onChange={onChange} />,
        ).instance();
        instance.setExpanded(item.uuid, true);

        expect(onChange).toHaveBeenCalledWith(item.uuid);
    });

    it('triggers "onChange" with array of expanded uuids when not a true accordion', () => {
        const onChange = jest.fn();
        const item = {
            ...DEFAULT_ITEM,
            expanded: false,
        };

        const instance = mount(
            <Provider items={[item]} onChange={onChange} />,
        ).instance();
        instance.setExpanded(item.uuid, true);

        expect(onChange).toHaveBeenCalledWith([item.uuid]);
    });

    it('removes focus on item that matches uuid input', () => {
        const item = {
            ...DEFAULT_ITEM,
            focus: true,
        };

        const wrapper = mount(
            <Provider items={[item]}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        const instance = wrapper.find(Provider).instance();

        instance.removeFocus(item.uuid);

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [expect.objectContaining({ focus: false })],
            }),
        );
    });

    it('does not remove focus on item if no match is found', () => {
        const item = {
            ...DEFAULT_ITEM,
            focus: true,
        };

        const wrapper = mount(
            <Provider items={[item]}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        const instance = wrapper.find(Provider).instance();

        instance.removeFocus('bar');

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [expect.objectContaining({ focus: true })],
            }),
        );
    });

    it('sets focus to first item', () => {
        const itemFoo = { ...DEFAULT_ITEM, focus: false, uuid: 'foo' };
        const itemBar = { ...DEFAULT_ITEM, focus: true, uuid: 'bar' };
        const items = [itemFoo, itemBar];

        const wrapper = mount(
            <Provider items={items}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        const instance = wrapper.find(Provider).instance();

        instance.setFocusToHead();

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ uuid: 'foo', focus: true }),
                    expect.objectContaining({ uuid: 'bar', focus: false }),
                ],
            }),
        );
    });

    it('sets focus to last item', () => {
        const itemFoo = { ...DEFAULT_ITEM, focus: true, uuid: 'foo' };
        const itemBar = { ...DEFAULT_ITEM, focus: false, uuid: 'bar' };
        const items = [itemFoo, itemBar];

        const wrapper = mount(
            <Provider items={items}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        const instance = wrapper.find(Provider).instance();

        instance.setFocusToTail();

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ uuid: 'foo', focus: false }),
                    expect.objectContaining({ uuid: 'bar', focus: true }),
                ],
            }),
        );
    });

    it('sets focus to previous item', () => {
        const itemFoo = { ...DEFAULT_ITEM, focus: false, uuid: 'foo' };
        const itemBar = { ...DEFAULT_ITEM, focus: false, uuid: 'bar' };
        const itemFoobar = { ...DEFAULT_ITEM, focus: true, uuid: 'foobar' };
        const items = [itemFoo, itemBar, itemFoobar];

        const wrapper = mount(
            <Provider items={items}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        const instance = wrapper.find(Provider).instance();

        instance.setFocusToPrevious('foobar');

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ uuid: 'foo', focus: false }),
                    expect.objectContaining({ uuid: 'bar', focus: true }),
                    expect.objectContaining({ uuid: 'foobar', focus: false }),
                ],
            }),
        );
    });

    it('never sets focus to previous item past the first', () => {
        const itemFoo = { ...DEFAULT_ITEM, focus: true, uuid: 'foo' };
        const itemBar = { ...DEFAULT_ITEM, focus: false, uuid: 'bar' };
        const itemFoobar = { ...DEFAULT_ITEM, focus: false, uuid: 'foobar' };
        const items = [itemFoo, itemBar, itemFoobar];

        const wrapper = mount(
            <Provider items={items}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        const instance = wrapper.find(Provider).instance();

        instance.setFocusToPrevious('foo');

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ uuid: 'foo', focus: true }),
                    expect.objectContaining({ uuid: 'bar', focus: false }),
                    expect.objectContaining({ uuid: 'foobar', focus: false }),
                ],
            }),
        );
    });

    it('never sets focus to previous item if item is not found', () => {
        const itemFoo = { ...DEFAULT_ITEM, focus: false, uuid: 'foo' };
        const itemBar = { ...DEFAULT_ITEM, focus: true, uuid: 'bar' };
        const itemFoobar = { ...DEFAULT_ITEM, focus: false, uuid: 'foobar' };
        const items = [itemFoo, itemBar, itemFoobar];

        const wrapper = mount(
            <Provider items={items}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        const instance = wrapper.find(Provider).instance();

        instance.setFocusToPrevious('barfoo');

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ uuid: 'foo', focus: false }),
                    expect.objectContaining({ uuid: 'bar', focus: true }),
                    expect.objectContaining({ uuid: 'foobar', focus: false }),
                ],
            }),
        );
    });

    it('sets focus to next item', () => {
        const itemFoo = { ...DEFAULT_ITEM, focus: true, uuid: 'foo' };
        const itemBar = { ...DEFAULT_ITEM, focus: false, uuid: 'bar' };
        const itemFoobar = { ...DEFAULT_ITEM, focus: false, uuid: 'foobar' };
        const items = [itemFoo, itemBar, itemFoobar];

        const wrapper = mount(
            <Provider items={items}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        const instance = wrapper.find(Provider).instance();

        instance.setFocusToNext('foo');

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ uuid: 'foo', focus: false }),
                    expect.objectContaining({ uuid: 'bar', focus: true }),
                    expect.objectContaining({ uuid: 'foobar', focus: false }),
                ],
            }),
        );
    });

    it('never sets focus to next item past the last', () => {
        const itemFoo = { ...DEFAULT_ITEM, focus: false, uuid: 'foo' };
        const itemBar = { ...DEFAULT_ITEM, focus: false, uuid: 'bar' };
        const itemFoobar = { ...DEFAULT_ITEM, focus: true, uuid: 'foobar' };
        const items = [itemFoo, itemBar, itemFoobar];

        const wrapper = mount(
            <Provider items={items}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        const instance = wrapper.find(Provider).instance();

        instance.setFocusToNext('foobar');

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ uuid: 'foo', focus: false }),
                    expect.objectContaining({ uuid: 'bar', focus: false }),
                    expect.objectContaining({ uuid: 'foobar', focus: true }),
                ],
            }),
        );
    });

    it('never sets focus to next item if item is not found', () => {
        const itemFoo = { ...DEFAULT_ITEM, focus: false, uuid: 'foo' };
        const itemBar = { ...DEFAULT_ITEM, focus: true, uuid: 'bar' };
        const itemFoobar = { ...DEFAULT_ITEM, focus: false, uuid: 'foobar' };
        const items = [itemFoo, itemBar, itemFoobar];

        const wrapper = mount(
            <Provider items={items}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        );

        const instance = wrapper.find(Provider).instance();

        instance.setFocusToNext('barfoo');

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: [
                    expect.objectContaining({ uuid: 'foo', focus: false }),
                    expect.objectContaining({ uuid: 'bar', focus: true }),
                    expect.objectContaining({ uuid: 'foobar', focus: false }),
                ],
            }),
        );
    });
});
