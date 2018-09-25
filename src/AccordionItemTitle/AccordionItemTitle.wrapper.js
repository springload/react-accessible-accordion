// @flow

import React, { Component, type ElementProps } from 'react';
import { fromRenderProps, compose } from 'recompose';
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
    accordionStore: AccordionContainer,
    itemStore: ItemContainer,
};

// eslint-disable-next-line react/prefer-stateless-function
class AccordionItemTitleWrapper extends Component<
    AccordionItemTitleWrapperProps,
> {
    static defaultProps = {
        className: 'accordion__title',
        hideBodyClassName: '',
    };

    render() {
        const { itemStore, accordionStore, ...rest } = this.props;
        const { uuid } = itemStore;
        const { items, accordion } = accordionStore;
        const item = items.filter(stateItem => stateItem.uuid === uuid)[0];

        return (
            <AccordionItemTitle
                {...rest}
                {...item}
                setExpanded={accordionStore.setExpanded}
                accordion={accordion}
            />
        );
    }
}

export default compose(
    fromRenderProps(AccordionConsumer, accordionStore => ({ accordionStore })),
    fromRenderProps(ItemConsumer, itemStore => ({ itemStore })),
)(AccordionItemTitleWrapper);
