import path from 'path';
import puppeteer from 'puppeteer';

describe('WAI ARIA Spec', () => {
    async function setup() {
        const browser = await puppeteer.launch({
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
        await page.waitForSelector('.accordion__heading');

        const headingsHandles = await page.$$(
            '#classic-accordion .accordion__heading',
        );
        const itemsHandles = await page.$$(
            '#classic-accordion .accordion__item',
        );

        return { browser, page, headingsHandles, itemsHandles };
    }

    describe('Canary tests', () => {
        it('Loads the Cypress Testing Sandbox', async () => {
            const { browser, page } = await setup();
            const title = await page.evaluate(() => document.title);
            expect(title).toBe(
                'React Accessible Accordion - Integration Test Sandbox',
            );

            await browser.close();
        });
        it('has rendered the "classic accordion" example', async () => {
            const { browser, page } = await setup();
            const qtyClassicAccordion = await page.evaluate(
                () => document.querySelectorAll('#classic-accordion').length,
            );
            expect(qtyClassicAccordion).toEqual(1);

            await browser.close();
        });
    });

    describe('Chrome Accessibility Tree', () => {
        it('matches snapshots', async () => {
            const { browser, page } = await setup();
            expect(await page.accessibility.snapshot()).toMatchSnapshot();

            await browser.close();
        });
    });

    describe('Keyboard Interaction', () => {
        describe('Enter or Space', () => {
            it('When focus is on the accordion header for a collapsed panel, expands the associated panel. If the implementation allows only one panel to be expanded, and if another panel is expanded, collapses that panel.', async () => {
                const { browser, page, headingsHandles } = await setup();
                expect(headingsHandles.length).toEqual(3);

                const firstHeadingHandle = headingsHandles[0];
                const secondHeadingHandle = headingsHandles[1];

                function evaluateIsExpanded(headingHandle) {
                    return page
                        .evaluate(
                            heading => heading.getAttribute('aria-expanded'),
                            headingHandle,
                        )
                        .then(ariaExpanded => ariaExpanded === 'true');
                }

                // ENTER key
                await firstHeadingHandle.focus();
                expect(await evaluateIsExpanded(firstHeadingHandle)).toEqual(
                    false,
                );
                await page.keyboard.press('Enter');
                expect(await evaluateIsExpanded(firstHeadingHandle)).toEqual(
                    true,
                );

                // SPACE key
                await secondHeadingHandle.focus();
                expect(await evaluateIsExpanded(secondHeadingHandle)).toEqual(
                    false,
                );
                await page.keyboard.press('Space');
                expect(await evaluateIsExpanded(secondHeadingHandle)).toEqual(
                    true,
                );

                await browser.close();
            });

            xit('When focus is on the accordion header for an expanded panel, collapses the panel if the implementation supports collapsing. Some implementations require one panel to be expanded at all times and allow only one panel to be expanded; so, they do not support a collapse function.', () => {
                // todo
            });
        });

        describe('Tab', () => {
            it('Moves focus to the next focusable element; all focusable elements in the accordion are included in the page Tab sequence.', async () => {
                const { browser, page, headingsHandles } = await setup();

                const [
                    firstHeadingHandle,
                    secondHeadingHandle,
                ] = headingsHandles;
                await firstHeadingHandle.focus();
                await page.keyboard.press('Tab');
                const secondIsFocussed = await page.evaluate(
                    heading => document.activeElement === heading,
                    secondHeadingHandle,
                );
                expect(secondIsFocussed).toEqual(true);

                await browser.close();
            });
        });

        describe('Shift + Tab', () => {
            it('Moves focus to the previous focusable element; all focusable elements in the accordion are included in the page Tab sequence.', async () => {
                const { browser, page, headingsHandles } = await setup();
                const [
                    firstHeadingHandle,
                    secondHeadingHandle,
                ] = headingsHandles;
                await secondHeadingHandle.focus();
                await page.keyboard.down('Shift');
                await page.keyboard.press('Tab');
                await page.keyboard.up('Shift');
                const firstIsFocussed = await page.evaluate(
                    heading => document.activeElement === heading,
                    firstHeadingHandle,
                );
                expect(firstIsFocussed).toEqual(true);

                await browser.close();
            });
        });

        describe('Down Arrow (Optional)', () => {
            it('If focus is on an accordion header, moves focus to the next accordion header.', async () => {
                const { browser, page, headingsHandles } = await setup();
                const [
                    firstHeadingHandle,
                    secondHeadingHandle,
                ] = headingsHandles;
                await firstHeadingHandle.focus();
                await page.keyboard.press('ArrowDown');
                const secondIsFocussed = await page.evaluate(
                    heading => document.activeElement === heading,
                    secondHeadingHandle,
                );
                expect(secondIsFocussed).toEqual(true);

                await browser.close();
            });

            xit('If focus is on the last accordion header, either does nothing or moves focus to the first accordion header.', () => {
                // todo
            });
        });

        describe('Up Arrow (Optional)', () => {
            it('If focus is on an accordion header, moves focus to the previous accordion header.', async () => {
                const { browser, page, headingsHandles } = await setup();
                const [
                    firstHeadingHandle,
                    secondHeadingHandle,
                ] = headingsHandles;
                await secondHeadingHandle.focus();
                await page.keyboard.press('ArrowUp');
                const firstIsFocussed = await page.evaluate(
                    heading => document.activeElement === heading,
                    firstHeadingHandle,
                );
                expect(firstIsFocussed).toEqual(true);

                await browser.close();
            });

            xit('If focus is on the first accordion header, either does nothing or moves focus to the last accordion header.', () => {
                // todo
            });
        });

        describe('Home (Optional)', () => {
            it('When focus is on an accordion header, moves focus to the first accordion header.', async () => {
                const { browser, page, headingsHandles } = await setup();
                const [
                    firstHeadingHandle,
                    secondHeadingHandle,
                    thirdHeadingHandle,
                ] = headingsHandles;
                await thirdHeadingHandle.focus();
                await page.keyboard.press('Home');
                const firstIsFocussed = await page.evaluate(
                    heading => document.activeElement === heading,
                    firstHeadingHandle,
                );
                expect(firstIsFocussed).toEqual(true);

                await browser.close();
            });
        });

        describe('End (Optional)', () => {
            it('When focus is on an accordion header, moves focus to the last accordion header.', async () => {
                const { browser, page, headingsHandles } = await setup();
                const [
                    firstHeadingHandle,
                    secondHeadingHandle,
                    thirdHeadingHandle,
                ] = headingsHandles;
                await firstHeadingHandle.focus();
                await page.keyboard.press('End');
                const thirdIsFocussed = await page.evaluate(
                    heading => document.activeElement === heading,
                    thirdHeadingHandle,
                );
                expect(thirdIsFocussed).toEqual(true);

                await browser.close();
            });
        });
    });

    describe('WAI-ARIA Roles, States, and Properties', () => {
        it('The title of each accordion header is contained in an element with role button.', async () => {
            const { browser, page, headingsHandles } = await setup();
            expect(headingsHandles).toHaveLength(3);
            for (const headingHandle of headingsHandles) {
                expect(
                    await page.evaluate(
                        heading => heading.getAttribute('role'),
                        headingHandle,
                    ),
                ).toBe('button');
            }

            await browser.close();
        });

        xit('Each accordion header button is wrapped in an element with role heading that has a value set for aria-level that is appropriate for the information architecture of the page.', () => {
            // Not yet supported.
        });

        xit('If the native host language has an element with an implicit heading and aria-level, such as an HTML heading tag, a native host language element may be used.', () => {
            // todo
        });

        xit('The button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.', () => {
            // todo
        });

        it('If the accordion panel associated with an accordion header is visible, the header button element has aria-expanded set to true. If the panel is not visible, aria-expanded is set to false.', async () => {
            const { browser, page, headingsHandles } = await setup();
            expect(headingsHandles.length).toEqual(3);

            for (const handle of headingsHandles) {
                // Before expanding
                expect(
                    await page.evaluate(
                        heading => heading.getAttribute('aria-expanded'),
                        handle,
                    ),
                ).toEqual('false');

                // Click to expand
                await handle.click();

                // After expanding
                expect(
                    await page.evaluate(
                        heading => heading.getAttribute('aria-expanded'),
                        handle,
                    ),
                ).toEqual('true');
            }

            await browser.close();
        });

        it('The accordion header button element has aria-controls set to the ID of the element containing the accordion panel content.', async () => {
            const { browser, page, itemsHandles } = await setup();
            expect(itemsHandles.length).toEqual(3);

            for (const itemHandle of itemsHandles) {
                const headingHandle = await itemHandle.$('.accordion__heading');
                const panelHandle = await itemHandle.$('.accordion__panel');

                const headingAriaControls = await page.evaluate(
                    heading => heading.getAttribute('aria-controls'),
                    headingHandle,
                );
                const panelId = await page.evaluate(
                    panel => panel.id,
                    panelHandle,
                );

                expect(headingAriaControls).toBeTruthy();
                expect(panelId).toBeTruthy();
                expect(headingAriaControls).toEqual(panelId);
            }

            await browser.close();
        });

        it('If the accordion panel associated with an accordion header is visible, and if the accordion does not permit the panel to be collapsed, the header button element has aria-disabled set to true.', async () => {
            const { browser, page, headingsHandles } = await setup();
            expect(headingsHandles.length).toEqual(3);

            const [firstHeadingHandle] = headingsHandles;
            await firstHeadingHandle.click();

            const headingAriaDisabled = await page.evaluate(
                heading => heading.getAttribute('aria-disabled'),
                firstHeadingHandle,
            );

            expect(headingAriaDisabled).toEqual('true');

            await browser.close();
        });

        it('Optionally, each element that serves as a container for panel content has role region and aria-labelledby with a value that refers to the button that controls display of the panel.', async () => {
            const { browser, page, itemsHandles } = await setup();
            expect(itemsHandles.length).toEqual(3);

            for (const itemHandle of itemsHandles) {
                const headingHandle = await itemHandle.$('.accordion__heading');
                const panelHandle = await itemHandle.$('.accordion__panel');

                const headingId = await page.evaluate(
                    heading => heading.id,
                    headingHandle,
                );
                const panelAriaLabelledBy = await page.evaluate(
                    panel => panel.getAttribute('aria-labelledby'),
                    panelHandle,
                );
                const panelRole = await page.evaluate(
                    panel => panel.getAttribute('role'),
                    panelHandle,
                );

                expect(panelAriaLabelledBy).toBeTruthy();
                expect(headingId).toBeTruthy();

                expect(panelAriaLabelledBy).toEqual(headingId);
                expect(panelRole).toEqual('region');
            }

            await browser.close();
        });
    });
});
