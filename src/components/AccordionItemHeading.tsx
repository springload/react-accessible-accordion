import * as React from 'react';
import DisplayName from '../helpers/DisplayName';
import { assertValidHtmlId } from '../helpers/id';
import { HeadingAttributes } from '../helpers/types';

interface AccordionItemHeadingProps extends HeadingAttributes {
    className?: string;
    'aria-level'?: number;
}

export const SPEC_ERROR = `AccordionItemButton may contain only one child element, which must be an instance of AccordionItemButton.

From the WAI-ARIA spec (https://www.w3.org/TR/wai-aria-practices-1.1/#accordion):

“The button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.”

`;

const Heading = React.forwardRef<HTMLHeadingElement, AccordionItemHeadingProps>(
    (
        {
            'aria-level': ariaLevel = 3,
            className = 'accordion__heading',
            ...props
        }: AccordionItemHeadingProps,
        ref,
    ) => {
        const headingTag = `h${ariaLevel}`;
        return React.createElement(headingTag, {
            className,
            ...props,
            ref,
            'data-accordion-component': 'AccordionItemHeading',
        });
    },
);
Heading.displayName = 'Heading';

export class AccordionItemHeading extends React.PureComponent<AccordionItemHeadingProps> {
    ref: HTMLHeadingElement | undefined;

    static VALIDATE(ref: HTMLHeadingElement | undefined): void | never {
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

    setRef = (ref: HTMLHeadingElement): void => {
        this.ref = ref;
    };

    componentDidUpdate(): void {
        AccordionItemHeading.VALIDATE(this.ref);
    }

    componentDidMount(): void {
        AccordionItemHeading.VALIDATE(this.ref);
    }

    render(): JSX.Element {
        return <Heading ref={this.setRef} {...this.props} />;
    }
}

const AccordionItemHeadingWrapper: React.FC<AccordionItemHeadingProps> = (
    props: AccordionItemHeadingProps,
): JSX.Element => {
    if (props.id) {
        assertValidHtmlId(props.id);
    }

    return <AccordionItemHeading {...props} />;
};

AccordionItemHeadingWrapper.displayName = DisplayName.AccordionItemHeading;

export default AccordionItemHeadingWrapper;
