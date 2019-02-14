// tslint:disable:max-classes-per-file

import * as React from 'react';
import { UUID } from '../ItemContext/ItemContext';

export default class AccordionStore {
    public readonly expanded: UUID[];
    public readonly allowMultipleExpanded: boolean;
    public readonly allowZeroExpanded: boolean;

    constructor({
        expanded = [],
        allowMultipleExpanded = false,
        allowZeroExpanded = false,
    }: {
        expanded?: UUID[];
        allowMultipleExpanded?: boolean;
        allowZeroExpanded?: boolean;
    }) {
        this.expanded = expanded;
        this.allowMultipleExpanded = allowMultipleExpanded;
        this.allowZeroExpanded = allowZeroExpanded;
    }

    public readonly setExpanded = (
        uuid: UUID,
        isExpanded: boolean,
    ): AccordionStore => {
        if (this.isItemDisabled(uuid)) {
            return this;
        }

        if (isExpanded) {
            return this.augment({
                expanded: this.allowMultipleExpanded
                    ? [...this.expanded, uuid]
                    : [uuid],
            });
        } else {
            return this.augment({
                expanded: this.expanded.filter(
                    (expandedUuid: UUID): boolean => expandedUuid !== uuid,
                ),
            });
        }
    };

    /*
     * From the spec:
     *
     * “If the accordion panel associated with an accordion header is visible,
     * and if the accordion does not permit the panel to be collapsed, the
     * header button element has aria-disabled set to true.”
     */
    public readonly isItemDisabled = (uuid: UUID): boolean => {
        const isExpanded = this.isItemExpanded(uuid);
        const isOnlyOneExpanded = this.expanded.length === 1;

        return Boolean(
            isExpanded && !this.allowZeroExpanded && isOnlyOneExpanded,
        );
    };

    public readonly isItemExpanded = (uuid: UUID): boolean => {
        return (
            this.expanded.findIndex(
                (expandedUuid: UUID) => expandedUuid === uuid,
            ) !== -1
        );
    };

    private readonly augment = (args: {
        expanded?: UUID[];
        allowMultipleExpanded?: boolean;
        allowZeroExpanded?: boolean;
    }): AccordionStore => {
        return new AccordionStore({
            expanded: this.expanded,
            allowMultipleExpanded: this.allowMultipleExpanded,
            allowZeroExpanded: this.allowZeroExpanded,
            ...args,
        });
    };
}
