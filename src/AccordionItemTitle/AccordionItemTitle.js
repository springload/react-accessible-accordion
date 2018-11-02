// @flow

import React, { Component, createRef, type ElementProps } from 'react';
import classNames from 'classnames';
import { type UUID } from '../ItemContainer/ItemContainer';

type AccordionItemTitleProps = ElementProps<'div'> & {
    hideBodyClassName: string,
    expanded: boolean,
    focus: boolean,
    uuid: UUID,
    disabled: boolean,
    accordion: boolean,
    setExpanded: (UUID, boolean) => any,
    setFocusToHead: () => any,
    setFocusToTail: () => any,
    setFocusToPrevious: UUID => any,
    setFocusToNext: UUID => any,
};

type AccordionItemTitleState = {};

class AccordionItemTitle extends Component<
    AccordionItemTitleProps,
    AccordionItemTitleState,
> {
    static accordionElementName = 'AccordionItemTitle';

    focusRef = createRef();

    componentDidUpdate() {
        if (this.props.focus) {
            // eslint-disable-next-line flowtype-errors/show-errors
            this.focusRef.current.focus();
        }
    }

    handleClick = () => {
        const { uuid, expanded, setExpanded } = this.props;

        setExpanded(uuid, !expanded);
    };

    handleKeyPress = (evt: SyntheticKeyboardEvent<HTMLButtonElement>) => {
        if (evt.charCode === 13 || evt.charCode === 32) {
            evt.preventDefault();
            this.handleClick();
        }
    };

    handleKeyDown = (evt: SyntheticKeyboardEvent<HTMLButtonElement>) => {
        const {
            uuid,
            setFocusToHead,
            setFocusToTail,
            setFocusToPrevious,
            setFocusToNext,
        } = this.props;

        switch (evt.which) {
            case 35:
                evt.preventDefault();
                setFocusToTail();
                break;
            case 36:
                evt.preventDefault();
                setFocusToHead();
                break;
            case 38:
                evt.preventDefault();
                setFocusToPrevious(uuid);
                break;
            case 40:
                evt.preventDefault();
                setFocusToNext(uuid);
                break;
        }
    };

    handleBlur = () => {
        this.props.removeFocus(this.props.uuid);
    };

    render() {
        const {
            className,
            hideBodyClassName,
            item,
            accordion,
            setExpanded,
            setFocusToHead,
            setFocusToTail,
            setFocusToPrevious,
            setFocusToNext,
            removeFocus,
            expanded,
            focus,
            uuid,
            disabled,
            ...rest
        } = this.props;

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
                    ref={this.focusRef}
                    aria-selected={expanded}
                    aria-controls={ariaControls}
                    className={titleClassName}
                    onClick={disabled ? undefined : this.handleClick}
                    role={role}
                    tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
                    onKeyPress={this.handleKeyPress}
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleBlur}
                    disabled={disabled}
                    {...rest}
                />
            );
        }
        return (
            <div
                id={id}
                ref={this.focusRef}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={titleClassName}
                onClick={disabled ? undefined : this.handleClick}
                role={role}
                tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
                onKeyPress={this.handleKeyPress}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleBlur}
                disabled={disabled}
                {...rest}
            />
        );
    }
}

export default AccordionItemTitle;
