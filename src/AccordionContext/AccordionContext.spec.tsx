import { mount } from 'enzyme';
import * as React from 'react';
import * as ReactTestRenderer from 'react-test-renderer';
import AccordionStore, { Item } from '../AccordionStore/AccordionStore';
import { Consumer, Provider, ProviderProps } from './AccordionContext';

describe('Accordion', () => {
    describe('Provider', () => {
        function createProvider(props: ProviderProps = {}): Provider {
            const provider = ReactTestRenderer.create(
                <Provider {...props} />,
            ).getInstance();

            // This is all just type-casting:

            if (provider instanceof Provider) {
                return provider;
            }
            throw new Error();
        }

        describe('initialization', () => {
            it('instantiates AccordionStore as state', () => {
                const provider = createProvider();

                expect(provider.state).toBeInstanceOf(AccordionStore);
            });

            it('respects the allowZeroExpanded prop', () => {
                const provider = createProvider({ allowZeroExpanded: true });

                expect(provider.state.allowZeroExpanded).toEqual(true);
            });

            it('respects the allowMultipleExpanded prop', () => {
                const provider = createProvider({
                    allowMultipleExpanded: true,
                });

                expect(provider.state.allowMultipleExpanded).toEqual(true);
            });

            it('respects the initialItems prop', () => {
                const initialItems = [{ uuid: 'foo', expanded: false }];
                const provider = createProvider({ initialItems });

                expect(provider.state.items).toBe(initialItems);
            });

            it('respects the children prop', () => {
                const HELLO_WORLD = 'Hello World';
                expect(
                    mount(<Provider>{HELLO_WORLD}</Provider>).text(),
                ).toEqual(HELLO_WORLD);
            });
        });

        describe('addItem', () => {
            it('proxies state.addItem', () => {
                const provider = createProvider();
                const stateAddItem = jest.spyOn(provider.state, 'addItem');

                const item = { uuid: 'foo', expanded: false };

                provider.addItem(item);

                expect(stateAddItem).toHaveBeenCalledWith(item);
            });

            it('immutably updates state', () => {
                const provider = createProvider();
                const { state } = provider;

                const item = { uuid: 'foo', expanded: false };

                provider.addItem(item);

                expect(provider.state).not.toBe(state);
            });
        });

        describe('removeItem', () => {
            it('proxies state.removeItem', () => {
                const provider = createProvider();
                const stateRemoveItem = jest.spyOn(
                    provider.state,
                    'removeItem',
                );

                provider.removeItem('foo');

                expect(stateRemoveItem).toHaveBeenCalledWith('foo');
            });

            it('immutably updates state', () => {
                const provider = createProvider();
                const { state } = provider;

                provider.removeItem('foo');

                expect(provider.state).not.toBe(state);
            });
        });

        describe('setExpanded', () => {
            it('proxies state.setExpanded', () => {
                const item = { uuid: 'foo', expanded: false };
                const provider = createProvider({ initialItems: [item] });

                const stateSetExpanded = jest.spyOn(
                    provider.state,
                    'setExpanded',
                );

                provider.setExpanded(item.uuid, !item.expanded);

                expect(stateSetExpanded).toHaveBeenCalledWith(
                    item.uuid,
                    !item.expanded,
                );
            });

            it('immutably updates state', () => {
                const item = { uuid: 'foo', expanded: false };
                const provider = createProvider({ initialItems: [item] });
                const { state } = provider;

                provider.setExpanded(item.uuid, !item.expanded);

                expect(provider.state).not.toBe(state);
            });

            it("invokes 'onChange' with array of expanded uuids", () => {
                const onChange = jest.fn();
                const item = {
                    uuid: 'foo',
                    expanded: false,
                };

                const provider = createProvider({
                    onChange,
                    initialItems: [item],
                });

                provider.setExpanded(item.uuid, true);

                expect(onChange).toHaveBeenCalledWith([item.uuid]);
            });
        });

        describe('isItemDisabled', () => {
            it('proxies state.isItemDisabled', () => {
                const item = { uuid: 'foo', expanded: false };
                const provider = createProvider({ initialItems: [item] });

                const stateIsItemDisabled = jest.spyOn(
                    provider.state,
                    'isItemDisabled',
                );

                provider.isItemDisabled(item.uuid);

                expect(stateIsItemDisabled).toHaveBeenCalledWith('foo');
            });
        });

        describe('consumer', () => {
            it('invokes the children prop if when context is Provided', () => {
                const children = jest.fn(() => null);

                ReactTestRenderer.create(
                    <Provider>
                        <Consumer>{children}</Consumer>
                    </Provider>,
                );

                expect(children).toHaveBeenCalledWith(
                    expect.objectContaining({
                        items: expect.any(Array),
                        allowMultipleExpanded: expect.any(Boolean),
                        allowZeroExpanded: expect.any(Boolean),
                        addItem: expect.any(Function),
                        removeItem: expect.any(Function),
                        setExpanded: expect.any(Function),
                        isItemDisabled: expect.any(Function),
                    }),
                );
            });

            it('does not invoke the children prop if context is not Provided', () => {
                const children = jest.fn(() => null);

                ReactTestRenderer.create(<Consumer>{children}</Consumer>);

                expect(children).not.toHaveBeenCalled();
            });
        });
    });
});
