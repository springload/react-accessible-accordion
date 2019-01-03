import consecutive from 'consecutive';
import * as React from 'react';

import {
    CONTEXT_KEY,
    getAccordionStore,
} from '../AccordionContainer/AccordionContainer';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import AccordionItem from './AccordionItem';

type AccordionItemWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    hideBodyClassName?: string;
    disabled?: boolean;
    expanded?: boolean;
    uuid?: string;
};

let nextUuid = consecutive();
export function resetNextUuid() {
    nextUuid = consecutive();
}

export default class AccordionItemWrapper extends React.Component<
    AccordionItemWrapperProps
> {
    static contextTypes = {
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [CONTEXT_KEY]: () => null,
    };

    static defaultProps = {
        className: 'accordion__item',
        hideBodyClassName: '',
        disabled: false,
        expanded: false,
        uuid: undefined,
    };

    id = nextUuid();

    render() {
        const accordionStore = getAccordionStore(this.context);
        if (!accordionStore) {
            // TODO: log an error/warning?
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
