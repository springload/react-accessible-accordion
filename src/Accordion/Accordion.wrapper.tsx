import * as React from 'react';
import { UUID } from '../ItemContainer/ItemContainer';

import {
    AccordionContainer,
    Consumer,
    Provider,
} from '../AccordionContainer/AccordionContainer';
import Accordion from './Accordion';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type AccordionWrapperProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange'
> & {
    allowMultipleExpanded?: boolean;
    onChange(args: UUID | UUID[]): void;
};

export default class AccordionWrapper extends React.Component<
    AccordionWrapperProps
> {
    static defaultProps: AccordionWrapperProps = {
        allowMultipleExpanded: false,
        onChange: (): void => {
            //
        },
        className: 'accordion',
        children: undefined,
    };

    renderAccordion = (accordionStore: AccordionContainer): JSX.Element => {
        const { allowMultipleExpanded, onChange, ...rest } = this.props;

        return <Accordion {...rest} />;
    };

    render(): JSX.Element {
        return (
            <Provider
                allowMultipleExpanded={this.props.allowMultipleExpanded}
                onChange={this.props.onChange}
            >
                <Consumer>{this.renderAccordion}</Consumer>
            </Provider>
        );
    }
}
