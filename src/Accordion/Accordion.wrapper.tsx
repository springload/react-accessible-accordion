import * as React from 'react';
import { UUID } from '../ItemContext/ItemContext';

import {
    AccordionContext,
    Consumer,
    Provider,
} from '../AccordionContext/AccordionContext';
import Accordion from './Accordion';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type AccordionWrapperProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange'
> & {
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    onChange(args: UUID[]): void;
};

export default class AccordionWrapper extends React.Component<
    AccordionWrapperProps
> {
    static defaultProps: AccordionWrapperProps = {
        allowMultipleExpanded: undefined,
        allowZeroExpanded: undefined,
        onChange: (): void => {
            //
        },
        className: 'accordion',
        children: undefined,
    };

    renderAccordion = (accordionContext: AccordionContext): JSX.Element => {
        const {
            allowMultipleExpanded,
            allowZeroExpanded,
            onChange,
            ...rest
        } = this.props;

        return <Accordion {...rest} />;
    };

    render(): JSX.Element {
        return (
            <Provider
                allowMultipleExpanded={this.props.allowMultipleExpanded}
                allowZeroExpanded={this.props.allowZeroExpanded}
                onChange={this.props.onChange}
            >
                <Consumer>{this.renderAccordion}</Consumer>
            </Provider>
        );
    }
}
