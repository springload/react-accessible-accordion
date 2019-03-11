import * as React from 'react';
import { InjectedHeadingAttributes } from '../helpers/AccordionStore';
import DisplayName from '../helpers/DisplayName';
import { DivAttributes } from '../helpers/types';

import { Consumer as ItemConsumer, ItemContext } from './ItemContext';

type Props = DivAttributes;

const defaultProps = {
    className: 'accordion__heading',
    'aria-level': 3,
};

export class AccordionItemHeading extends React.PureComponent<Props> {
    static defaultProps: typeof defaultProps = defaultProps;

    render(): JSX.Element {
        return (
            <div
                data-accordion-component="AccordionItemHeading"
                {...this.props}
            />
        );
    }
}

type WrapperProps = Pick<
    DivAttributes,
    Exclude<keyof DivAttributes, keyof InjectedHeadingAttributes>
>;

const AccordionItemHeadingWrapper: React.SFC<DivAttributes> = (
    props: WrapperProps,
): JSX.Element => (
    <ItemConsumer>
        {(itemContext: ItemContext): JSX.Element => {
            const { headingAttributes } = itemContext;

            return <AccordionItemHeading {...props} {...headingAttributes} />;
        }}
    </ItemConsumer>
);

AccordionItemHeadingWrapper.displayName = DisplayName.AccordionItemHeading;

export default AccordionItemHeadingWrapper;
