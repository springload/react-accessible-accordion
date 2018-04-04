// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';

import { Provider, Subscribe } from 'unstated';
import AccordionContainer from '../AccordionContainer/AccordionContainer';
import ItemContainer from '../ItemContainer/ItemContainer';
import AccordionItem from './accordion-item';

type AccordionItemWrapperProps = ElementProps<'div'> & {
    hideBodyClassName: ?string,
    disabled: ?boolean,
    expanded: ?boolean,
    accordionStore: AccordionContainer,
};

const defaultProps = {
    className: 'accordion__item',
    hideBodyClassName: '',
    disabled: false,
    expanded: false,
    accordionStore: new AccordionContainer(),
};

class AccordionItemWrapper extends Component<AccordionItemWrapperProps> {
    itemContainer = new ItemContainer();
    static defaultProps = defaultProps;

    render() {
        return (
            <Provider inject={[this.itemContainer]}>
                <Subscribe to={[AccordionContainer, ItemContainer]}>
                    {(accordionStore, itemStore) => (
                        <AccordionItem
                            {...this.props}
                            uuid={itemStore.state.uuid}
                            accordionStore={accordionStore}
                        />
                    )}
                </Subscribe>
            </Provider>
        );
    }
}

export default AccordionItemWrapper;
