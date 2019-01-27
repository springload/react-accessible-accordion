import * as React from 'react';

import {
    CONTEXT_KEY,
    getAccordionStore,
} from '../AccordionContainer/AccordionContainer';
import * as propTypes from '../helpers/propTypes';
import { nextUuid } from '../helpers/uuid';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import AccordionItem from './AccordionItem';

type AccordionItemWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    expandedClassName?: string;
    expanded?: boolean;
    uuid?: string;
};

type AccordionItemWrapperState = {};

type AccordionItemWrapperContext = {
    [CONTEXT_KEY](): null;
};

export default class AccordionItemWrapper extends React.Component<
    AccordionItemWrapperProps,
    AccordionItemWrapperState,
    AccordionItemWrapperContext
> {
    static contextTypes: AccordionItemWrapperContext = {
        [CONTEXT_KEY]: propTypes.wildcard,
    };

    static defaultProps: AccordionItemWrapperProps = {
        className: 'accordion__item',
        expandedClassName: '',
        expanded: false,
        uuid: undefined,
    };

    id: number = nextUuid();

    render(): JSX.Element {
        const accordionStore = getAccordionStore(this.context);
        if (!accordionStore) {
            // tslint:disable-next-line:no-console
            console.error(
                'AccordionItem component cannot render because it has not been nested inside an Accordion component.',
            );

            return null;
        }
        const { uuid, ...rest } = this.props;
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
