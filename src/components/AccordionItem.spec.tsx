import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import { default as Accordion } from './Accordion';
import AccordionItem from './AccordionItem';

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

    describe('className + expandedClassName', () => {
        it('are “BEM” by default', () => {
            const { getByTestId } = render(
                <Accordion preExpanded={[UUIDS.FOO]}>
                    <AccordionItem uuid={UUIDS.FOO} data-testid={UUIDS.FOO} />
                    <AccordionItem uuid={UUIDS.BAR} data-testid={UUIDS.BAR} />
                </Accordion>,
            );
            expect(Array.from(getByTestId(UUIDS.FOO).classList)).toEqual([
                'accordion__item',
                'accordion__item--expanded',
            ]);
            expect(Array.from(getByTestId(UUIDS.BAR).classList)).toEqual([
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
                        expandedClassName="foo--expanded"
                    />
                    <AccordionItem
                        uuid={UUIDS.BAR}
                        data-testid={UUIDS.BAR}
                        className="foo"
                        expandedClassName="foo--expanded"
                    />
                </Accordion>,
            );

            expect(Array.from(getByTestId(UUIDS.FOO).classList)).toEqual([
                'foo',
                'foo--expanded',
            ]);
            expect(Array.from(getByTestId(UUIDS.BAR).classList)).toEqual([
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
