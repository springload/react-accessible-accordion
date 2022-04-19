import * as React from 'react';
import { InjectedHeadingAttributes } from '../helpers/AccordionStore';
import DisplayName from '../helpers/DisplayName';
import { DivAttributes } from '../helpers/types';
import { assertValidHtmlId } from '../helpers/id';

import { Consumer as ItemConsumer, ItemContext } from './ItemContext';

type Props = DivAttributes;

const defaultProps = {
    className: 'accordion__heading',
    'aria-level': 3,
};

export const SPEC_ERROR = `AccordionItemButton may contain only one child element, which must be an instance of AccordionItemButton.

From the WAI-ARIA spec (https://www.w3.org/TR/wai-aria-practices-1.1/#accordion):

“The button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.”

`;

export class AccordionItemHeading extends React.PureComponent<Props> {
    static defaultProps: typeof defaultProps = defaultProps;

    ref: HTMLDivElement | undefined;

    static VALIDATE(ref: HTMLDivElement | undefined): void | never {
        if (ref === undefined) {
            throw new Error('ref is undefined');
        }
        if (
            !(
                ref.childElementCount === 1 &&
                ref.firstElementChild &&
                ref.firstElementChild.getAttribute(
                    'data-accordion-component',
                ) === 'AccordionItemButton'
            )
        ) {
            throw new Error(SPEC_ERROR);
        }
    }

    setRef = (ref: HTMLDivElement): void => {
        this.ref = ref;
    };

    componentDidUpdate(): void {
        AccordionItemHeading.VALIDATE(this.ref);
    }

    componentDidMount(): void {
        AccordionItemHeading.VALIDATE(this.ref);
    }

    render(): JSX.Element {
        return (
            <div
                data-accordion-component="AccordionItemHeading"
                {...this.props}
                ref={this.setRef}
            />
        );
    }
}

type WrapperProps = Pick<
    DivAttributes,
    Exclude<keyof DivAttributes, keyof InjectedHeadingAttributes>
>;

const AccordionItemHeadingWrapper: React.FC<DivAttributes> = (
    props: WrapperProps,
): JSX.Element => (
    <ItemConsumer>
        {(itemContext: ItemContext): JSX.Element => {
            const { headingAttributes } = itemContext;

            if (props.id) {
                assertValidHtmlId(props.id);
            }

            return <AccordionItemHeading {...props} {...headingAttributes} />;
        }}
    </ItemConsumer>
);

AccordionItemHeadingWrapper.displayName = DisplayName.AccordionItemHeading;

export default AccordionItemHeadingWrapper;
