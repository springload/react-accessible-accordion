// @flow

import React, { Component, type ElementProps } from 'react';
import classNames from 'classnames';

type AccordionItemTitleProps = ElementProps<'div'> & {
    hideBodyClassName: string,
    uuid: string | number,
};

type AccordionItemTitleState = {};

class AccordionItemTitle extends Component<
    AccordionItemTitleProps,
    AccordionItemTitleState,
> {
    static accordionElementName = 'AccordionItemTitle';

    handleClick = () => {
        const { uuid, accordionStore } = this.props;
        const { state } = accordionStore;
        const { accordion, onChange, items } = state;
        const foundItem = items.find(item => item.uuid === uuid);

        accordionStore.setExpanded(foundItem.uuid, !foundItem.expanded);

        if (accordion) {
            onChange(foundItem.uuid);
        } else {
            onChange(
                accordionStore.state.items
                    .filter(item => item.expanded)
                    .map(item => item.uuid),
            );
        }
    };

    handleKeyPress = (evt: SyntheticInputEvent<HTMLButtonElement>) => {
        if (evt.charCode === 13 || evt.charCode === 32) {
            this.handleClick();
        }
    };

    render() {
        const { state: { items, accordion } } = this.props.accordionStore;
        const {
            uuid,
            className,
            hideBodyClassName,
            accordionStore,
            ...rest
        } = this.props;
        const foundItem = items.find(item => item.uuid === uuid);
        if (!foundItem) return null;

        const { expanded, disabled } = foundItem;

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
