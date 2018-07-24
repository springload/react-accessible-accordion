// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';

import { Subscribe } from 'unstated';
import AccordionContainer from '../AccordionContainer/AccordionContainer';
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

    renderItemBody = (
        accordionStore: AccordionContainer,
        itemStore: ItemContainer,
    ) => {
        const { uuid } = itemStore.state;
        const { items, accordion } = accordionStore.state;
        const item = items.filter(stateItem => stateItem.uuid === uuid)[0];
        return (
            <AccordionItemBody
                {...this.props}
                {...item}
                accordion={accordion}
            />
        );
    };

    render() {
        return (
            <Subscribe to={[AccordionContainer, ItemContainer]}>
                {this.renderItemBody}
            </Subscribe>
        );
    }
}

export default AccordionItemBodyWrapper;
