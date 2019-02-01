export function getClosestElement(
    el: HTMLElement | null,
    selector: string,
): HTMLElement | null {
    return (
        el &&
        (el.matches(selector)
            ? el
            : getClosestElement(el.parentElement, selector))
    );
}
