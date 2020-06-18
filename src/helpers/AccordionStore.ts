import { UUID } from '../components/ItemContext';

export interface InjectedPanelAttributes {
    role: string | undefined;
    'aria-hidden': boolean | undefined;
    'aria-labelledby': string;
    id: string;
    'data-hidden': boolean | undefined;
}

export interface InjectedHeadingAttributes {
    role: string;
}

export interface InjectedButtonAttributes {
    id: string;
    'aria-controls': string;
    'aria-expanded': boolean;
    'aria-disabled': boolean;
    role: string;
    tabIndex: number;
}

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

    public readonly toggleExpanded = (uuid: UUID): AccordionStore => {
        if (this.isItemDisabled(uuid)) {
            return this;
        }
        const isExpanded = this.isItemExpanded(uuid);

        if (!isExpanded) {
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
        return this.expanded.indexOf(uuid) !== -1;
    };

    public readonly getPanelAttributes = (
        uuid: UUID,
    ): InjectedPanelAttributes => {
        const expanded = this.isItemExpanded(uuid);

        return {
            role: this.allowMultipleExpanded ? undefined : 'region',
            'aria-hidden': this.allowMultipleExpanded ? !expanded : undefined,
            'aria-labelledby': this.getButtonId(uuid),
            id: this.getPanelId(uuid),
            'data-hidden': expanded ? undefined : true,
        };
    };

    public readonly getHeadingAttributes = (
        uuid: UUID,
    ): InjectedHeadingAttributes => {
        return {
            role: 'heading',
        };
    };

    public readonly getButtonAttributes = (
        uuid: UUID,
    ): InjectedButtonAttributes => {
        const expanded = this.isItemExpanded(uuid);
        const disabled = this.isItemDisabled(uuid);

        return {
            id: this.getButtonId(uuid),
            'aria-disabled': disabled,
            'aria-expanded': expanded,
            'aria-controls': this.getPanelId(uuid),
            role: 'button',
            tabIndex: 0,
        };
    };

    private readonly getPanelId = (uuid: UUID): string =>
        `accordion__panel-${uuid}`;

    private readonly getButtonId = (uuid: UUID): string =>
        `accordion__heading-${uuid}`;

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
