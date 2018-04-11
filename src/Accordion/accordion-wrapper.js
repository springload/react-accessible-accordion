// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';

import { Provider, Subscribe } from 'unstated';
import AccordionContainer from '../AccordionContainer/AccordionContainer';
import Accordion from './accordion';

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
    accordionStore = new AccordionContainer();

    static defaultProps = defaultProps;

    componentWillMount() {
        if (this.accordionStore) {
            this.accordionStore.setAccordion(this.props.accordion);
        }
        if (this.accordionStore) {
            this.accordionStore.setOnChange(this.props.onChange);
        }
    }

    componentWillUpdate(nextProps: AccordionWrapperProps) {
        if (this.accordionStore) {
            this.accordionStore.setAccordion(nextProps.accordion);
        }
        if (this.accordionStore) {
            this.accordionStore.setOnChange(nextProps.onChange);
        }
    }

    render() {
        const { accordion, onChange, ...rest } = this.props;
        return (
            <Provider inject={[this.accordionStore]}>
                <Subscribe to={[AccordionContainer]}>
                    {accordionStore => (
                        <Accordion
                            accordion={accordionStore.state.accordion}
                            {...rest}
                        />
                    )}
                </Subscribe>
            </Provider>
        );
    }
}

export default AccordionWrapper;
