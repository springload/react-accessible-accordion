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
            expect(container.addItem).toBeDefined();
            expect(container.removeItem).toBeDefined();
            expect(container.setExpanded).toBeDefined();
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

        it('respects the `items` property', () => {
            const items = [{ uuid: UUIDS.FOO, expanded: false }];

            const container = new AccordionStore({
                allowZeroExpanded: true,
                items,
            });

            expect(container.items).toEqual(items);
        });
    });

    describe('addItem', () => {
        it('adds an item', () => {
            const item = { uuid: UUIDS.FOO, expanded: false };

            const container = new AccordionStore({}).addItem(item);

            expect(container.items).toEqual([item]);
        });

        it('closes expanded items', () => {
            const container = new AccordionStore({})
                .addItem({ uuid: UUIDS.FOO, expanded: true })
                .addItem({ uuid: UUIDS.BAR, expanded: true });

            expect(container.items).toEqual([
                expect.objectContaining({ expanded: false }),
                expect.objectContaining({ expanded: true }),
            ]);
        });

        it('doesnt close expanded items when allowMultipleExpanded', () => {
            const container = new AccordionStore({
                allowMultipleExpanded: true,
            })
                .addItem({ uuid: UUIDS.FOO, expanded: true })
                .addItem({ uuid: UUIDS.BAR, expanded: true });

            expect(container.items).toEqual([
                expect.objectContaining({ expanded: true }),
                expect.objectContaining({ expanded: true }),
            ]);
        });

        it('raises console error in case of duplicate uuid', () => {
            const uuid = 'uniqueCustomID';
            jest.spyOn(global.console, 'error');

            new AccordionStore({})
                .addItem({
                    uuid,
                    expanded: false,
                })
                .addItem({
                    uuid,
                    expanded: false,
                });

            // tslint:disable-next-line:no-console
            expect(console.error).toBeCalled();
        });
    });

    describe('removeItem', () => {
        it('can remove an item', () => {
            const item = { uuid: UUIDS.FOO, expanded: false };

            const container = new AccordionStore({
                items: [item],
            }).removeItem(item.uuid);

            expect(container.items).toEqual([]);
        });
    });

    describe('setExpanded', () => {
        describe('expanding', () => {
            it('expands an item', () => {
                const container = new AccordionStore({})
                    .addItem({ uuid: UUIDS.FOO, expanded: false })
                    .setExpanded(UUIDS.FOO, true);

                expect(container.items).toEqual([
                    expect.objectContaining({ expanded: true }),
                ]);
            });

            it('collapses the currently expanded items', () => {
                const container = new AccordionStore({})
                    .addItem({ uuid: UUIDS.FOO, expanded: false })
                    .addItem({ uuid: UUIDS.BAR, expanded: true })
                    .setExpanded(UUIDS.FOO, true);

                expect(container.items).toEqual([
                    expect.objectContaining({ expanded: true }),
                    expect.objectContaining({ expanded: false }),
                ]);
            });
        });

        describe('collapsing', () => {
            it('doesnt collapse the only expanded item', () => {
                const container = new AccordionStore({})
                    .addItem({ uuid: UUIDS.FOO, expanded: true })
                    .setExpanded(UUIDS.FOO, false);

                expect(container.items).toEqual([
                    expect.objectContaining({ expanded: true }),
                ]);
            });

            it('collapses the only expanded item when allowZeroExpanded', () => {
                const container = new AccordionStore({
                    allowZeroExpanded: true,
                })
                    .addItem({ uuid: UUIDS.FOO, expanded: true })
                    .setExpanded(UUIDS.FOO, false);

                expect(container.items).toEqual([
                    expect.objectContaining({ expanded: false }),
                ]);
            });
        });
    });

    describe('isDisabled', () => {
        describe('expanded item', () => {
            it('is disabled if alone', () => {
                const container = new AccordionStore({}).addItem({
                    uuid: UUIDS.FOO,
                    expanded: true,
                });

                expect(container.isItemDisabled(UUIDS.FOO)).toEqual(true);
            });

            it('is not disabled if multiple expanded', () => {
                const container = new AccordionStore({
                    allowMultipleExpanded: true,
                })
                    .addItem({
                        uuid: UUIDS.FOO,
                        expanded: true,
                    })
                    .addItem({
                        uuid: UUIDS.BAR,
                        expanded: true,
                    });

                expect(container.isItemDisabled(UUIDS.FOO)).toEqual(false);
            });

            it('is not disabled if allowZeroExpanded', () => {
                const container = new AccordionStore({
                    allowZeroExpanded: true,
                }).addItem({
                    uuid: UUIDS.FOO,
                    expanded: true,
                });

                expect(container.isItemDisabled(UUIDS.FOO)).toEqual(false);
            });
        });

        describe('collapsed item', () => {
            it('is not disabled', () => {
                const container = new AccordionStore({}).addItem({
                    uuid: UUIDS.FOO,
                    expanded: false,
                });

                expect(container.isItemDisabled(UUIDS.FOO)).toEqual(false);
            });
        });
    });
});
