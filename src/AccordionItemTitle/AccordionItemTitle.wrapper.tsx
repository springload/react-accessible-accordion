import * as React from 'react';
import {
    CONTEXT_KEY as ACCORDION_CONTEXT_KEY,
    getAccordionStore,
    Item,
} from '../AccordionContainer/AccordionContainer';
import * as propTypes from '../helpers/propTypes';
import {
    CONTEXT_KEY as ITEM_CONTEXT_KEY,
    getItemStore,
} from '../ItemContainer/ItemContainer';
import { default as AccordionItemTitle } from './AccordionItemTitle';

type AccordionItemTitleWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    hideBodyClassName: string;
};

type AccordionItemTitleWrapperState = {};

type AccordionItemTitleWrapperContext = {
    [ACCORDION_CONTEXT_KEY](): null;
    [ITEM_CONTEXT_KEY](): null;
};

export default class AccordionItemTitleWrapper extends React.Component<
    AccordionItemTitleWrapperProps
> {
    static contextTypes: AccordionItemTitleWrapperContext = {
        [ACCORDION_CONTEXT_KEY]: propTypes.wildcard,
        [ITEM_CONTEXT_KEY]: propTypes.wildcard,
    };

    static defaultProps: AccordionItemTitleWrapperProps = {
        className: 'accordion__title',
        hideBodyClassName: '',
    };

    render(): JSX.Element {
        const accordionStore = getAccordionStore(this.context);

        if (!accordionStore) {
            // tslint:disable-next-line:no-console
            console.error(
                'AccordionItemTitle component cannot render because it has not been nested inside an Accordion component.',
            );

            return null;
        }

        const itemStore = getItemStore(this.context);

        if (!itemStore) {
            // tslint:disable-next-line:no-console
            console.error(
                'AccordionItemTitle component cannot render because it has not been nested inside an AccordionItem component.',
            );

            return null;
        }

        const { uuid } = itemStore;
        const { items } = accordionStore;
        const item = items.filter(
            (stateItem: Item) => stateItem.uuid === uuid,
        )[0];

        return (
            <AccordionItemTitle
                {...this.props}
                {...item}
                setExpanded={accordionStore.setExpanded}
            />
        );
    }
}
