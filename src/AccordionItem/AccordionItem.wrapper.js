// @flow

import React, { Component, type ElementProps } from 'react';
import { compose, fromRenderProps } from 'recompose';
import consecutive from 'consecutive';

import {
    Consumer as AccordionConsumer,
    type AccordionContainer,
} from '../AccordionContainer/AccordionContainer';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import AccordionItem from './AccordionItem';

type AccordionItemWrapperProps = ElementProps<'div'> & {
    hideBodyClassName: ?string,
    disabled: ?boolean,
    expanded: ?boolean,
    uuid?: string,
    accordionStore: AccordionContainer,
};

let nextUuid = consecutive();
export function resetNextUuid() {
    nextUuid = consecutive();
}

class AccordionItemWrapper extends Component<AccordionItemWrapperProps> {
    static defaultProps = {
        className: 'accordion__item',
        hideBodyClassName: '',
        disabled: false,
        expanded: false,
        uuid: undefined,
    };

    id = nextUuid();

    render() {
        const { accordionStore, uuid, ...rest } = this.props;
        const itemUuid = uuid !== undefined ? uuid : this.id;

        return (
            <ItemProvider uuid={itemUuid}>
                <AccordionItem
                    {...rest}
                    uuid={itemUuid}
                    accordionStore={accordionStore}
                />
            </ItemProvider>
        );
    }
}

export default compose(
    fromRenderProps(AccordionConsumer, accordionStore => ({ accordionStore })),
)(AccordionItemWrapper);
