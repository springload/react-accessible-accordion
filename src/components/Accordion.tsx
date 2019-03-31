import * as React from 'react';
import DisplayName from '../helpers/DisplayName';
import { DivAttributes } from '../helpers/types';
import { AccordionContext, Consumer, Provider } from './AccordionContext';
import { UUID } from './ItemContext';

type AccordionProps = Pick<
    DivAttributes,
    Exclude<keyof DivAttributes, 'onChange'>
> & {
    preExpanded?: UUID[];
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    onChange?(args: UUID[]): void;
};

export default class Accordion extends React.Component<AccordionProps> {
    static defaultProps: AccordionProps = {
        allowMultipleExpanded: undefined,
        allowZeroExpanded: undefined,
        onChange: undefined,
        className: 'accordion',
        children: undefined,
    };

    static displayName: DisplayName.Accordion = DisplayName.Accordion;

    renderAccordion = (accordionContext: AccordionContext): JSX.Element => {
        const {
            preExpanded,
            allowMultipleExpanded,
            allowZeroExpanded,
            onChange,
            ...rest
        } = this.props;

        return <div data-accordion-component="Accordion" {...rest} />;
    };

    render(): JSX.Element {
        return (
            <Provider
                preExpanded={this.props.preExpanded}
                allowMultipleExpanded={this.props.allowMultipleExpanded}
                allowZeroExpanded={this.props.allowZeroExpanded}
                onChange={this.props.onChange}
            >
                <Consumer>{this.renderAccordion}</Consumer>
            </Provider>
        );
    }
}
