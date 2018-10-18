// @flow

import React, { Component, type ElementProps } from 'react';
import { compose, fromRenderProps } from 'recompose';

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
    itemStore: ItemContainer,
    accordionStore: AccordionContainer,
};

// eslint-disable-next-line react/prefer-stateless-function
class AccordionItemBodyWrapper extends Component<
    AccordionItemBodyWrapperProps,
> {
    static defaultProps = {
        className: 'accordion__body',
        hideBodyClassName: 'accordion__body--hidden',
    };

    render() {
        const { itemStore, accordionStore, ...rest } = this.props;
        const { uuid } = itemStore;
        const { items, accordion } = accordionStore;
        const item = items.filter(stateItem => stateItem.uuid === uuid)[0];
        return item ? (
            <AccordionItemBody {...rest} {...item} accordion={accordion} />
        ) : null;
    }
}

export default compose(
    fromRenderProps(AccordionConsumer, accordionStore => ({ accordionStore })),
    fromRenderProps(ItemConsumer, itemStore => ({ itemStore })),
)(AccordionItemBodyWrapper);

