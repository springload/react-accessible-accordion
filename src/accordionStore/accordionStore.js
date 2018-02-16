// @flow

import { observable, action } from 'mobx';

export type Item = {
    itemkey: string | number,
    itemUuid: number,
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
        addItem: action.bound(function addItem(item) {
            this.items = [...this.items, item];
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
                }
                return item;
            });
        }),
    });
    return store;
};
