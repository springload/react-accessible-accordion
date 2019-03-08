import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import AccordionItemHeading from './AccordionItemHeading';

enum UUIDS {
    FOO = 'FOO',
    BAR = 'Bar',
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
        it('are “BEM” by default', () => {
            const { getByTestId } = render(
                <Accordion>
                    <AccordionItem uuid={UUIDS.FOO}>
                        <AccordionItemHeading data-testid={UUIDS.FOO} />
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
                        />
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
                        <AccordionItemHeading>Hello World</AccordionItemHeading>
                    </AccordionItem>
                </Accordion>,
            );
            expect(getByText('Hello World')).toBeTruthy();
        });
    });
});
