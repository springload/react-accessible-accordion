import * as React from 'react';
import consecutive from 'consecutive';

import {
    getAccordionStore,
    contextTypes,
} from '../AccordionContainer/AccordionContainer';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import AccordionItem from './AccordionItem';

type AccordionItemWrapperProps = React.HTMLProps<HTMLDivElement> & {
    hideBodyClassName: string | undefined;
    disabled: boolean | undefined;
    expanded: boolean | undefined;
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
