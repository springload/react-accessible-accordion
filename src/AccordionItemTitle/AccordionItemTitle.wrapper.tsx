import * as React from 'react';
import { fromRenderProps, compose } from 'recompose';
import {
    getAccordionStore,
    AccordionContainer,
} from '../AccordionContainer/AccordionContainer';
import { getItemStore, ItemContainer } from '../ItemContainer/ItemContainer';
import AccordionItemTitle from './AccordionItemTitle';

type AccordionItemTitleWrapperProps = React.HTMLProps<HTMLDivElement> & {
    hideBodyClassName: string;
};

// eslint-disable-next-line react/prefer-stateless-function
export default class AccordionItemTitleWrapper extends React.Component<
    AccordionItemTitleWrapperProps
> {
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
