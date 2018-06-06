// @flow

import React, { Component, type ElementProps } from 'react';
import classNames from 'classnames';
import { type Item } from '../AccordionContainer/AccordionContainer';

type AccordionItemTitleProps = ElementProps<'div'> & {
    hideBodyClassName: string,
    item: Item,
};

type AccordionItemTitleState = {};

class AccordionItemTitle extends Component<
    AccordionItemTitleProps,
    AccordionItemTitleState,
> {
    static accordionElementName = 'AccordionItemTitle';

    handleClick = () => {
        const { item, accordionStore } = this.props;

        accordionStore.setExpanded(item.uuid, !item.expanded);
    };

    handleKeyPress = (evt: SyntheticKeyboardEvent<HTMLButtonElement>) => {
        if (evt.charCode === 13 || evt.charCode === 32) {
            evt.preventDefault();
            this.handleClick();
        }
    };

    render() {
        const {
            state: { accordion },
        } = this.props.accordionStore;
        const {
            className,
            hideBodyClassName,
            accordionStore,
            item,
            ...rest
        } = this.props;
        const { uuid, expanded, disabled } = item;

        const id = `accordion__title-${uuid}`;
        const ariaControls = `accordion__body-${uuid}`;
        const role = accordion ? 'tab' : 'button';
        const titleClassName = classNames(className, {
            [hideBodyClassName]: hideBodyClassName && !expanded,
        });

        if (role === 'tab') {
            return (
                <div
                    id={id}
                    aria-selected={expanded}
                    aria-controls={ariaControls}
                    className={titleClassName}
                    onClick={disabled ? undefined : this.handleClick}
                    role={role}
                    tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
                    onKeyPress={this.handleKeyPress}
                    disabled={disabled}
                    {...rest}
                />
            );
        }
        return (
            <div
                id={id}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={titleClassName}
                onClick={disabled ? undefined : this.handleClick}
                role={role}
                tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
                onKeyPress={this.handleKeyPress}
                disabled={disabled}
                {...rest}
            />
        );
    }
}

export default AccordionItemTitle;
