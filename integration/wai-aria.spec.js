import path from 'path';
import puppeteer from 'puppeteer';

describe('WAI ARIA Spec', () => {
    let browser;

    afterEach(async () => {
        if (browser && browser.close) {
            await browser.close();
        }
    });

    async function setup() {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
            ],
        });

        const page = await browser.newPage();

        await page.goto(`file://${path.resolve(__dirname, 'dist/index.html')}`);

        // Seems like the browser is a bit slower on CI, and we're trying to
        // select headings before they're registered in the 'store'.
        await page.waitForSelector(
            '[data-accordion-component="AccordionItemHeading"]',
        );

        const headingsHandles = await page.$$(
            '#classic-accordion [data-accordion-component="AccordionItemHeading"]',
        );

        const buttonsHandles = await page.$$(
            '#classic-accordion [data-accordion-component="AccordionItemButton"]',
        );

        const itemsHandles = await page.$$(
            '#classic-accordion [data-accordion-component="AccordionItem"]',
        );

        return { browser, page, headingsHandles, buttonsHandles, itemsHandles };
    }

    describe('Canary tests', () => {
        it('Loads the Cypress Testing Sandbox', async () => {
            const { browser, page } = await setup();
            const title = await page.evaluate(() => document.title);
            expect(title).toBe(
                'React Accessible Accordion - Integration Test Sandbox',
            );
        });
        it('has rendered the "classic accordion" example', async () => {
            const { browser, page } = await setup();
            const qtyClassicAccordion = await page.evaluate(
                () => document.querySelectorAll('#classic-accordion').length,
            );
            expect(qtyClassicAccordion).toEqual(1);
        });
    });

    describe('Chrome Accessibility Tree', () => {
        it('matches snapshots', async () => {
            const { browser, page } = await setup();
            expect(await page.accessibility.snapshot()).toMatchSnapshot();
        });
    });

    describe('Keyboard Interaction', () => {
        describe('Enter or Space', () => {
            it(`When focus is on the accordion header for a collapsed panel,
                expands the associated panel. If the implementation allows only
                one panel to be expanded, and if another panel is expanded,
                collapses that panel.`, async () => {
                const { browser, page, buttonsHandles } = await setup();
                expect(buttonsHandles.length).toEqual(3);

                const firstButtonHandle = buttonsHandles[0];
                const secondButtonHandle = buttonsHandles[1];

                function evaluateIsExpanded(buttonHandle) {
                    return page
                        .evaluate(
                            (heading) => heading.getAttribute('aria-expanded'),
                            buttonHandle,
                        )
                        .then((ariaExpanded) => ariaExpanded === 'true');
                }

                // ENTER key
                await firstButtonHandle.focus();
                expect(await evaluateIsExpanded(firstButtonHandle)).toEqual(
                    false,
                );
                await page.keyboard.press('Enter');
                expect(await evaluateIsExpanded(firstButtonHandle)).toEqual(
                    true,
                );

                // SPACE key
                await secondButtonHandle.focus();
                expect(await evaluateIsExpanded(secondButtonHandle)).toEqual(
                    false,
                );
                await page.keyboard.press('Space');
                expect(await evaluateIsExpanded(secondButtonHandle)).toEqual(
                    true,
                );
            });

            xit(`When focus is on the accordion header for an expanded panel,
                collapses the panel if the implementation supports collapsing.
                Some implementations require one panel to be expanded at all
                times and allow only one panel to be expanded; so, they do not
                support a collapse function.`, () => {
                // todo
            });
        });

        describe('Tab', () => {
            it(`Moves focus to the next focusable element; all focusable
                elements in the accordion are included in the page Tab
                sequence.`, async () => {
                const { browser, page, buttonsHandles } = await setup();

                const [firstButtonHandle, secondButtonHandle] = buttonsHandles;
                await firstButtonHandle.focus();
                await page.keyboard.press('Tab');
                const secondIsFocussed = await page.evaluate(
                    (button) => document.activeElement === button,
                    secondButtonHandle,
                );
                expect(secondIsFocussed).toEqual(true);
            });
        });

        describe('Shift + Tab', () => {
            it(`Moves focus to the previous focusable element; all focusable
                elements in the accordion are included in the page Tab
                sequence.`, async () => {
                const { browser, page, buttonsHandles } = await setup();
                const [firstButtonHandle, secondButtonHandle] = buttonsHandles;
                await secondButtonHandle.focus();
                await page.keyboard.down('Shift');
                await page.keyboard.press('Tab');
                await page.keyboard.up('Shift');
                const firstIsFocussed = await page.evaluate(
                    (button) => document.activeElement === button,
                    firstButtonHandle,
                );
                expect(firstIsFocussed).toEqual(true);
            });
        });

        describe('Down Arrow (Optional)', () => {
            it(`If focus is on an accordion header, moves focus to the next
                accordion header.`, async () => {
                const { browser, page, buttonsHandles } = await setup();
                const [firstButtonHandle, secondButtonHandle] = buttonsHandles;
                await firstButtonHandle.focus();
                await page.keyboard.press('ArrowDown');
                const secondIsFocussed = await page.evaluate(
                    (button) => document.activeElement === button,
                    secondButtonHandle,
                );
                expect(secondIsFocussed).toEqual(true);
            });

            xit(`If focus is on the last accordion header, either does nothing
                or moves focus to the first accordion header.`, () => {
                // todo
            });
        });

        describe('Up Arrow (Optional)', () => {
            it(`If focus is on an accordion header, moves focus to the previous
                accordion header.`, async () => {
                const { browser, page, buttonsHandles } = await setup();
                const [firstButtonHandle, secondButtonHandle] = buttonsHandles;
                await secondButtonHandle.focus();
                await page.keyboard.press('ArrowUp');
                const firstIsFocussed = await page.evaluate(
                    (button) => document.activeElement === button,
                    firstButtonHandle,
                );
                expect(firstIsFocussed).toEqual(true);
            });

            xit(`If focus is on the first accordion header, either does nothing
                or moves focus to the last accordion header.`, () => {
                // todo
            });
        });

        describe('Home (Optional)', () => {
            it(`When focus is on an accordion header, moves focus to the first
                accordion header.`, async () => {
                const { browser, page, buttonsHandles } = await setup();
                const [
                    firstButtonHandle,
                    secondButtonHandle,
                    thirdButtonHandle,
                ] = buttonsHandles;
                await thirdButtonHandle.focus();
                await page.keyboard.press('Home');
                const firstIsFocussed = await page.evaluate(
                    (button) => document.activeElement === button,
                    firstButtonHandle,
                );
                expect(firstIsFocussed).toEqual(true);
            });
        });

        describe('End (Optional)', () => {
            it(`When focus is on an accordion header, moves focus to the last
                accordion header.`, async () => {
                const { browser, page, buttonsHandles } = await setup();
                const [
                    firstButtonHandle,
                    secondButtonHandle,
                    thirdButtonHandle,
                ] = buttonsHandles;
                await firstButtonHandle.focus();
                await page.keyboard.press('End');
                const thirdIsFocussed = await page.evaluate(
                    (button) => document.activeElement === button,
                    thirdButtonHandle,
                );
                expect(thirdIsFocussed).toEqual(true);
            });
        });
    });

    describe('WAI-ARIA Roles, States, and Properties', () => {
        it(`The title of each accordion header is contained in an element with
            role button.`, async () => {
            // TODO: Use 'title' elements inside the headings.

            const { browser, page, buttonsHandles } = await setup();
            expect(buttonsHandles).toHaveLength(3);
            for (const buttonHandle of buttonsHandles) {
                expect(
                    await page.evaluate(
                        (button) => button.getAttribute('role'),
                        buttonHandle,
                    ),
                ).toBe('button');
            }
        });

        it(`Each accordion header button is wrapped in an element with role
            heading that has a value set for aria-level that is appropriate for
            the information architecture of the page.`, async () => {
            const { browser, page, buttonsHandles } = await setup();
            expect(buttonsHandles).toHaveLength(3);
            for (const buttonHandle of buttonsHandles) {
                expect(
                    await page.evaluate(
                        (button) => button.parentElement.getAttribute('role'),
                        buttonHandle,
                    ),
                ).toBe('heading');

                expect(
                    await page.evaluate(
                        (button) =>
                            button.parentElement.getAttribute('aria-level'),
                        buttonHandle,
                    ),
                ).toBeTruthy();
            }
        });

        xit(`If the native host language has an element with an implicit
            heading and aria-level, such as an HTML heading tag, a native host
            language element may be used.`, () => {
            // Not applicable.
        });

        it(`The button element is the only element inside the heading element.
            That is, if there are other visually persistent elements, they are
            not included inside the heading element.`, async () => {
            const { headingsHandles, page } = await setup();

            expect(headingsHandles).toHaveLength(3);

            for (const handle of headingsHandles) {
                expect(
                    await page.evaluate(
                        (heading) => heading.childNodes.length === 1,
                        handle,
                    ),
                ).toEqual(true);

                expect(
                    await page.evaluate(
                        (heading) =>
                            heading.firstChild.getAttribute(
                                'data-accordion-component',
                            ) === 'AccordionItemButton',
                        handle,
                    ),
                ).toEqual(true);
            }
        });

        it(`If the accordion panel associated with an accordion header is
            visible, the header button element has aria-expanded set to true.
            If the panel is not visible, aria-expanded is set to false.`, async () => {
            const { browser, page, buttonsHandles } = await setup();
            expect(buttonsHandles.length).toEqual(3);

            for (const handle of buttonsHandles) {
                // Before expanding
                expect(
                    await page.evaluate(
                        (button) => button.getAttribute('aria-expanded'),
                        handle,
                    ),
                ).toEqual('false');

                // Click to expand
                await handle.click();

                // After expanding
                expect(
                    await page.evaluate(
                        (button) => button.getAttribute('aria-expanded'),
                        handle,
                    ),
                ).toEqual('true');
            }
        });

        it(`The accordion header button element has aria-controls set to the ID
            of the element containing the accordion panel content.`, async () => {
            const { browser, page, itemsHandles } = await setup();
            expect(itemsHandles.length).toEqual(3);

            for (const itemHandle of itemsHandles) {
                const buttonHandle = await itemHandle.$(
                    '[data-accordion-component="AccordionItemButton"]',
                );
                const panelHandle = await itemHandle.$(
                    '[data-accordion-component="AccordionItemPanel"]',
                );

                const buttonAriaControls = await page.evaluate(
                    (button) => button.getAttribute('aria-controls'),
                    buttonHandle,
                );
                const panelId = await page.evaluate(
                    (panel) => panel.id,
                    panelHandle,
                );

                expect(buttonAriaControls).toBeTruthy();
                expect(panelId).toBeTruthy();
                expect(buttonAriaControls).toEqual(panelId);
            }
        });

        it(`If the accordion panel associated with an accordion header is
            visible, and if the accordion does not permit the panel to be
            collapsed, the header button element has aria-disabled set to true.`, async () => {
            const { browser, page, buttonsHandles } = await setup();
            expect(buttonsHandles.length).toEqual(3);

            const [firstButtonHandle] = buttonsHandles;
            await firstButtonHandle.click();

            const buttonAriaDisabled = await page.evaluate(
                (button) => button.getAttribute('aria-disabled'),
                firstButtonHandle,
            );

            expect(buttonAriaDisabled).toEqual('true');
        });

        it(`Optionally, each element that serves as a container for panel
            content has role region and aria-labelledby with a value that refers
            to the button that controls display of the panel.`, async () => {
            const { browser, page, itemsHandles } = await setup();
            expect(itemsHandles.length).toEqual(3);

            for (const itemHandle of itemsHandles) {
                const buttonHandle = await itemHandle.$(
                    '[data-accordion-component="AccordionItemButton"]',
                );
                const panelHandle = await itemHandle.$(
                    '[data-accordion-component="AccordionItemPanel"]',
                );

                const buttonId = await page.evaluate(
                    (button) => button.id,
                    buttonHandle,
                );
                const panelAriaLabelledBy = await page.evaluate(
                    (panel) => panel.getAttribute('aria-labelledby'),
                    panelHandle,
                );
                const panelRole = await page.evaluate(
                    (panel) => panel.getAttribute('role'),
                    panelHandle,
                );

                expect(panelAriaLabelledBy).toBeTruthy();
                expect(buttonId).toBeTruthy();

                expect(panelAriaLabelledBy).toEqual(buttonId);
                expect(panelRole).toEqual('region');
            }
        });
    });
});
