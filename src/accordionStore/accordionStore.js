// @flow

import { observable, action } from 'mobx';

export type Item = {
    itemkey: string | number,
    itemUuid: string | number,
    expanded: boolean,
    disabled: boolean,
};
export type Store = {
    items: Array<Item>,
    accordion: boolean,
    onChange: Function,
    addItem: Item => void,
    removeItem: ($PropertyType<Item, 'itemkey'>) => void,
    setExpanded: ($PropertyType<Item, 'itemkey'>, boolean) => void,
    activeItems: Array<$PropertyType<Item, 'itemkey'>>,
};

// eslint-disable-next-line import/prefer-default-export
export const createAccordionStore = ({
    accordion,
    onChange,
}: {
    accordion: boolean,
    onChange: Function,
}): Store => {
    const store: Store = observable({
        items: [],
        accordion,
        onChange,
        addItem: action.bound(function addItem(newItem) {
            if (this.accordion && newItem.expanded) {
                // If this is a true accordion and the new item is expanded, then the others must be closed.
                this.items = [
                    ...this.items.map(item => ({ ...item, expanded: false })),
                    newItem,
                ];
            } else {
                this.items = [...this.items, newItem];
            }
        }),
        removeItem: action.bound(function removeItem(key) {
            this.items = this.items.filter(item => item.itemkey !== key);
        }),
        setExpanded: action.bound(function setExpanded(
            key: string | number,
            expanded: boolean,
        ) {
            this.items = this.items.map(item => {
                if (item.itemkey === key) {
                    return {
                        ...item,
                        expanded,
                    };
                } else if (this.accordion && expanded) {
                    // If this is an accordion, we might need to collapse the other expanded item.
                    return {
                        ...item,
                        expanded: false,
                    };
                }
                return item;
            });
        }),
        activeItems: [],
    });
    return store;
};
