import consecutive from 'consecutive';
import * as React from 'react';

import {
    contextTypes,
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
    static contextTypes = contextTypes;

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
