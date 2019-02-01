[react-accessible-accordion](https://springload.github.io/react-accessible-accordion/) [![npm](https://img.shields.io/npm/v/react-accessible-accordion.svg?style=flat-square)](https://www.npmjs.com/package/react-accessible-accordion) [![Build Status](https://travis-ci.org/springload/react-accessible-accordion.svg?branch=master)](https://travis-ci.org/springload/react-accessible-accordion) [![Coverage Status](https://coveralls.io/repos/github/springload/react-accessible-accordion/badge.svg)](https://coveralls.io/github/springload/react-accessible-accordion) [![Dependency Status](https://david-dm.org/springload/react-accessible-accordion.svg?style=flat-square)](https://david-dm.org/springload/react-accessible-accordion) [![devDependency Status](https://david-dm.org/springload/react-accessible-accordion/dev-status.svg?style=flat-square)](https://david-dm.org/springload/react-accessible-accordion#info=devDependencies)
[![Accessibility status](https://img.shields.io/badge/a11y-tested-brightgreen.svg)](http://wave.webaim.org/report#/https://springload.github.io/react-accessible-accordion/)
=========

## Demo

[Try a demo now](https://springload.github.io/react-accessible-accordion/).

## Usage

First, grab the package from npm:

```sh
npm install --save react-accessible-accordion
```

Then, import the editor and use it in your code. Here is a [basic example](https://springload.github.io/react-accessible-accordion/):

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

We strongly encourage you to write your own styles for your accordions, but we've published these two starter stylesheets to help you get up and running:

```js
// 'Minimal' theme - hide/show the AccordionBody component:
import 'react-accessible-accordion/dist/minimal-example.css';

// 'Fancy' theme - boilerplate styles for all components, as seen on our demo:
import 'react-accessible-accordion/dist/fancy-example.css';
```

We recommend that you copy them into your own app and modify them to suit your needs, particularly if you're using your own `className`s.

## Component API

### Accordion

#### allowMultipleExpanded : `boolean` [*optional*, default: `false`]

Don't autocollapse items when expanding other items.

#### allowZeroExpanded : `boolean` [*optional*, default: `false`]

Allow the only remaining expanded item to be collapsed.

#### className : `string` [*optional*, default: `'accordion'`]

Class(es) to apply to element.

#### onChange : `(uuid[]) => void` [*optional*]

Callback which is invoked when items are expanded or collapsed. Gets passed `uuid`s of the currently expanded `AccordionItem`s.

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

Resets the internal counter for Accordion items' identifiers (including `id` attributes). For use in test suites and isomorphic frameworks.

---

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
