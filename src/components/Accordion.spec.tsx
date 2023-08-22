import { cleanup, fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { default as Accordion } from './Accordion';
import AccordionItem from './AccordionItem';
import AccordionItemButton from './AccordionItemButton';
import AccordionItemHeading from './AccordionItemHeading';

enum UUIDS {
    FOO = 'FOO',
    BAR = 'Bar',
}

describe('Accordion', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders without erroring', () => {
        expect(() => {
            render(<Accordion />);
        }).not.toThrow();
    });

    describe('className', () => {
        it('is “accordion” by default', () => {
            const { getByTestId } = render(
                <Accordion data-testid={UUIDS.FOO} />,
            );
            expect(getByTestId(UUIDS.FOO).className).toBe('accordion');
        });

        it('can be overridden', () => {
            const { getByTestId } = render(
                <Accordion className="foo" data-testid={UUIDS.FOO} />,
            );
            expect(getByTestId(UUIDS.FOO).className).toBe('foo');
        });
    });

    describe('expanding and collapsing: ', () => {
        describe('allowMultipleExpanded prop', () => {
            it('prevents multiple items to be expanded when set to false', () => {
                const { getByTestId } = render(
                    <Accordion allowMultipleExpanded={false}>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton data-testid={UUIDS.FOO} />
                            </AccordionItemHeading>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton data-testid={UUIDS.BAR} />
                            </AccordionItemHeading>
                        </AccordionItem>
                    </Accordion>,
                );

                fireEvent.click(getByTestId(UUIDS.FOO));
                fireEvent.click(getByTestId(UUIDS.BAR));

                expect(
                    getByTestId(UUIDS.FOO).getAttribute('aria-expanded'),
                ).toEqual('false');
                expect(
                    getByTestId(UUIDS.BAR).getAttribute('aria-expanded'),
                ).toEqual('true');
            });

            it('allows multiple items being expanded by default', () => {
                const { getByTestId } = render(
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton data-testid={UUIDS.FOO} />
                            </AccordionItemHeading>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton data-testid={UUIDS.BAR} />
                            </AccordionItemHeading>
                        </AccordionItem>
                    </Accordion>,
                );

                fireEvent.click(getByTestId(UUIDS.FOO));
                fireEvent.click(getByTestId(UUIDS.BAR));

                expect(
                    getByTestId(UUIDS.FOO).getAttribute('aria-expanded'),
                ).toEqual('true');
                expect(
                    getByTestId(UUIDS.BAR).getAttribute('aria-expanded'),
                ).toEqual('true');
            });
        });

        describe('allowZeroExpanded prop', () => {
            it('prevents the last-expanded item to be collapsed when explicitly false', () => {
                const { getByTestId } = render(
                    <Accordion allowZeroExpanded={false}>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton data-testid={UUIDS.FOO} />
                            </AccordionItemHeading>
                        </AccordionItem>
                    </Accordion>,
                );

                // open it
                fireEvent.click(getByTestId(UUIDS.FOO));
                // attempt to close it
                fireEvent.click(getByTestId(UUIDS.FOO));

                expect(
                    getByTestId(UUIDS.FOO).getAttribute('aria-expanded'),
                ).toEqual('true');
            });

            it('allows the last-expanded to collapsed by default', () => {
                const { getByTestId } = render(
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton data-testid={UUIDS.FOO} />
                            </AccordionItemHeading>
                        </AccordionItem>
                    </Accordion>,
                );

                fireEvent.click(getByTestId(UUIDS.FOO));
                fireEvent.click(getByTestId(UUIDS.FOO));

                expect(
                    getByTestId(UUIDS.FOO).getAttribute('aria-expanded'),
                ).toEqual('false');
            });
        });

        describe('preExpanded prop', () => {
            it('expands items whose uuid props match those passed', () => {
                const { getByTestId } = render(
                    <Accordion preExpanded={[UUIDS.FOO]}>
                        <AccordionItem uuid={UUIDS.FOO}>
                            <AccordionItemHeading>
                                <AccordionItemButton data-testid={UUIDS.FOO} />
                            </AccordionItemHeading>
                        </AccordionItem>
                    </Accordion>,
                );

                expect(
                    getByTestId(UUIDS.FOO).getAttribute('aria-expanded'),
                ).toEqual('true');
            });

            it('collapses items by default', () => {
                const { getByTestId } = render(
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton data-testid={UUIDS.FOO} />
                            </AccordionItemHeading>
                        </AccordionItem>
                    </Accordion>,
                );

                expect(
                    getByTestId(UUIDS.FOO).getAttribute('aria-expanded'),
                ).toEqual('false');
            });
        });

        describe('onChange prop', () => {
            it('is invoked with an array of expanded items’ uuids, if there are any', () => {
                const onChange = jest.fn();
                const { getByTestId } = render(
                    <Accordion onChange={onChange}>
                        <AccordionItem uuid={UUIDS.FOO}>
                            <AccordionItemHeading>
                                <AccordionItemButton data-testid={UUIDS.FOO} />
                            </AccordionItemHeading>
                        </AccordionItem>
                    </Accordion>,
                );

                fireEvent.click(getByTestId(UUIDS.FOO));

                expect(onChange).toHaveBeenCalledWith([UUIDS.FOO]);
            });

            it('is invoked with an empty array, if no items are expanded', () => {
                const onChange = jest.fn();
                const { getByTestId } = render(
                    <Accordion
                        onChange={onChange}
                        preExpanded={[UUIDS.FOO]}
                        allowZeroExpanded={true}
                    >
                        <AccordionItem uuid={UUIDS.FOO}>
                            <AccordionItemHeading>
                                <AccordionItemButton data-testid={UUIDS.FOO} />
                            </AccordionItemHeading>
                        </AccordionItem>
                    </Accordion>,
                );

                fireEvent.click(getByTestId(UUIDS.FOO));

                expect(onChange).toHaveBeenCalledWith([]);
            });
        });
    });
});
