// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';

import {
    Consumer as AccordionConsumer,
    type AccordionContainer,
} from '../AccordionContainer/AccordionContainer';
import {
    Consumer as ItemConsumer,
    type ItemContainer,
} from '../ItemContainer/ItemContainer';
import AccordionItemBody from './AccordionItemBody';

type AccordionItemBodyWrapperProps = ElementProps<'div'> & {
    hideBodyClassName: string,
};

class AccordionItemBodyWrapper extends Component<
    AccordionItemBodyWrapperProps,
> {
    static defaultProps = {
        className: 'accordion__body',
        hideBodyClassName: 'accordion__body--hidden',
    };

    renderItemBody = (itemStore: ItemContainer) => {
        const { uuid } = itemStore;
        const { items, accordion } = this.accordionStore;
        const item = items.filter(stateItem => stateItem.uuid === uuid)[0];
        return item ? (
            <AccordionItemBody
                {...this.props}
                {...item}
                accordion={accordion}
            />
        ) : null;
    };

    accordionStore: AccordionContainer;

    renderAccordionChildren = (accordionStore: AccordionContainer) => {
        this.accordionStore = accordionStore;
        return <ItemConsumer>{this.renderItemBody}</ItemConsumer>;
    };

    render() {
        return (
            <AccordionConsumer>
                {this.renderAccordionChildren}
            </AccordionConsumer>
        );
    }
}

export default AccordionItemBodyWrapper;
