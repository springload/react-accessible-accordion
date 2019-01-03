import * as React from 'react';
import {
    CONTEXT_KEY as ACCORDION_CONTEXT_KEY,
    getAccordionStore,
} from '../AccordionContainer/AccordionContainer';
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
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [ACCORDION_CONTEXT_KEY]: () => null,
        [ITEM_CONTEXT_KEY]: () => null,
    };

    static defaultProps: AccordionItemTitleWrapperProps = {
        className: 'accordion__title',
        hideBodyClassName: '',
    };

    render(): JSX.Element {
        const itemStore = getItemStore(this.context);
        const accordionStore = getAccordionStore(this.context);

        if (!itemStore || !accordionStore) {
            // TODO: log some warning/error?
            return null;
        }

        const { uuid } = itemStore;
        const { items, accordion } = accordionStore;
        const item = items.filter(stateItem => stateItem.uuid === uuid)[0];

        return (
            <AccordionItemTitle
                {...this.props}
                {...item}
                setExpanded={accordionStore.setExpanded}
                accordion={accordion}
            />
        );
    }
}
