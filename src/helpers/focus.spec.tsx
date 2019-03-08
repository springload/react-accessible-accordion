import {
    focusFirstSiblingOf,
    focusLastSiblingOf,
    focusNextSiblingOf,
    focusPreviousSiblingOf,
    getClosestAccordion,
    getSiblingButtons,
} from './focus';

describe('focus', () => {
    function createTree(innerHTML: string): DocumentFragment {
        const template = document.createElement('template');
        // tslint:disable-next-line: no-inner-html
        template.innerHTML = innerHTML.trim();

        return template.content;
    }

    describe('getClosestAccordion', () => {
        it('gets an ancestral accordion element', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion" id="parent">
                   <div id="child">Child</div>
                </div>
            `);

            const child = tree.querySelector('#child');
            const parent = tree.querySelector('#parent');

            // Predicate
            if (
                !(child instanceof HTMLElement && parent instanceof HTMLElement)
            ) {
                throw new Error('child or parent not found');
            }

            // Matter
            expect(getClosestAccordion(child)).toEqual(parent);
        });

        it('only gets the nearest ancestral accordion element when there are more than one', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="Accordion" id="parent">
                        <div id="child">Child</div>
                    </div>
                </div>
            `);

            const child = tree.querySelector('#child');
            const parent = tree.querySelector('#parent');

            // Predicate
            if (
                !(child instanceof HTMLElement && parent instanceof HTMLElement)
            ) {
                throw new Error('child or parent not found');
            }

            // Matter
            expect(getClosestAccordion(child)).toEqual(parent);
        });

        it('recurses through intermediary elements', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion" id="parent">
                    <div>
                        <div>
                            <div id="child">Child</div>
                        </div>
                    </div>
                </div>
            `);

            const child = tree.querySelector('#child');
            const parent = tree.querySelector('#parent');

            // Predicate
            if (
                !(child instanceof HTMLElement && parent instanceof HTMLElement)
            ) {
                throw new Error('child or parent not found');
            }

            expect(getClosestAccordion(child)).toEqual(parent);
        });
    });

    describe('getSiblingButtons', () => {
        it('returns adjacent siblings', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion" id="parent">
                    <div data-accordion-component="AccordionItemButton">Button</div>
                    <div data-accordion-component="AccordionItemButton">Button</div>
                    <div data-accordion-component="AccordionItemButton">Button</div>
                </div>
            `);

            const button = tree.querySelector(
                '[data-accordion-component="AccordionItemButton"]',
            );

            // Predicate
            if (!(button instanceof HTMLElement)) {
                throw new Error('button not found');
            }

            // Matter
            expect(getSiblingButtons(button)).toHaveLength(3);
        });

        it('returns nested siblings', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion" id="parent">
                    <div>
                        <div data-accordion-component="AccordionItemButton">Button</div>
                    </div>
                    <div data-accordion-component="AccordionItemButton">Button</div>
                    <div data-accordion-component="AccordionItemButton">Button</div>
                </div>
            `);

            const button = tree.querySelector(
                '[data-accordion-component="AccordionItemButton"]',
            );

            // Predicate
            if (!(button instanceof HTMLElement)) {
                throw new Error('button not found');
            }

            // Matter
            expect(getSiblingButtons(button)).toHaveLength(3);
        });

        it('doesn‘t return buttons "above" the accordion', () => {
            const tree = createTree(`
                <div data-accordion-component="AccordionItemButton">
                    <div data-accordion-component="Accordion" id="parent">
                        <div data-accordion-component="AccordionItemButton" id="first">Button</div>
                        <div data-accordion-component="AccordionItemButton">Button</div>
                    </div>
                </div>
            `);

            const button = tree.querySelector('#first');

            // Predicate
            if (!(button instanceof HTMLElement)) {
                throw new Error('button not found');
            }

            // Matter
            expect(getSiblingButtons(button)).toHaveLength(2);
        });
    });

    describe('focusFirstSiblingOf', () => {
        it('focuses the first button in document flow', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="1"></div>
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="2"></div>
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="3"></div>
                </div>
            `);

            const [firstButton, secondButton, thirdButton] = Array.from(
                tree.querySelectorAll(
                    '[data-accordion-component="AccordionItemButton"]',
                ),
            );

            // Predicate
            if (
                !(
                    firstButton instanceof HTMLElement &&
                    secondButton instanceof HTMLElement &&
                    thirdButton instanceof HTMLElement
                )
            ) {
                throw new Error('buttons not found');
            }
            thirdButton.focus();
            expect(document.activeElement).toBe(thirdButton);

            // Matter
            focusFirstSiblingOf(thirdButton);
            expect(document.activeElement).toBe(firstButton);
        });
    });

    describe('focusLastSiblingOf', () => {
        it('focuses the last button in document flow', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="1"></div>
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="2"></div>
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="3"></div>
                </div>
            `);

            const [
                firstButton,
                secondButton,
                thirdButton,
            ]: HTMLElement[] = Array.from(
                tree.querySelectorAll(
                    '[data-accordion-component="AccordionItemButton"]',
                ),
            );

            // Predicate
            if (
                !(
                    firstButton instanceof HTMLElement &&
                    secondButton instanceof HTMLElement &&
                    thirdButton instanceof HTMLElement
                )
            ) {
                throw new Error('buttons not found');
            }
            firstButton.focus();
            expect(document.activeElement).toBe(firstButton);

            // Matter
            focusLastSiblingOf(firstButton);
            expect(document.activeElement).toBe(thirdButton);
        });
    });

    describe('focusNextSiblingOf', () => {
        it('focuses the next button in document flow', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="1"></div>
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="2"></div>
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="3"></div>
                </div>
            `);

            const [
                firstButton,
                secondButton,
                thirdButton,
            ]: HTMLElement[] = Array.from(
                tree.querySelectorAll(
                    '[data-accordion-component="AccordionItemButton"]',
                ),
            );

            // Predicate
            if (
                !(
                    firstButton instanceof HTMLElement &&
                    secondButton instanceof HTMLElement &&
                    thirdButton instanceof HTMLElement
                )
            ) {
                throw new Error('buttons not found');
            }
            firstButton.focus();
            expect(document.activeElement).toBe(firstButton);

            // Matter
            focusNextSiblingOf(firstButton);
            expect(document.activeElement).toBe(secondButton);
        });
    });

    describe('focusPreviousSiblingOf', () => {
        it('focuses the previous button in document flow', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="1"></div>
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="2"></div>
                    <div data-accordion-component="AccordionItemButton" tabindex="0" id="3"></div>
                </div>
            `);

            const [
                firstButton,
                secondButton,
                thirdButton,
            ]: HTMLElement[] = Array.from(
                tree.querySelectorAll(
                    '[data-accordion-component="AccordionItemButton"]',
                ),
            );

            // Predicate
            if (
                !(
                    firstButton instanceof HTMLElement &&
                    secondButton instanceof HTMLElement &&
                    thirdButton instanceof HTMLElement
                )
            ) {
                throw new Error('buttons not found');
            }
            thirdButton.focus();
            expect(document.activeElement).toBe(thirdButton);

            // Matter
            focusPreviousSiblingOf(thirdButton);
            expect(document.activeElement).toBe(secondButton);
        });
    });
});
