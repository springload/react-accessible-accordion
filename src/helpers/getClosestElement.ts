export function getClosestElement(el, selector) {
    return el && (el.matches(selector) ? el : getClosestElement(el.parentNode, selector));
}