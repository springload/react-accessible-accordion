import { default as classnames } from 'classnames';
import * as React from 'react';
import {
    focusFirstSiblingOf,
    focusLastSiblingOf,
    focusNextSiblingOf,
    focusPreviousSiblingOf,
} from '../helpers/focus';
import keycodes from '../helpers/keycodes';

import { DivAttributes } from '../helpers/types';
import {
    Consumer as ItemConsumer,
    ItemContext,
} from '../ItemContext/ItemContext';

type Props = Pick<DivAttributes, Exclude<keyof DivAttributes, 'role'>> & {
    expandedClassName: string;
    expanded: boolean;
    toggleExpanded(): void;
};

export class AccordionItemHeading extends React.PureComponent<Props> {
    handleKeyPress = (evt: React.KeyboardEvent<HTMLDivElement>): void => {
        const keyCode = evt.which.toString();

        if (keyCode === keycodes.ENTER || keyCode === keycodes.SPACE) {
            evt.preventDefault();
            this.props.toggleExpanded();
        }

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
            className,
            expandedClassName,
            expanded,
            toggleExpanded,
            ...rest
        } = this.props;

        const headingClassName = classnames(className, {
            [expandedClassName]: expandedClassName && expanded,
        });

        return (
            <div
                // tslint:disable-next-line react-a11y-event-has-role
                className={headingClassName}
                onClick={toggleExpanded}
                data-accordion-component="AccordionItemHeading"
                onKeyDown={this.handleKeyPress}
                {...rest}
            />
        );
    }
}

type WrapperProps = Pick<
    Props,
    Exclude<keyof Props, 'toggleExpanded' | 'expanded'>
>;

const Wrapper: React.SFC<WrapperProps> = (props: WrapperProps): JSX.Element => (
    <ItemConsumer>
        {(itemContext: ItemContext): JSX.Element => {
            const { expanded, toggleExpanded, headingAttributes } = itemContext;

            return (
                <AccordionItemHeading
                    {...props}
                    expanded={expanded}
                    toggleExpanded={toggleExpanded}
                    {...headingAttributes}
                />
            );
        }}
    </ItemConsumer>
);

export default Wrapper;
