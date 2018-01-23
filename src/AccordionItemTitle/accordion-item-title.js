// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';

type AccordionItemTitleProps = {
    children: Node,
    className: string,
    hideBodyClassName: string,
    accordionStore: {
        activeItems: Array<string | number>,
        accordion: boolean,
        onChange: Function,
    },
    accordionItemStore: {
        itemKey: string | number,
        itemUuid: string,
        expanded: boolean,
    },
};

type AccordionItemTitleState = {};

class AccordionItemTitle extends Component<
    AccordionItemTitleProps,
    AccordionItemTitleState,
> {
    static accordionElementName = 'AccordionItemTitle';

    static defaultProps = {
        className: 'accordion__title',
        hideBodyClassName: '',
    };

    handleClick() {
        const { itemKey } = this.props.accordionItemStore;
        const { activeItems, accordion, onChange } = this.props.accordionStore;
        let newActiveItems = activeItems;
        if (accordion) {
            newActiveItems = newActiveItems[0] === itemKey ? [] : [itemKey];
        } else {
            newActiveItems = [...newActiveItems];
            const index = newActiveItems.indexOf(itemKey);
            const isActive = index > -1;
            if (isActive) {
                // remove active state
                newActiveItems.splice(index, 1);
            } else {
                newActiveItems.push(itemKey);
            }
        }
        this.props.accordionStore.activeItems = newActiveItems;

        onChange(accordion ? newActiveItems[0] : newActiveItems);
    }

    handleClick = this.handleClick.bind(this);

    handleKeyPress(evt: SyntheticInputEvent<HTMLButtonElement>) {
        if (evt.charCode === 13 || evt.charCode === 32) {
            this.handleClick();
        }
    }

    handleKeyPress = this.handleKeyPress.bind(this);

    render() {
        const { accordion } = this.props.accordionStore;
        const { itemUuid, expanded } = this.props.accordionItemStore;
        const { children, className, hideBodyClassName } = this.props;

        const id = `accordion__title-${itemUuid}`;
        const ariaControls = `accordion__body-${itemUuid}`;
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
                    onClick={this.handleClick}
                    role={role}
                    tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
                    onKeyPress={this.handleKeyPress}
                >
                    {children}
                </div>
            );
        }
        return (
            <div
                id={id}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={titleClassName}
                onClick={this.handleClick}
                role={role}
                tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
                onKeyPress={this.handleKeyPress}
            >
                {children}
            </div>
        );
    }
}

export default inject('accordionStore', 'accordionItemStore')(
    observer(AccordionItemTitle),
);
