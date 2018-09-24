// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';

import { Subscribe } from 'unstated';
import {
    Consumer,
    type AccordionContainer,
} from '../AccordionContainer/AccordionContainer';
import ItemContainer from '../ItemContainer/ItemContainer';
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
        const { uuid } = itemStore.state;
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
        return (
            <Subscribe to={[ItemContainer]}>{this.renderItemBody}</Subscribe>
        );
    };

    render() {
        return <Consumer>{this.renderAccordionChildren}</Consumer>;
    }
}

export default AccordionItemBodyWrapper;
