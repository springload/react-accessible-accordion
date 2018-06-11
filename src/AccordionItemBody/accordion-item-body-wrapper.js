// @flow

import React from 'react';
import type { ElementProps } from 'react';

import { Subscribe } from 'unstated';
import AccordionContainer from '../AccordionContainer/AccordionContainer';
import ItemContainer from '../ItemContainer/ItemContainer';
import AccordionItemBody from './accordion-item-body';

const defaultProps = {
    className: 'accordion__body',
    hideBodyClassName: 'accordion__body--hidden',
};

type AccordionItemBodyWrapperProps = ElementProps<'div'> & {
    hideBodyClassName: string,
};

const AccordionItemBodyWrapper = (props: AccordionItemBodyWrapperProps) => (
    <Subscribe to={[AccordionContainer, ItemContainer]}>
        {(accordionStore, itemStore) => {
            const { uuid } = itemStore.state;
            const { items, accordion } = accordionStore.state;
            const item = items.filter(stateItem => stateItem.uuid === uuid)[0];
            return (
                <AccordionItemBody {...props} {...item} accordion={accordion} />
            );
        }}
    </Subscribe>
);
AccordionItemBodyWrapper.defaultProps = defaultProps;

export default AccordionItemBodyWrapper;
