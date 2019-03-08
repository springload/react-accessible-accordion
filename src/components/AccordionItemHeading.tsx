import * as React from 'react';
import {
    InjectedButtonAttributes,
    InjectedHeadingAttributes,
} from '../helpers/AccordionStore';
import {
    focusFirstSiblingOf,
    focusLastSiblingOf,
    focusNextSiblingOf,
    focusPreviousSiblingOf,
} from '../helpers/focus';
import keycodes from '../helpers/keycodes';

import { Consumer as ItemConsumer, ItemContext } from './ItemContext';

type Props = {
    children?: React.ReactNode;
    headingAttributes: InjectedHeadingAttributes;
    buttonAttributes: InjectedButtonAttributes;
    headingClassName?: string;
    buttonClassName?: string;
    toggleExpanded(): void;
};

const defaultProps = {
    headingClassName: 'accordion__heading',
    buttonClassName: 'accordion__button',
};

export class AccordionItemHeading extends React.PureComponent<Props> {
    static defaultProps: typeof defaultProps = defaultProps;

    handleKeyPress = (evt: React.KeyboardEvent<HTMLDivElement>): void => {
        const keyCode = evt.which.toString();

        if (keyCode === keycodes.ENTER || keyCode === keycodes.SPACE) {
            evt.preventDefault();
            this.props.toggleExpanded();
        }

        /* The following block is ignored from test coverage because at time
         * time of writing Jest/react-testing-library can not assert 'focus'
         * functionality.
         */
        // istanbul ignore next
        if (evt.target instanceof HTMLElement) {
            switch (keyCode) {
                case keycodes.HOME: {
                    evt.preventDefault();
                    focusFirstSiblingOf(evt.target);
                    break;
                }
                case keycodes.END: {
                    evt.preventDefault();
                    focusLastSiblingOf(evt.target);
                    break;
                }
                case keycodes.LEFT:
                case keycodes.UP: {
                    evt.preventDefault();
                    focusPreviousSiblingOf(evt.target);
                    break;
                }
                case keycodes.RIGHT:
                case keycodes.DOWN: {
                    evt.preventDefault();
                    focusNextSiblingOf(evt.target);
                    break;
                }
                default: {
                    //
                }
            }
        }
    };

    render(): JSX.Element {
        const {
            toggleExpanded,
            headingAttributes,
            buttonAttributes,
            headingClassName,
            buttonClassName,
            children,
        } = this.props;

        return (
            <div
                className={headingClassName}
                data-accordion-component="AccordionItemHeading"
                {...headingAttributes}
            >
                <div
                    // tslint:disable-next-line react-a11y-event-has-role
                    onClick={toggleExpanded}
                    onKeyDown={this.handleKeyPress}
                    className={buttonClassName}
                    data-accordion-component="AccordionItemButton"
                    {...buttonAttributes}
                >
                    {children}
                </div>
            </div>
        );
    }
}

type WrapperProps = {
    buttonClassName?: string;
    headingClassName?: string;
    children?: React.ReactNode;
};

const Wrapper: React.SFC<WrapperProps> = ({
    headingClassName,
    buttonClassName,
    children,
}: WrapperProps): JSX.Element => (
    <ItemConsumer>
        {(itemContext: ItemContext): JSX.Element => {
            const {
                toggleExpanded,
                headingAttributes,
                buttonAttributes,
            } = itemContext;

            return (
                <AccordionItemHeading
                    toggleExpanded={toggleExpanded}
                    headingClassName={headingClassName}
                    buttonClassName={buttonClassName}
                    headingAttributes={headingAttributes}
                    buttonAttributes={buttonAttributes}
                >
                    {children}
                </AccordionItemHeading>
            );
        }}
    </ItemConsumer>
);

export default Wrapper;
