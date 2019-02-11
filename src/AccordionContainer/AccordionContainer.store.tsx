// tslint:disable:max-classes-per-file

import * as React from 'react';
import { UUID } from '../ItemContainer/ItemContainer';

export type Item = {
    uuid: UUID;
    expanded: boolean;
};

export default class AccordionContainerStore {
    public readonly items: Item[];
    public readonly allowMultipleExpanded: boolean;
    public readonly allowZeroExpanded: boolean;

    constructor({
        items = [],
        allowMultipleExpanded = false,
        allowZeroExpanded = false,
    }: {
        items?: Item[];
        allowMultipleExpanded?: boolean;
        allowZeroExpanded?: boolean;
    }) {
        this.items = items;
        this.allowMultipleExpanded = allowMultipleExpanded;
        this.allowZeroExpanded = allowZeroExpanded;
    }

    public readonly addItem = (newItem: Item): AccordionContainerStore => {
        if (this.items.some((item: Item) => item.uuid === newItem.uuid)) {
            // tslint:disable-next-line:no-console
            console.error(
                `AccordionItem error: One item already has the uuid "${
                    newItem.uuid
                }". Uuid property must be unique. See: https://github.com/springload/react-accessible-accordion#accordionitem`,
            );
        }
        if (!this.allowMultipleExpanded && newItem.expanded) {
            return this.augment({
                items: [
                    ...this.items.map((item: Item) => ({
                        ...item,
                        expanded: false,
                    })),
                    newItem,
                ],
            });
        }

        return this.augment({
            ...this,
            items: [...this.items, newItem],
        });
    };

    public readonly removeItem = (key: UUID): AccordionContainerStore => {
        return this.augment({
            items: this.items.filter((item: Item) => item.uuid !== key),
        });
    };

    public readonly setExpanded = (
        key: UUID,
        expanded: boolean,
    ): AccordionContainerStore => {
        if (this.isItemDisabled(key)) {
            return this;
        }

        return this.augment({
            items: this.items.map((item: Item) => {
                if (item.uuid === key) {
                    return {
                        ...item,
                        expanded,
                    };
                }
                if (!this.allowMultipleExpanded && expanded) {
                    // If this is an accordion that doesn't allow multiple expansions, we might need to collapse the other expanded item.
                    return {
                        ...item,
                        expanded: false,
                    };
                }

                return item;
            }),
        });
    };

    /*
     * From the spec:
     *
     * “If the accordion panel associated with an accordion header is visible,
     * and if the accordion does not permit the panel to be collapsed, the
     * header button element has aria-disabled set to true.”
     */
    public readonly isItemDisabled = (key: UUID): boolean => {
        const item = this.items.find(({ uuid }: Item): boolean => uuid === key);
        const expandedItems = this.items.filter(
            ({ expanded }: Item) => expanded,
        );

        return (
            item.expanded &&
            !this.allowZeroExpanded &&
            expandedItems.length === 1
        );
    };

    private readonly augment = (args: {
        items?: Item[];
        allowMultipleExpanded?: boolean;
        allowZeroExpanded?: boolean;
    }): AccordionContainerStore => {
        return new AccordionContainerStore({
            items: this.items,
            allowMultipleExpanded: this.allowMultipleExpanded,
            allowZeroExpanded: this.allowZeroExpanded,
            ...args,
        });
    };
}
