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
        items: Array<Object>,
        accordion: boolean,
        onChange: Function,
        setExpanded: (string | number, boolean) => void,
    },
    itemkey: string | number,
};

type AccordionItemTitleState = {};

export class AccordionItemTitle extends Component<
    AccordionItemTitleProps,
    AccordionItemTitleState,
> {
    static accordionElementName = 'AccordionItemTitle';

    static defaultProps = {
        className: 'accordion__title',
        hideBodyClassName: '',
    };

    handleClick = () => {
        const { itemkey, accordionStore } = this.props;
        const { accordion, onChange, items } = accordionStore;
        const foundItem = items.find(item => item.itemkey === itemkey);
        if (!foundItem) return;

        if (accordion) {
            const newValue = Boolean(!foundItem.expanded);
            items.forEach(item => {
                this.props.accordionStore.setExpanded(item.itemkey, false);
                if (item.itemkey === foundItem.itemkey) {
                    this.props.accordionStore.setExpanded(
                        foundItem.itemkey,
                        newValue,
                    );
                }
            });

            onChange(foundItem.itemkey);
        } else {
            this.props.accordionStore.setExpanded(
                foundItem.itemkey,
                !foundItem.expanded,
            );
            onChange(
                this.props.accordionStore.items
                    .filter(item => item.expanded)
                    .map(item => item.itemkey),
            );
        }
    };

    handleKeyPress = (evt: SyntheticInputEvent<HTMLButtonElement>) => {
        if (evt.charCode === 13 || evt.charCode === 32) {
            this.handleClick();
        }
    };

    render() {
        const { items, accordion } = this.props.accordionStore;
        const { itemkey, children, className, hideBodyClassName } = this.props;
        const foundItem = items.find(item => item.itemkey === itemkey);
        if (!foundItem) return null;

        const { itemUuid, expanded } = foundItem;

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

export default inject('accordionStore', 'itemkey')(
    observer(AccordionItemTitle),
);
