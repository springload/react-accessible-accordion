// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';

import {
    Provider,
    Consumer,
    type AccordionContainer,
} from '../AccordionContainer/AccordionContainer';
import Accordion from './Accordion';

type AccordionWrapperProps = ElementProps<'div'> & {
    accordion: boolean,
    onChange: Function,
};

const defaultProps: AccordionWrapperProps = {
    accordion: true,
    onChange: () => {},
    className: 'accordion',
    children: null,
};

class AccordionWrapper extends Component<AccordionWrapperProps> {
    static defaultProps = defaultProps;

    renderAccordion = (accordionStore: AccordionContainer) => {
        const { accordion, onChange, ...rest } = this.props;
        return <Accordion accordion={accordionStore.accordion} {...rest} />;
    };

    render() {
        return (
            <Provider
                accordion={this.props.accordion}
                onChange={this.props.onChange}
            >
                <Consumer>{this.renderAccordion}</Consumer>
            </Provider>
        );
    }
}

export default AccordionWrapper;
