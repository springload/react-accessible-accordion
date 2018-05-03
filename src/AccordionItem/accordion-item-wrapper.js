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
    uuid?: string,
};

const defaultProps = {
    className: 'accordion__item',
    hideBodyClassName: '',
    disabled: false,
    expanded: false,
    accordionStore: new AccordionContainer(),
    uuid: null,
};

class AccordionItemWrapper extends Component<AccordionItemWrapperProps> {
    itemContainer = new ItemContainer();
    static defaultProps = defaultProps;

    render() {
        return (
            <Provider inject={[this.itemContainer]}>
                <Subscribe to={[AccordionContainer, ItemContainer]}>
                    {(accordionStore, itemStore) => {
                        let uuid = itemStore.state.uuid;
                        if (this.props.uuid) uuid = this.props.uuid;
                        return (
                            <AccordionItem
                                {...this.props}
                                uuid={uuid}
                                accordionStore={accordionStore}
                                itemstore={itemStore}
                            />
                        );
                    }}
                </Subscribe>
            </Provider>
        );
    }
}

export default AccordionItemWrapper;
