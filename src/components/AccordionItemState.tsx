import * as React from 'react';
import { DivAttributes } from '../helpers/types';
import { Consumer as ItemConsumer, ItemContext } from './ItemContext';

type Props = Pick<DivAttributes, Exclude<keyof DivAttributes, 'children'>> & {
    children(
        args: Partial<{ expanded: boolean; disabled: boolean }>,
    ): React.ReactNode;
};

const AccordionItemState = ({ children }: Props): JSX.Element => {
    const renderChildren = (itemContext: ItemContext): JSX.Element => {
        const { expanded, disabled } = itemContext;

        return (
            <React.Fragment>{children({ expanded, disabled })}</React.Fragment>
        );
    };

    return <ItemConsumer>{renderChildren}</ItemConsumer>;
};

export default AccordionItemState;
