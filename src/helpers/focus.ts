export function getClosestAccordion(
    el: HTMLElement | null,
): HTMLElement | null {
    return (
        el &&
        (el.matches('[data-accordion-component="Accordion"]')
            ? el
            : getClosestAccordion(el.parentElement))
    );
}

export function getSiblingButtons(item: HTMLElement): HTMLElement[] | null {
    const parentAccordion = getClosestAccordion(item);

    return (
        parentAccordion &&
        Array.from(
            parentAccordion.querySelectorAll(
                '[data-accordion-component="AccordionItemButton"]',
            ),
        )
    );
}

export function focusFirstSiblingOf(item: HTMLElement): void {
    const siblings = getSiblingButtons(item) || [];
    const first = siblings[0];
    if (first) {
        first.focus();
    }
}

export function focusLastSiblingOf(item: HTMLElement): void {
    const siblings = getSiblingButtons(item) || [];
    const last = siblings[siblings.length - 1];
    if (last) {
        last.focus();
    }
}

export function focusNextSiblingOf(item: HTMLElement): void {
    const siblings = getSiblingButtons(item) || [];
    const currentIndex = siblings.indexOf(item);
    if (currentIndex !== -1) {
        const next = siblings[currentIndex + 1];
        if (next) {
            next.focus();
        }
    }
}

export function focusPreviousSiblingOf(item: HTMLElement): void {
    const siblings = getSiblingButtons(item) || [];
    const currentIndex = siblings.indexOf(item);
    if (currentIndex !== -1) {
        const previous = siblings[currentIndex - 1];
        if (previous) {
            previous.focus();
        }
    }
}
