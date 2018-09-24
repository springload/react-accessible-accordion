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
import AccordionItemTitle from './AccordionItemTitle';

type AccordionItemTitleWrapperProps = ElementProps<'div'> & {
    hideBodyClassName: string,
};

class AccordionItemTitleWrapper extends Component<
    AccordionItemTitleWrapperProps,
> {
    static defaultProps = {
        className: 'accordion__title',
        hideBodyClassName: '',
    };

    accordionStore: AccordionContainer;

    renderItemTitle = (itemStore: ItemContainer) => {
        const { uuid } = itemStore;
        const { items, accordion } = this.accordionStore;
        const item = items.filter(stateItem => stateItem.uuid === uuid)[0];

        return (
            <AccordionItemTitle
                {...this.props}
                {...item}
                setExpanded={this.accordionStore.setExpanded}
                accordion={accordion}
            />
        );
    };

    renderAccordionChildren = (accordionStore: AccordionContainer) => {
        this.accordionStore = accordionStore;
        return <ItemConsumer>{this.renderItemTitle}</ItemConsumer>;
    };

    render() {
        return (
            <AccordionConsumer>
                {this.renderAccordionChildren}
            </AccordionConsumer>
        );
    }
}

export default AccordionItemTitleWrapper;
