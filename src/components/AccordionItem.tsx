import { default as classnames } from 'classnames';
import * as React from 'react';
import { DivAttributes } from '../helpers/types';
import { nextUuid } from '../helpers/uuid';
import {
    Consumer as ItemConsumer,
    ItemContext,
    Provider as ItemProvider,
    UUID,
} from './ItemContext';

type Props = Pick<DivAttributes, Exclude<keyof DivAttributes, 'role'>> & {
    expanded: boolean;
    className?: string;
    expandedClassName?: string;
};

interface DefaultProps {
    className: string;
    expandedClassName: string;
}

class AccordionItem extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        className: 'accordion__item',
        expandedClassName: 'accordion__item--expanded',
    };

    render(): JSX.Element {
        const { className, expanded, expandedClassName, ...rest } = this.props;

        return (
            <div
                className={classnames(className, {
                    [String(expandedClassName)]: expanded && expandedClassName,
                })}
                {...rest}
            />
        );
    }
}

type WrapperProps = Pick<Props, Exclude<keyof Props, 'expanded'>> & {
    uuid?: UUID;
};

export default class AccordionItemWrapper extends React.Component<
    WrapperProps
> {
    instanceUuid: UUID = nextUuid();

    render(): JSX.Element {
        const { uuid = this.instanceUuid, ...rest } = this.props;

        return (
            <ItemProvider uuid={uuid}>
                <ItemConsumer>
                    {(itemContext: ItemContext): JSX.Element => {
                        const { expanded } = itemContext;

                        return <AccordionItem {...rest} expanded={expanded} />;
                    }}
                </ItemConsumer>
            </ItemProvider>
        );
    }
}
