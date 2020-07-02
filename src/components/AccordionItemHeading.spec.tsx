import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import AccordionItemButton from './AccordionItemButton';
import AccordionItemHeading, { SPEC_ERROR } from './AccordionItemHeading';

enum UUIDS {
    FOO = 'FOO',
    BAR = 'BAR',
    BAD_ID = 'BAD ID',
}

describe('AccordionItem', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders without erroring', () => {
        expect(() => {
            render(<Accordion />);
        }).not.toThrow();
    });

    describe('className prop', () => {
        it('is “BEM” by default', () => {
            const { getByTestId } = render(
                <Accordion>
                    <AccordionItem uuid={UUIDS.FOO}>
                        <AccordionItemHeading data-testid={UUIDS.FOO}>
                            <AccordionItemButton />
                        </AccordionItemHeading>
                    </AccordionItem>
                </Accordion>,
            );

            expect(Array.from(getByTestId(UUIDS.FOO).classList)).toEqual([
                'accordion__heading',
            ]);
        });

        it('can be overridden', () => {
            const { getByTestId } = render(
                <Accordion>
                    <AccordionItem uuid={UUIDS.FOO}>
                        <AccordionItemHeading
                            data-testid={UUIDS.FOO}
                            className="foo"
                        >
                            <AccordionItemButton />
                        </AccordionItemHeading>
                    </AccordionItem>
                </Accordion>,
            );

            expect(Array.from(getByTestId(UUIDS.FOO).classList)).toEqual([
                'foo',
            ]);
        });
    });

    describe('children prop', () => {
        it('is respected', () => {
            const { getByText } = render(
                <Accordion>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Hello World
                            </AccordionItemButton>
                        </AccordionItemHeading>
                    </AccordionItem>
                </Accordion>,
            );
            expect(getByText('Hello World')).toBeTruthy();
        });
    });

    describe('validation', () => {
        // tslint:disable-next-line no-console
        const originalError = console.error;

        beforeEach(() => {
            // tslint:disable-next-line no-console
            console.error = jest.fn();
        });

        afterAll(() => {
            // tslint:disable-next-line no-console
            console.error = originalError;
        });

        it('permits a single AccordionItemButton as a child - variation #1', () => {
            expect(() =>
                render(
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    Hello World
                                </AccordionItemButton>
                            </AccordionItemHeading>
                        </AccordionItem>
                    </Accordion>,
                ),
            ).not.toThrowError(SPEC_ERROR);
        });

        it('permits a single AccordionItemButton as a child - variation #2', () => {
            expect(() =>
                render(
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemHeading>
                                [
                                <AccordionItemButton key="foo">
                                    Hello World
                                </AccordionItemButton>
                                ]
                            </AccordionItemHeading>
                        </AccordionItem>
                    </Accordion>,
                ),
            ).not.toThrowError(SPEC_ERROR);
        });

        it('throws an error if you don’t nest an AccordionItemButton', () => {
            expect(() =>
                render(
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemHeading />
                        </AccordionItem>
                    </Accordion>,
                ),
            ).toThrowError(SPEC_ERROR);
        });

        it('throws an error if you nest any non-AccordionItemButton element', () => {
            expect(() =>
                render(
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemHeading>Foo</AccordionItemHeading>
                        </AccordionItem>
                    </Accordion>,
                ),
            ).toThrowError(SPEC_ERROR);
        });
    });
});
