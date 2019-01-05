import * as React from 'react';

import {
    CONTEXT_KEY,
    getAccordionStore,
} from '../AccordionContainer/AccordionContainer';
import { nextUuid } from '../helpers/uuid';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import AccordionItem from './AccordionItem';

type AccordionItemWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    hideBodyClassName?: string;
    disabled?: boolean;
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
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [CONTEXT_KEY]: (): null => null,
    };

    static defaultProps: AccordionItemWrapperProps = {
        className: 'accordion__item',
        hideBodyClassName: '',
        disabled: false,
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
