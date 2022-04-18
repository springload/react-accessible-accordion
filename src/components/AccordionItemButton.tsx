import * as React from 'react';
import { InjectedButtonAttributes } from '../helpers/AccordionStore';
import {
    focusFirstSiblingOf,
    focusLastSiblingOf,
    focusNextSiblingOf,
    focusPreviousSiblingOf,
} from '../helpers/focus';
import keycodes from '../helpers/keycodes';
import { DivAttributes } from '../helpers/types';
import { assertValidHtmlId } from '../helpers/id';

import { Consumer as ItemConsumer, ItemContext } from './ItemContext';

type Props = DivAttributes & {
    toggleExpanded(): void;
};

const AccordionItemButton = ({
    toggleExpanded,
    className = 'accordion__button',
    ...rest
}: Props) => {
    const handleKeyPress = (evt: React.KeyboardEvent<HTMLDivElement>): void => {
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
        <div
            className={className}
            {...rest}
            role="button"
            tabIndex={0}
            onClick={toggleExpanded}
            onKeyDown={handleKeyPress}
            data-accordion-component="AccordionItemButton"
        />
    );
};

type WrapperProps = Pick<
    DivAttributes,
    Exclude<keyof DivAttributes, keyof InjectedButtonAttributes>
>;

const AccordionItemButtonWrapper: React.FC<WrapperProps> = (
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
