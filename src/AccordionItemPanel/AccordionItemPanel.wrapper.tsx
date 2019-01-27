import * as React from 'react';
import * as propTypes from '../helpers/propTypes';

import {
    CONTEXT_KEY as ACCORDION_CONTEXT_KEY,
    getAccordionStore,
    Item,
} from '../AccordionContainer/AccordionContainer';
import {
    CONTEXT_KEY as ITEM_CONTEXT_KEY,
    getItemStore,
} from '../ItemContainer/ItemContainer';
import AccordionItemPanel from './AccordionItemPanel';

type AccordionItemPanelWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    expandedClassName: string;
};

type AccordionItemPanelWrapperState = {};

type AccordionItemPanelWrapperContext = {
    [ACCORDION_CONTEXT_KEY](): null;
    [ITEM_CONTEXT_KEY](): null;
};

export default class AccordionItemPanelWrapper extends React.Component<
    AccordionItemPanelWrapperProps,
    AccordionItemPanelWrapperState,
    AccordionItemPanelWrapperContext
> {
    static contextTypes: AccordionItemPanelWrapperContext = {
        [ACCORDION_CONTEXT_KEY]: propTypes.wildcard,
        [ITEM_CONTEXT_KEY]: propTypes.wildcard,
    };

    static defaultProps: AccordionItemPanelWrapperProps = {
        className: 'accordion__panel',
        expandedClassName: 'accordion__panel--expanded',
    };

    render(): JSX.Element {
        const accordionStore = getAccordionStore(this.context);

        if (!accordionStore) {
            // tslint:disable-next-line:no-console
            console.error(
                'AccordionItemPanel component cannot render because it has not been nested inside an Accordion component.',
            );

            return null;
        }

        const itemStore = getItemStore(this.context);

        if (!itemStore) {
            // tslint:disable-next-line:no-console
            console.error(
                'AccordionItemPanel component cannot render because it has not been nested inside an AccordionItem component.',
            );

            return null;
        }

        const { uuid } = itemStore;
        const { items, allowMultipleExpanded } = accordionStore;
        const item = items.filter(
            (stateItem: Item) => stateItem.uuid === uuid,
        )[0];

        return item ? (
            <AccordionItemPanel
                {...this.props}
                {...item}
                allowMultipleExpanded={allowMultipleExpanded}
            />
        ) : null;
    }
}
