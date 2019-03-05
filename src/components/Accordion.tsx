import * as React from 'react';
import { DivAttributes } from '../helpers/types';
import { AccordionContext, Consumer, Provider } from './AccordionContext';
import { UUID } from './ItemContext';

type AccordionWrapperProps = Pick<
    DivAttributes,
    Exclude<keyof DivAttributes, 'onChange'>
> & {
    preExpanded?: UUID[];
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    onChange?(args: UUID[]): void;
};

export default class Accordion extends React.Component<AccordionWrapperProps> {
    static defaultProps: AccordionWrapperProps = {
        allowMultipleExpanded: undefined,
        allowZeroExpanded: undefined,
        onChange: undefined,
        className: 'accordion',
        children: undefined,
    };

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
