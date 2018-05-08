// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';

import classNames from 'classnames';
import AccordionContainer from '../AccordionContainer/AccordionContainer';
import ItemContainer from '../ItemContainer/ItemContainer';

type AccordionItemProps = ElementProps<'div'> & {
    uuid: string | number,
    hideBodyClassName: ?string,
    disabled: ?boolean,
    expanded: ?boolean,
    accordionStore: AccordionContainer,
    itemStore: ItemContainer,
};

class AccordionItem extends Component<AccordionItemProps, *> {
    componentWillMount() {
        const { uuid, accordionStore, itemStore, disabled } = this.props;

        itemStore.setUuid(uuid);

        const currentItem = accordionStore.state.items.find(
            item => item.uuid === uuid,
        );
        if (currentItem)
            // eslint-disable-next-line no-console
            console.error(
                `AccordionItem error: One item already has the uuid "${uuid}". Uuid property must be unique. See: https://github.com/springload/react-accessible-accordion#accordionitem`,
            );

        accordionStore.addItem({
            uuid,
            expanded: this.props.expanded || false,
            disabled,
        });
    }

    componentWillUnmount() {
        this.props.accordionStore.removeItem(this.props.uuid);
    }

    // This is here so that the user can dynamically set the 'expanded' state using the 'expanded' prop.
    componentWillReceiveProps({
        uuid,
        expanded,
        accordionStore,
    }: AccordionItemProps) {
        if (expanded !== this.props.expanded) {
            accordionStore.setExpanded(uuid, expanded);
        }
    }

    render() {
        const {
            uuid,
            className,
            hideBodyClassName,
            accordionStore,
            disabled,
            expanded,
            itemStore,
            ...rest
        } = this.props;

        const currentItem = accordionStore.state.items.find(
            item => item.uuid === uuid,
        );

        if (!currentItem) {
            return null;
        }

        return (
            <div
                className={classNames(className, {
                    [hideBodyClassName]:
                        !currentItem.expanded && hideBodyClassName,
                })}
                {...rest}
            />
        );
    }
}

export default AccordionItem;
