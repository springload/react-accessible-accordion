import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import AccordionItemPanel from './AccordionItemPanel';

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
                    <AccordionItem uuid={UUIDS.FOO}>
                        <AccordionItemPanel data-testid={UUIDS.FOO} />
                    </AccordionItem>
                    <AccordionItem uuid={UUIDS.BAR}>
                        <AccordionItemPanel data-testid={UUIDS.BAR} />
                    </AccordionItem>
                </Accordion>,
            );

            expect(Array.from(getByTestId(UUIDS.FOO).classList)).toEqual([
                'accordion__panel',
                'accordion__panel--expanded',
            ]);
            expect(Array.from(getByTestId(UUIDS.BAR).classList)).toEqual([
                'accordion__panel',
            ]);
        });

        it('can be overridden', () => {
            const { getByTestId } = render(
                <Accordion preExpanded={[UUIDS.FOO]}>
                    <AccordionItem uuid={UUIDS.FOO}>
                        <AccordionItemPanel
                            data-testid={UUIDS.FOO}
                            className="foo"
                            expandedClassName="foo--expanded"
                        />
                    </AccordionItem>
                    <AccordionItem uuid={UUIDS.BAR}>
                        <AccordionItemPanel
                            data-testid={UUIDS.BAR}
                            className="foo"
                            expandedClassName="foo--expanded"
                        />
                    </AccordionItem>
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
                    <AccordionItem>
                        <AccordionItemPanel>Hello World</AccordionItemPanel>
                    </AccordionItem>
                </Accordion>,
            );
            expect(getByText('Hello World')).toBeTruthy();
        });
    });
});