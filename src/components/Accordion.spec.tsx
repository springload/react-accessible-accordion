import * as React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { default as Accordion } from './Accordion';
import AccordionItem from './AccordionItem';
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
            it('permits multiple items to be expanded when explicitly true', () => {
                const { getByTestId } = render(
                    <Accordion allowMultipleExpanded={true}>
                        <AccordionItem>
                            <AccordionItemHeading data-testid={UUIDS.FOO} />
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading data-testid={UUIDS.BAR} />
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

            it('prevents multiple items being expanded by default', () => {
                const { getByTestId } = render(
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemHeading data-testid={UUIDS.FOO} />
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading data-testid={UUIDS.BAR} />
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
        });

        describe('allowZeroExpanded prop', () => {
            it('permits the last-expanded item to be collapsed when explicitly true', () => {
                const { getByTestId } = render(
                    <Accordion allowZeroExpanded={true}>
                        <AccordionItem>
                            <AccordionItemHeading data-testid={UUIDS.FOO} />
                        </AccordionItem>
                    </Accordion>,
                );

                fireEvent.click(getByTestId(UUIDS.FOO));
                fireEvent.click(getByTestId(UUIDS.FOO));

                expect(
                    getByTestId(UUIDS.FOO).getAttribute('aria-expanded'),
                ).toEqual('false');
            });

            it('prevents the last-expanded item being collapsed by default', () => {
                const { getByTestId } = render(
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemHeading data-testid={UUIDS.FOO} />
                        </AccordionItem>
                    </Accordion>,
                );

                fireEvent.click(getByTestId(UUIDS.FOO));
                fireEvent.click(getByTestId(UUIDS.FOO));

                expect(
                    getByTestId(UUIDS.FOO).getAttribute('aria-expanded'),
                ).toEqual('true');
            });
        });
    });
});
