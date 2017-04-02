import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
// import ReactTestUtils from 'react-addons-test-utils';

import Accordion from './accordion';
import AccordionItem from '../AccordionItem/accordion-item';

jest.mock('../AccordionItem/accordion-item', () => 'div');

describe('Accordion', () => {
    it('renders correctly with min params', () => {
        const tree = renderer.create(
            <Accordion>
                <AccordionItem>Fake child</AccordionItem>
                <AccordionItem>Fake child</AccordionItem>
            </Accordion>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with accordion false', () => {
        const tree = renderer.create(
            <Accordion accordion={false}>
                <AccordionItem>Fake child</AccordionItem>
                <AccordionItem>Fake child</AccordionItem>
            </Accordion>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('disabled children', () => {
        const tree = renderer.create(
            <Accordion accordion={false}>
                <AccordionItem disabled={true}>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('handleClick function accordion true', () => {
        const wrapper = shallow(
            <Accordion>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        wrapper.instance().handleClick(1);

        expect(wrapper.instance().state.activeItems).toEqual([1]);

        wrapper.instance().handleClick(1);

        expect(wrapper.instance().state.activeItems).toEqual([]);
    });

    it('handleClick function accordion false', () => {
        const wrapper = shallow(
            <Accordion accordion={false}>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        wrapper.instance().handleClick(1);

        expect(wrapper.instance().state.activeItems).toEqual([1]);

        wrapper.instance().handleClick(1);

        expect(wrapper.instance().state.activeItems).toEqual([]);

        wrapper.instance().handleClick(0);
        wrapper.instance().handleClick(1);

        expect(wrapper.instance().state.activeItems).toEqual([0, 1]);
    });
});
