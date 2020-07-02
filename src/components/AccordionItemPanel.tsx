import * as React from 'react';
import DisplayName from '../helpers/DisplayName';
import { DivAttributes } from '../helpers/types';
import { assertValidHtmlId } from '../helpers/uuid';
import { Consumer as ItemConsumer, ItemContext } from './ItemContext';

type Props = DivAttributes;

const defaultProps = {
    className: 'accordion__panel',
};

export default class AccordionItemPanel extends React.Component<Props> {
    static defaultProps: typeof defaultProps = defaultProps;

    static displayName: DisplayName.AccordionItemPanel =
        DisplayName.AccordionItemPanel;

    renderChildren = ({ panelAttributes }: ItemContext): JSX.Element => {
        if (this.props.id) {
            assertValidHtmlId(this.props.id);
        }

        return (
            <div
                data-accordion-component="AccordionItemPanel"
                {...this.props}
                {...panelAttributes}
            />
        );
    };

    render(): JSX.Element {
        return <ItemConsumer>{this.renderChildren}</ItemConsumer>;
    }
}
