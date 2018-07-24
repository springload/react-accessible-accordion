// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';

import { Subscribe } from 'unstated';
import AccordionContainer from '../AccordionContainer/AccordionContainer';
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

    renderItemTitle = (
        accordionStore: AccordionContainer,
        itemStore: ItemContainer,
    ) => {
        const { uuid } = itemStore.state;
        const { items, accordion } = accordionStore.state;
        const item = items.filter(stateItem => stateItem.uuid === uuid)[0];

        return (
            <AccordionItemTitle
                {...this.props}
                {...item}
                setExpanded={accordionStore.setExpanded}
                accordion={accordion}
            />
        );
    };

    render() {
        return (
            <Subscribe to={[AccordionContainer, ItemContainer]}>
                {this.renderItemTitle}
            </Subscribe>
        );
    }
}

export default AccordionItemTitleWrapper;
