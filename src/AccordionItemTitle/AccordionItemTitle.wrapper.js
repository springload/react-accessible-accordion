// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';

import { Subscribe } from 'unstated';
import {
    Consumer,
    type AccordionContainer,
} from '../AccordionContainer/AccordionContainer';
import ItemContainer from '../ItemContainer/ItemContainer';
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
        const { uuid } = itemStore.state;
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
        return (
            <Subscribe to={[ItemContainer]}>{this.renderItemTitle}</Subscribe>
        );
    };

    render() {
        return <Consumer>{this.renderAccordionChildren}</Consumer>;
    }
}

export default AccordionItemTitleWrapper;
