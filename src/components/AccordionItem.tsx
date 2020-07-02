import * as React from 'react';
import DisplayName from '../helpers/DisplayName';
import { DivAttributes } from '../helpers/types';
import { assertValidHtmlId, nextUuid } from '../helpers/uuid';
import {
    Consumer as ItemConsumer,
    ItemContext,
    Provider as ItemProvider,
    UUID,
} from './ItemContext';

type Props = DivAttributes & {
    uuid?: UUID;
    activeClassName?: string;
    dangerouslySetExpanded?: boolean;
};

const defaultProps = {
    className: 'accordion__item',
};

export default class AccordionItem extends React.Component<Props> {
    static defaultProps: typeof defaultProps = defaultProps;

    static displayName: DisplayName.AccordionItem = DisplayName.AccordionItem;

    instanceUuid: UUID = nextUuid();

    renderChildren = (itemContext: ItemContext): JSX.Element => {
        const { uuid, className, activeClassName, ...rest } = this.props;
        const { expanded } = itemContext;
        const cx = expanded && activeClassName ? activeClassName : className;

        return (
            <div
                data-accordion-component="AccordionItem"
                className={cx}
                {...rest}
            />
        );
    };

    render(): JSX.Element {
        const {
            uuid = this.instanceUuid,
            dangerouslySetExpanded,
            ...rest
        } = this.props;

        if (rest.id) {
            assertValidHtmlId(rest.id);
        }

        return (
            <ItemProvider
                uuid={uuid}
                dangerouslySetExpanded={dangerouslySetExpanded}
            >
                <ItemConsumer>{this.renderChildren}</ItemConsumer>
            </ItemProvider>
        );
    }
}
