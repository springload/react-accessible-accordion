import * as React from 'react';

import { getAccordionStore } from '../AccordionContainer/AccordionContainer';
import { getItemStore } from '../ItemContainer/ItemContainer';
import AccordionItemBody from './AccordionItemBody';

type AccordionItemBodyWrapperProps = React.HTMLProps<HTMLDivElement> & {
    hideBodyClassName: string,
};

export default class AccordionItemBodyWrapper extends React.Component<AccordionItemBodyWrapperProps> {
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
