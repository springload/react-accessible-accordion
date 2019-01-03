import * as React from 'react';

import {
    CONTEXT_KEY as ACCORDION_CONTEXT_KEY,
    getAccordionStore,
} from '../AccordionContainer/AccordionContainer';
import {
    CONTEXT_KEY as ITEM_CONTEXT_KEY,
    getItemStore,
} from '../ItemContainer/ItemContainer';
import AccordionItemBody from './AccordionItemBody';

type AccordionItemBodyWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    hideBodyClassName: string;
};

export default class AccordionItemBodyWrapper extends React.Component<
    AccordionItemBodyWrapperProps
> {
    static contextTypes = {
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [ACCORDION_CONTEXT_KEY]: () => null,
        [ITEM_CONTEXT_KEY]: () => null,
    };

    static defaultProps = {
        className: 'accordion__body',
        hideBodyClassName: 'accordion__body--hidden',
    };

    render() {
        const itemStore = getItemStore(this.context);
        const accordionStore = getAccordionStore(this.context);
        const { uuid } = itemStore;
        const { items, accordion } = accordionStore;
        const item = items.filter(stateItem => stateItem.uuid === uuid)[0];
        return item ? (
            <AccordionItemBody
                {...this.props}
                {...item}
                accordion={accordion}
            />
        ) : null;
    }
}
