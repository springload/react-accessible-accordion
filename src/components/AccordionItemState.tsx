import * as React from 'react';
import { DivAttributes } from '../helpers/types';
import { Consumer as ItemConsumer, ItemContext } from './ItemContext';

type Props = Pick<DivAttributes, Exclude<keyof DivAttributes, 'children'>> & {
    expanded: boolean;
    children(expanded: boolean): JSX.Element;
};

export default class AccordionItemStateWrapper extends React.Component<Props> {
    renderChildren = (itemContext: ItemContext): JSX.Element => {
        const { expanded } = itemContext;

        return <React.Fragment>{this.props.children(expanded)}</React.Fragment>;
    };

    render(): JSX.Element {
        return <ItemConsumer>{this.renderChildren}</ItemConsumer>;
    }
}
