// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';

import { Provider, Subscribe } from 'unstated';
import {
    Consumer,
    type AccordionContainer,
} from '../AccordionContainer/AccordionContainer';
import ItemContainer from '../ItemContainer/ItemContainer';
import AccordionItem from './AccordionItem';

type AccordionItemWrapperProps = ElementProps<'div'> & {
    hideBodyClassName: ?string,
    disabled: ?boolean,
    expanded: ?boolean,
    // accordionStore: AccordionContainer,
    uuid?: string,
};

const defaultProps = {
    className: 'accordion__item',
    hideBodyClassName: '',
    disabled: false,
    expanded: false,
    uuid: undefined,
};

class AccordionItemWrapper extends Component<AccordionItemWrapperProps> {
    itemContainer = new ItemContainer({
        uuid: this.props.uuid,
    });

    static defaultProps = defaultProps;

    accordionContainer: AccordionContainer;

    renderAccordionChildren = (accordionStore: AccordionContainer) => {
        this.accordionContainer = accordionStore;
        return (
            <Provider inject={[this.itemContainer]}>
                <Subscribe to={[ItemContainer]}>
                    {this.renderItemChildren}
                </Subscribe>
            </Provider>
        );
    };

    renderItemChildren = (itemStore: ItemContainer) => {
        const { uuid } = itemStore.state;
        return (
            <AccordionItem
                {...this.props}
                uuid={uuid}
                accordionStore={this.accordionContainer}
            />
        );
    };

    render() {
        return <Consumer>{this.renderAccordionChildren}</Consumer>;
    }
}

export default AccordionItemWrapper;
