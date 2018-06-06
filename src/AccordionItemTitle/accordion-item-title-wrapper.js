// @flow

import React from 'react';
import type { ElementProps } from 'react';

import { Subscribe } from 'unstated';
import AccordionContainer from '../AccordionContainer/AccordionContainer';
import ItemContainer from '../ItemContainer/ItemContainer';
import AccordionItemTitle from './accordion-item-title';

const defaultProps = {
    className: 'accordion__title',
    hideBodyClassName: '',
};

type AccordionItemTitleWrapperProps = ElementProps<'div'> & {
    hideBodyClassName: string,
};

const AccordionItemTitleWrapper = (props: AccordionItemTitleWrapperProps) => (
    <Subscribe to={[AccordionContainer, ItemContainer]}>
        {(accordionStore, itemStore) => {
            const { uuid } = itemStore.state;
            const { items } = accordionStore.state;
            const item = items.find(stateItem => stateItem.uuid === uuid);

            return (
                <AccordionItemTitle
                    {...props}
                    item={item}
                    accordionStore={accordionStore}
                />
            );
        }}
    </Subscribe>
);
AccordionItemTitleWrapper.defaultProps = defaultProps;

export default AccordionItemTitleWrapper;
