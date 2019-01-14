import * as React from 'react';
import { UUID } from '../ItemContainer/ItemContainer';

import {
    AccordionContainer,
    Consumer,
    Provider,
} from '../AccordionContainer/AccordionContainer';
import Accordion from './Accordion';

type AccordionWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    accordion?: boolean;
    onChange(args: UUID | UUID[]): void;
};

export default class AccordionWrapper extends React.Component<
    AccordionWrapperProps
> {
    static defaultProps: AccordionWrapperProps = {
        accordion: true,
        onChange: (): void => {
            //
        },
        className: 'accordion',
        children: undefined,
    };

    renderAccordion = (accordionStore: AccordionContainer): JSX.Element => {
        const { accordion, onChange, ...rest } = this.props;

        return <Accordion accordion={accordionStore.accordion} {...rest} />;
    };

    render(): JSX.Element {
        return (
            <Provider
                accordion={this.props.accordion}
                onChange={this.props.onChange}
            >
                <Consumer>{this.renderAccordion}</Consumer>
            </Provider>
        );
    }
}
