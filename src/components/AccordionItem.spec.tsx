import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { default as Accordion } from './Accordion';
import AccordionItem from './AccordionItem';

enum UUIDS {
    FOO = 'FOO',
    BAR = 'BAR',
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
                    <AccordionItem uuid={UUIDS.FOO} data-testid={UUIDS.FOO} />
                </Accordion>,
            );
            expect(Array.from(getByTestId(UUIDS.FOO).classList)).toEqual([
                'accordion__item',
            ]);
        });

        it('can be overridden', () => {
            const { getByTestId } = render(
                <Accordion preExpanded={[UUIDS.FOO]}>
                    <AccordionItem
                        uuid={UUIDS.FOO}
                        data-testid={UUIDS.FOO}
                        className="foo"
                    />
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
                    <AccordionItem>Hello World</AccordionItem>
                </Accordion>,
            );
            expect(getByText('Hello World')).toBeTruthy();
        });
    });
});
