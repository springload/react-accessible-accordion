// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';

import {
    Consumer as AccordionConsumer,
    type AccordionContainer,
} from '../AccordionContainer/AccordionContainer';
import {
    Provider as ItemProvider,
    Consumer as ItemConsumer,
    type ItemContainer,
} from '../ItemContainer/ItemContainer';
import AccordionItem from './AccordionItem';

type AccordionItemWrapperProps = ElementProps<'div'> & {
    hideBodyClassName: ?string,
    disabled: ?boolean,
    expanded: ?boolean,
    uuid?: string,
};

class AccordionItemWrapper extends Component<AccordionItemWrapperProps> {
    static defaultProps = {
        className: 'accordion__item',
        hideBodyClassName: '',
        disabled: false,
        expanded: false,
        uuid: undefined,
    };

    accordionContainer: AccordionContainer;

    renderAccordionChildren = (accordionStore: AccordionContainer) => {
        this.accordionContainer = accordionStore;
        return (
            <ItemProvider uuid={this.props.uuid}>
                <ItemConsumer>{this.renderItemChildren}</ItemConsumer>
            </ItemProvider>
        );
    };

    renderItemChildren = (itemStore: ItemContainer) => {
        const { uuid } = itemStore;
        return (
            <AccordionItem
                {...this.props}
                uuid={uuid}
                accordionStore={this.accordionContainer}
            />
        );
    };

    render() {
        return (
            <AccordionConsumer>
                {this.renderAccordionChildren}
            </AccordionConsumer>
        );
    }
}

export default AccordionItemWrapper;
