import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import { default as Accordion } from './Accordion';

const TEST_ID = 'TEST_ID';

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
            const { getByTestId } = render(<Accordion data-testid={TEST_ID} />);
            expect(getByTestId(TEST_ID).className).toBe('accordion');
        });

        it('can be overridden', () => {
            const { getByTestId } = render(
                <Accordion className="foo" data-testid={TEST_ID} />,
            );
            expect(getByTestId(TEST_ID).className).toBe('foo');
        });
    });

    describe('children', () => {
        it('respects the children prop', () => {
            const { queryAllByTestId } = render(
                <Accordion>
                    <div data-testid={TEST_ID} />
                    <div data-testid={TEST_ID} />
                </Accordion>,
            );
            expect(queryAllByTestId(TEST_ID).length).toBe(2);
        });
    });
});
