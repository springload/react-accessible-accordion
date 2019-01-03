import * as React from 'react';
import {
    CONTEXT_KEY as ACCORDION_CONTEXT_KEY,
    getAccordionStore,
} from '../AccordionContainer/AccordionContainer';
import {
    CONTEXT_KEY as ITEM_CONTEXT_KEY,
    getItemStore,
} from '../ItemContainer/ItemContainer';
import AccordionItemTitle from './AccordionItemTitle';

type AccordionItemTitleWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    hideBodyClassName: string;
};

export default class AccordionItemTitleWrapper extends React.Component<
    AccordionItemTitleWrapperProps
> {
    static contextTypes = {
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [ACCORDION_CONTEXT_KEY]: () => null,
        [ITEM_CONTEXT_KEY]: () => null,
    };

    static defaultProps = {
        className: 'accordion__title',
        hideBodyClassName: '',
    };

    render() {
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
