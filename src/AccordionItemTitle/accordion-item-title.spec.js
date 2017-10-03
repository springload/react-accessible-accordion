// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import AccordionItemTitle from './accordion-item-title';

describe('AccordionItemTitle', () => {
    it('renders correctly with min params', () => {
        const tree = renderer.create(
            <AccordionItemTitle>
                <div>Fake Title</div>
            </AccordionItemTitle>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const tree = renderer.create(
            <AccordionItemTitle className="testCSSClass">
                <div>Fake Title</div>
            </AccordionItemTitle>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with different hideBodyClassName', () => {
        const tree = renderer.create(
            <AccordionItemTitle expanded={false} hideBodyClassName="testCSSClass--hidden">
                <div>Fake title</div>
            </AccordionItemTitle>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('doesn\'t respect hideBodyClassName when collapsed', () => {
        const tree = renderer.create(
            <AccordionItemTitle expanded={true} hideBodyClassName="testCSSClass--hidden">
                <div>Fake title</div>
            </AccordionItemTitle>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when pressing enter', () => {
        const mockOnClick = jest.fn();
        const tree = renderer.create(
            <AccordionItemTitle onClick={mockOnClick}>
                <div>Fake Title</div>
            </AccordionItemTitle>,
        );

        tree.getInstance().handleKeyPress({ charCode: 13 });
        expect(mockOnClick).toHaveBeenCalledTimes(1);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when pressing space', () => {
        const mockOnClick = jest.fn();
        const tree = renderer.create(
            <AccordionItemTitle onClick={mockOnClick}>
                <div>Fake Title</div>
            </AccordionItemTitle>,
        );

        tree.getInstance().handleKeyPress({ charCode: 32 });
        expect(mockOnClick).toHaveBeenCalledTimes(1);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when pressing another key', () => {
        const mockOnClick = jest.fn();
        const tree = renderer.create(
            <AccordionItemTitle onClick={mockOnClick}>
                <div>Fake Title</div>
            </AccordionItemTitle>,
        );

        tree.getInstance().handleKeyPress({ charCode: 35 });
        expect(mockOnClick).toHaveBeenCalledTimes(0);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with role of tab', () => {
        const tree = renderer.create(
            <AccordionItemTitle role="tab" className="testCSSClass">
                <div>Fake Title</div>
            </AccordionItemTitle>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
