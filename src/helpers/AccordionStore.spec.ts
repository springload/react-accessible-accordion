import AccordionStore from './AccordionStore';

enum UUIDS {
    FOO = 'FOO',
    BAR = 'BAR',
}

describe('Accordion', () => {
    describe('constructor', () => {
        it('correctly instantiates with all expected methods', () => {
            const container = new AccordionStore({});
            expect(container).toBeDefined();
            expect(container.allowMultipleExpanded).toBeDefined();
            expect(container.allowZeroExpanded).toBeDefined();
            expect(container.toggleExpanded).toBeDefined();
            expect(container.isItemExpanded).toBeDefined();
            expect(container.isItemDisabled).toBeDefined();
        });

        it('respects the `allowMultipleExpanded` property', () => {
            const container = new AccordionStore({
                allowMultipleExpanded: true,
            });

            expect(container.allowMultipleExpanded).toEqual(true);
        });

        it('respects the `allowZeroExpanded` property', () => {
            const container = new AccordionStore({
                allowZeroExpanded: true,
            });

            expect(container.allowZeroExpanded).toEqual(true);
        });

        it('respects the `expanded` property', () => {
            const container = new AccordionStore({
                allowZeroExpanded: true,
                expanded: ['foo'],
            });

            expect(container.expanded).toEqual(['foo']);
        });
    });

    describe('toggleExpanded', () => {
        describe('expanding', () => {
            it('expands an item', () => {
                const container = new AccordionStore({}).toggleExpanded(
                    UUIDS.FOO,
                );

                expect(container.expanded).toEqual([UUIDS.FOO]);
            });

            it('collapses the currently expanded items, if allowMultipleExpanded is set to false', () => {
                const container = new AccordionStore({
                    expanded: [UUIDS.BAR],
                    allowMultipleExpanded: false,
                }).toggleExpanded(UUIDS.FOO);

                expect(container.expanded).toEqual([UUIDS.FOO]);
            });
        });

        describe('collapsing', () => {
            it('collapses the only expanded item', () => {
                const container = new AccordionStore({
                    expanded: [UUIDS.FOO],
                }).toggleExpanded(UUIDS.FOO);

                expect(container.expanded).toEqual([]);
            });

            it('does not collapse the only expanded item when allowZeroExpanded is false', () => {
                const container = new AccordionStore({
                    allowZeroExpanded: false,
                    expanded: [UUIDS.FOO],
                }).toggleExpanded(UUIDS.FOO);

                expect(container.expanded).toEqual([UUIDS.FOO]);
            });
        });
    });

    describe('isDisabled', () => {
        describe('expanded item', () => {
            it('is disabled if alone, if allowZeroExpanded is set to false', () => {
                const container = new AccordionStore({
                    allowZeroExpanded: false,
                    expanded: [UUIDS.FOO],
                });

                expect(container.isItemDisabled(UUIDS.FOO)).toEqual(true);
            });
        });

        describe('collapsed item', () => {
            it('is not disabled', () => {
                const container = new AccordionStore({});

                expect(container.isItemDisabled(UUIDS.FOO)).toEqual(false);
            });
        });
    });
});
