import * as React from 'react';

import {
    getAccordionStore,
    contextTypes as accordionContextTypes,
} from '../AccordionContainer/AccordionContainer';
import {
    getItemStore,
    contextTypes as itemContextTypes,
} from '../ItemContainer/ItemContainer';
import AccordionItemBody from './AccordionItemBody';

type AccordionItemBodyWrapperProps = React.HTMLProps<HTMLDivElement> & {
    hideBodyClassName: string;
};

export default class AccordionItemBodyWrapper extends React.Component<
    AccordionItemBodyWrapperProps
> {
    static contextTypes = {
        ...accordionContextTypes,
        ...itemContextTypes,
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
