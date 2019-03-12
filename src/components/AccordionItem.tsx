import * as React from 'react';
import DisplayName from '../helpers/DisplayName';
import { DivAttributes } from '../helpers/types';
import { nextUuid } from '../helpers/uuid';
import { Provider as ItemProvider, UUID } from './ItemContext';

type Props = DivAttributes & {
    uuid?: UUID;
};

const defaultProps = {
    className: 'accordion__item',
};

export default class AccordionItem extends React.Component<Props> {
    static defaultProps: typeof defaultProps = defaultProps;

    static displayName: DisplayName.AccordionItem = DisplayName.AccordionItem;

    instanceUuid: UUID = nextUuid();

    render(): JSX.Element {
        const { uuid = this.instanceUuid, ...rest } = this.props;

        return (
            <ItemProvider uuid={uuid}>
                <div data-accordion-component="AccordionItem" {...rest} />
            </ItemProvider>
        );
    }
}
