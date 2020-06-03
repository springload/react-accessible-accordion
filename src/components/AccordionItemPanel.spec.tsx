import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import AccordionItemPanel from './AccordionItemPanel';

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
                        <AccordionItemPanel data-testid={UUIDS.FOO} />
                    </AccordionItem>
                </Accordion>,
            );

            expect(Array.from(getByTestId(UUIDS.FOO).classList)).toEqual([
                'accordion__panel',
            ]);
        });

        it('can be overridden', () => {
            const { getByTestId } = render(
                <Accordion>
                    <AccordionItem uuid={UUIDS.FOO}>
                        <AccordionItemPanel
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

    it('throws on invalid id', () => {
        expect(() => {
            render(
                <Accordion>
                    <AccordionItem uuid={UUIDS.BAD_ID}>
                        <AccordionItemPanel id={UUIDS.BAD_ID} />
                    </AccordionItem>
                </Accordion>,
            );
        }).toThrow();
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
