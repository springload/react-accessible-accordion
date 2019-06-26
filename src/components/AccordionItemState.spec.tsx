import { render } from '@testing-library/react';
import * as React from 'react';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import AccordionItemState from './AccordionItemState';

enum UUIDS {
    FOO = 'FOO',
    BAR = 'BAR',
}

describe('ItemContext', () => {
    describe('render prop', () => {
        it('renders', () => {
            const { getByText } = render(
                <Accordion>
                    <AccordionItem>
                        <AccordionItemState>
                            {(): string => 'Hello World'}
                        </AccordionItemState>
                    </AccordionItem>
                </Accordion>,
            );

            expect(getByText('Hello World')).toBeTruthy();
        });

        it('invokes the render prop with the contextual item’s expanded state', () => {
            const { getByTestId } = render(
                <Accordion preExpanded={[UUIDS.FOO]}>
                    <AccordionItem uuid={UUIDS.FOO}>
                        <AccordionItemState>
                            {({
                                expanded,
                            }: {
                                expanded: boolean;
                            }): JSX.Element => (
                                <div data-testid={UUIDS.FOO}>
                                    {expanded && 'expanded'}
                                </div>
                            )}
                        </AccordionItemState>
                    </AccordionItem>
                    <AccordionItem uuid={UUIDS.BAR}>
                        <AccordionItemState>
                            {({
                                expanded,
                            }: {
                                expanded: boolean;
                            }): JSX.Element => (
                                <div data-testid={UUIDS.BAR}>
                                    {expanded && 'expanded'}
                                </div>
                            )}
                        </AccordionItemState>
                    </AccordionItem>
                </Accordion>,
            );

            expect(getByTestId(UUIDS.FOO).textContent).toEqual('expanded');
            expect(getByTestId(UUIDS.BAR).textContent).toEqual('');
        });
    });
});
