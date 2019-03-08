import * as React from 'react';
import {
    focusFirstSiblingOf,
    focusLastSiblingOf,
    focusNextSiblingOf,
    focusPreviousSiblingOf,
} from '../helpers/focus';
import keycodes from '../helpers/keycodes';

import { DivAttributes } from '../helpers/types';
import { Consumer as ItemConsumer, ItemContext } from './ItemContext';

type Props = Pick<DivAttributes, Exclude<keyof DivAttributes, 'role'>> & {
    toggleExpanded(): void;
};

const defaultProps = {
    className: 'accordion__heading',
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
        const { toggleExpanded, ...rest } = this.props;

        return (
            <div
                // tslint:disable-next-line react-a11y-event-has-role
                onClick={toggleExpanded}
                data-accordion-component="AccordionItemHeading"
                onKeyDown={this.handleKeyPress}
                {...rest}
            />
        );
    }
}

type WrapperProps = Pick<Props, Exclude<keyof Props, 'toggleExpanded'>>;

const Wrapper: React.SFC<WrapperProps> = (props: WrapperProps): JSX.Element => (
    <ItemConsumer>
        {(itemContext: ItemContext): JSX.Element => {
            const { toggleExpanded, headingAttributes } = itemContext;

            return (
                <AccordionItemHeading
                    {...props}
                    toggleExpanded={toggleExpanded}
                    {...headingAttributes}
                />
            );
        }}
    </ItemConsumer>
);

export default Wrapper;
