import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import AccordionItemButton from './AccordionItemButton';
import AccordionItemHeading from './AccordionItemHeading';

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
                        <AccordionItemHeading>
                            <AccordionItemButton data-testid={UUIDS.FOO} />
                        </AccordionItemHeading>
                    </AccordionItem>
                </Accordion>,
            );

            expect(Array.from(getByTestId(UUIDS.FOO).classList)).toEqual([
                'accordion__button',
            ]);
        });

        it('can be overridden', () => {
            const { getByTestId } = render(
                <Accordion>
                    <AccordionItem uuid={UUIDS.FOO}>
                        <AccordionItemHeading>
                            <AccordionItemButton
                                data-testid={UUIDS.FOO}
                                className="foo"
                            />
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
});
