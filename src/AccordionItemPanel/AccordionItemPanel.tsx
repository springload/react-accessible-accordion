import { default as classnames } from 'classnames';
import * as React from 'react';
import { DivAttributes } from '../helpers/types';
import {
    Consumer as ItemConsumer,
    ItemContext,
} from '../ItemContext/ItemContext';

type Props = DivAttributes & {
    expandedClassName: string;
    expanded: boolean;
};

const AccordionItemPanel: React.SFC<Props> = ({
    className,
    expandedClassName,
    expanded,
    ...rest
}: Props): JSX.Element => {
    return (
        <div
            className={classnames(className, {
                [expandedClassName]: expanded,
            })}
            {...rest}
        />
    );
};

type WrapperProps = Pick<Props, Exclude<keyof Props, 'expanded'>>;

export default class Wrapper extends React.Component<WrapperProps> {
    static defaultProps: { className: string; expandedClassName: string } = {
        className: 'accordion__panel',
        expandedClassName: 'accordion__panel--expanded',
    };

    renderChildren = (itemContext: ItemContext): JSX.Element => {
        const { panelAttributes, expanded } = itemContext;

        return (
            <AccordionItemPanel
                {...this.props}
                {...panelAttributes}
                expanded={expanded}
            />
        );
    };

    render(): JSX.Element {
        return <ItemConsumer>{this.renderChildren}</ItemConsumer>;
    }
}
