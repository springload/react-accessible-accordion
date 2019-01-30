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

import AccordionItemState from './AccordionItemState';

type AccordionItemStateWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    expanded?: boolean;
    render(expanded: boolean): React.ReactNode;
};

type AccordionItemStateWrapperContext = {
    [ACCORDION_CONTEXT_KEY](): null;
    [ITEM_CONTEXT_KEY](): null;
};

export default class AccordionItemStateWrapper extends React.Component<
    AccordionItemStateWrapperProps,
    AccordionItemStateWrapperContext
> {
    static contextTypes: AccordionItemStateWrapperContext = {
        [ACCORDION_CONTEXT_KEY]: propTypes.wildcard,
        [ITEM_CONTEXT_KEY]: propTypes.wildcard,
    };

    static defaultProps: AccordionItemStateWrapperProps = {
        render: (expanded: boolean): React.ReactNode => null,
    };

    render(): JSX.Element {
        const accordionStore = getAccordionStore(this.context);

        if (!accordionStore) {
            // tslint:disable-next-line:no-console
            console.error(
                'AccordionItemState component cannot render because it has not been nested inside an Accordion component.',
            );

            return null;
        }

        const itemStore = getItemStore(this.context);

        if (!itemStore) {
            // tslint:disable-next-line:no-console
            console.error(
                'AccordionItemState component cannot render because it has not been nested inside an AccordionItem component.',
            );

            return null;
        }

        const { uuid } = itemStore;
        const { items } = accordionStore;
        const item = items.filter(
            (stateItem: Item) => stateItem.uuid === uuid,
        )[0];
        const { render } = this.props;

        return item ? (
            <AccordionItemState expanded={item.expanded} render={render} />
        ) : null;
    }
}
