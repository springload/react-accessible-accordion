import * as React from 'react';
import { InjectedButtonAttributes } from '../helpers/AccordionStore';
import {
    focusFirstSiblingOf,
    focusLastSiblingOf,
    focusNextSiblingOf,
    focusPreviousSiblingOf,
} from '../helpers/focus';
import keycodes from '../helpers/keycodes';
import { assertValidHtmlId } from '../helpers/id';
import { ButtonAttributes } from '../helpers/types';

import { Consumer as ItemConsumer, ItemContext } from './ItemContext';

type Props = ButtonAttributes & {
    toggleExpanded(): void;
};

const AccordionItemButton = ({
    toggleExpanded,
    className = 'accordion__button',
    ...rest
}: Props) => {
    const handleKeyPress = (
        evt: React.KeyboardEvent<HTMLButtonElement>,
    ): void => {
        const keyCode = evt.key;

        if (
            keyCode === keycodes.ENTER ||
            keyCode === keycodes.SPACE ||
            keyCode === keycodes.SPACE_DEPRECATED
        ) {
            evt.preventDefault();
            toggleExpanded();
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

    if (rest.id) {
        assertValidHtmlId(rest.id);
    }

    return (
        <button
            className={className}
            {...rest}
            onClick={toggleExpanded}
            onKeyDown={handleKeyPress}
            data-accordion-component="AccordionItemButton"
        />
    );
};

type WrapperProps = Pick<
    ButtonAttributes,
    Exclude<keyof ButtonAttributes, keyof InjectedButtonAttributes>
>;

const AccordionItemButtonWrapper: React.SFC<WrapperProps> = (
    props: WrapperProps,
): JSX.Element => (
    <ItemConsumer>
        {(itemContext: ItemContext): JSX.Element => {
            const { toggleExpanded, buttonAttributes } = itemContext;

            return (
                <AccordionItemButton
                    toggleExpanded={toggleExpanded}
                    {...props}
                    {...buttonAttributes}
                />
            );
        }}
    </ItemConsumer>
);

export default AccordionItemButtonWrapper;
