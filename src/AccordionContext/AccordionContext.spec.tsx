import { mount } from 'enzyme';
import * as React from 'react';
import * as ReactTestRenderer from 'react-test-renderer';
import AccordionStore from '../AccordionStore/AccordionStore';
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

            it('respects the preExpanded prop', () => {
                const preExpanded = ['foo'];
                const provider = createProvider({ preExpanded });

                expect(provider.state.expanded).toBe(preExpanded);
            });

            it('respects the children prop', () => {
                const HELLO_WORLD = 'Hello World';
                expect(
                    mount(<Provider>{HELLO_WORLD}</Provider>).text(),
                ).toEqual(HELLO_WORLD);
            });
        });

        // describe('addItem', () => {
        //     it('proxies state.addItem', () => {
        //         const provider = createProvider();
        //         const stateAddItem = jest.spyOn(provider.state, 'addItem');

        //         const item = { uuid: 'foo', expanded: false };

        //         provider.addItem(item);

        //         expect(stateAddItem).toHaveBeenCalledWith(item);
        //     });

        //     it('immutably updates state', () => {
        //         const provider = createProvider();
        //         const { state } = provider;

        //         const item = { uuid: 'foo', expanded: false };

        //         provider.addItem(item);

        //         expect(provider.state).not.toBe(state);
        //     });
        // });

        // describe('removeItem', () => {
        //     it('proxies state.removeItem', () => {
        //         const provider = createProvider();
        //         const stateRemoveItem = jest.spyOn(
        //             provider.state,
        //             'removeItem',
        //         );

        //         provider.removeItem('foo');

        //         expect(stateRemoveItem).toHaveBeenCalledWith('foo');
        //     });

        //     it('immutably updates state', () => {
        //         const provider = createProvider();
        //         const { state } = provider;

        //         provider.removeItem('foo');

        //         expect(provider.state).not.toBe(state);
        //     });
        // });

        describe('setExpanded', () => {
            it('proxies state.setExpanded', () => {
                const uuid = 'foo';
                const provider = createProvider();

                const stateSetExpanded = jest.spyOn(
                    provider.state,
                    'setExpanded',
                );

                provider.setExpanded(uuid, true);

                expect(stateSetExpanded).toHaveBeenCalledWith(uuid, true);
            });

            it('immutably updates state', () => {
                const uuid = 'foo';
                const provider = createProvider();
                const { state } = provider;

                provider.setExpanded(uuid, true);

                expect(provider.state).not.toBe(state);
            });

            it("invokes 'onChange' with array of expanded uuids", () => {
                const onChange = jest.fn();
                const uuid = 'foo';

                const provider = createProvider({
                    onChange,
                });

                provider.setExpanded(uuid, true);

                expect(onChange).toHaveBeenCalledWith([uuid]);
            });
        });

        describe('isItemDisabled', () => {
            it('proxies state.isItemDisabled', () => {
                const uuid = 'foo';
                const provider = createProvider();

                const stateIsItemDisabled = jest.spyOn(
                    provider.state,
                    'isItemDisabled',
                );

                provider.isItemDisabled(uuid);

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
                        expanded: expect.any(Array),
                        allowMultipleExpanded: expect.any(Boolean),
                        allowZeroExpanded: expect.any(Boolean),
                        setExpanded: expect.any(Function),
                        isItemDisabled: expect.any(Function),
                        isItemExpanded: expect.any(Function),
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
