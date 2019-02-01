[react-accessible-accordion](https://springload.github.io/react-accessible-accordion/)
[![npm](https://img.shields.io/npm/v/react-accessible-accordion.svg?style=flat-square)](https://www.npmjs.com/package/react-accessible-accordion)
[![Build Status](https://travis-ci.org/springload/react-accessible-accordion.svg?branch=master)](https://travis-ci.org/springload/react-accessible-accordion)
[![Coverage Status](https://coveralls.io/repos/github/springload/react-accessible-accordion/badge.svg)](https://coveralls.io/github/springload/react-accessible-accordion)
[![Dependency Status](https://david-dm.org/springload/react-accessible-accordion.svg?style=flat-square)](https://david-dm.org/springload/react-accessible-accordion)
[![devDependency Status](https://david-dm.org/springload/react-accessible-accordion/dev-status.svg?style=flat-square)](https://david-dm.org/springload/react-accessible-accordion#info=devDependencies)
[![Accessibility status](https://img.shields.io/badge/a11y-tested-brightgreen.svg)](http://wave.webaim.org/report#/https://springload.github.io/react-accessible-accordion/)
=========

## Demo

[Try a demo now](https://springload.github.io/react-accessible-accordion/).

## Usage

First, grab the package from npm:

```sh
npm install --save react-accessible-accordion
```

Then, import the editor and use it in your code. Here is a
[basic example](https://springload.github.io/react-accessible-accordion/):

```jsx
import React from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

export default function Example() {
    return (
        <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <span className="accordion__arrow" role="presentation" />
                    What harsh truths do you prefer to ignore?
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        Exercitation in fugiat est ut ad ea cupidatat ut in
                        cupidatat occaecat ut occaecat consequat est minim minim
                        esse tempor laborum consequat esse adipisicing eu
                        reprehenderit enim.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <span className="accordion__arrow" role="presentation" />
                    Is free will real or just an illusion?
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        In ad velit in ex nostrud dolore cupidatat consectetur
                        ea in ut nostrud velit in irure cillum tempor laboris
                        sed adipisicing eu esse duis nulla non.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
}
```

### Styles

We strongly encourage you to write your own styles for your accordions, but
we've published these two starter stylesheets to help you get up and running:

```js
// 'Minimal' theme - hide/show the AccordionBody component:
import 'react-accessible-accordion/dist/minimal-example.css';

// 'Fancy' theme - boilerplate styles for all components, as seen on our demo:
import 'react-accessible-accordion/dist/fancy-example.css';
```

We recommend that you copy them into your own app and modify them to suit your
needs, particularly if you're using your own `className`s.

## Component API

### Accordion

#### allowMultipleExpanded : `boolean` [*optional*, default: `false`]

Don't autocollapse items when expanding other items.

#### allowZeroExpanded : `boolean` [*optional*, default: `false`]

Allow the only remaining expanded item to be collapsed.

#### className : `string` [*optional*, default: `'accordion'`]

Class(es) to apply to element.

#### onChange : `(uuid[]) => void` [*optional*]

Callback which is invoked when items are expanded or collapsed. Gets passed
`uuid`s of the currently expanded `AccordionItem`s.

---

### AccordionItem

#### className : `string` [*optional*, default: `accordion__item`]

Class(es) to apply to element.

#### expandedClassName : `string` [*optional*, default: `accordion__item--expanded`]

Class(es) to append when item is expanded.

#### uuid : `string|number` [*optional*]

Recommended for use with `onChange`. Will be auto-generated if not provided.

---

### AccordionItemHeading

#### className : `string` [*optional*, default: `'accordion__heading'`]

Class(es) to apply to element.

#### expandedClassName : `string` [*optional*, default: `'accordion__heading--expanded'`]

Class(es) to append when item is expanded.

---

### AccordionItemPanel

#### className : `string` [*optional*, default: `'accordion__panel'`]

Class(es) to apply to element.

#### expandedClassName : `string` [*optional*, default: `'accordion__panel'`]

Class(es) to append when item is expanded.

---

### AccordionItemState

#### children : `(expanded: boolean): JSX.Element` [**required**]

---

## Helpers

### resetNextUuid : `(): void`

Resets the internal counter for Accordion items' identifiers (including `id`
attributes). For use in test suites and isomorphic frameworks.

---

## Accessibility Best-Practice

Authoring an 'accordion' component to the
[WAI ARIA spec](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion) can be
complex, but `React Accessible Accordion` does most of the heavy lifting for
you, including:

-   Applying appropriate aria attributes (`aria-expanded`, `aria-controls`,
    `aria-disabled`, `aria-hidden` and `aria-labelledby`).
-   Applying appropriate `role` attributes (`button`, `heading`, `region`).
-   Applying appropriate `tabindex` attributes.
-   Applying keyboard interactivity ('space', 'end', 'tab', 'up', 'down', 'home'
    and 'end' keys).

However, there's still a couple of things you need to keep in mind to remain
spec-compliant:

-   Only ever use
    [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content)
    inside of your `AccordionItemHeading` component. If in doubt, use text only.
-   Always provide an `aria-level` prop to your `AccordionItemHeading`
    component, _especially_ if you are nesting accordions. This attribute is a
    signal assistive technologies (eg. screenreaders) use to determine which
    heading level (ie. `h1`-`h6`) to treat your heading as.

If you have any questions about your implementation, then please don't be afraid
to get in touch via our
[issues](https://github.com/springload/react-accessible-accordion/issues).

## FAQs

### Which design patterns does this component aim to solve?

Those described by the WAI ARIA spec's description of an 'accordion':

> An accordion is a vertically stacked set of interactive headings that each
> contain a title, content snippet, or thumbnail representing a section of
> content. The headings function as controls that enable users to reveal or hide
> their associated sections of content. Accordions are commonly used to reduce
> the need to scroll when presenting multiple sections of content on a single
> page.

### Which design patterns does this component NOT aim to solve?

Components which are "accordion-like" but do not match the WAI ARIA spec's
description, as written above. By "accordion-like", we mean components which
have collapsible items but require bespoke interactive mechanisms in order to
expand, collapse and 'disable' them. This includes (but is not limited to)
multi-step forms, like those seen in many cart/checkout flows, which we believe
require (other) complex markup in order to be considered 'accessible'.

If you believe that you have a valid use-case for 'disabled' items, or items
which require manual 'expanded' state-management, then please
[let us know](https://github.com/springload/react-accessible-accordion/issues/new) -
we're always open for critical (but polite) feedback. Otherwise, we don't plan
on implementing this functionality in the near future.

### How do I disable an item?

See "Which design patterns does this component NOT aim to solve?".

### How do I manually control the expanded state of an item?

See "Which design patterns does this component NOT aim to solve?".

## Browser Support

**Supported browser / device versions:**

| Browser       | Device/OS | Version |
| ------------- | --------- | ------- |
| Mobile Safari | iOS       | latest  |
| Chrome        | Android   | latest  |
| IE            | Windows   | 11      |
| MS Edge       | Windows   | latest  |
| Chrome        | Desktop   | latest  |
| Firefox       | Desktop   | latest  |
| Safari        | OSX       | latest  |
