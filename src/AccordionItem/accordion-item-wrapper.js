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
    uuid: undefined,
};

class AccordionItemWrapper extends Component<AccordionItemWrapperProps> {
    itemContainer = new ItemContainer({
        uuid: this.props.uuid,
    });

    static defaultProps = defaultProps;

    render() {
        return (
            <Provider inject={[this.itemContainer]}>
                <Subscribe to={[AccordionContainer, ItemContainer]}>
                    {(accordionStore, itemStore) => {
                        const { uuid } = itemStore.state;
                        return (
                            <AccordionItem
                                {...this.props}
                                uuid={uuid}
                                accordionStore={accordionStore}
                            />
                        );
                    }}
                </Subscribe>
            </Provider>
        );
    }
}

export default AccordionItemWrapper;
