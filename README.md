[react-accessible-accordion](https://springload.github.io/react-accessible-accordion/) [![npm](https://img.shields.io/npm/v/react-accessible-accordion.svg?style=flat-square)](https://www.npmjs.com/package/react-accessible-accordion) [![Build Status](https://travis-ci.org/springload/react-accessible-accordion.svg?branch=master)](https://travis-ci.org/springload/react-accessible-accordion) [![Coverage Status](https://coveralls.io/repos/github/springload/react-accessible-accordion/badge.svg)](https://coveralls.io/github/springload/react-accessible-accordion) [![Dependency Status](https://david-dm.org/springload/react-accessible-accordion.svg?style=flat-square)](https://david-dm.org/springload/react-accessible-accordion) [![devDependency Status](https://david-dm.org/springload/react-accessible-accordion/dev-status.svg?style=flat-square)](https://david-dm.org/springload/react-accessible-accordion#info=devDependencies)
[![Accessibility status](https://img.shields.io/badge/a11y-tested-brightgreen.svg)](http://wave.webaim.org/report#/https://springload.github.io/react-accessible-accordion/)
=========

## Demo

[Try a demo now](https://springload.github.io/react-accessible-accordion/).

## Usage

First, grab the package from npm:

```sh
npm install --save react-accessible-accordion react react-dom
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

## API

### Accordion

#### props:

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>allowMultipleExpanded</td>
          <td>Boolean</td>
          <td>false</td>
          <td>Don't close all the others when expanding an
                                    AccordionItem</td>
      </tr>
      <tr>
          <td>allowZeroExpanded</td>
          <td>Boolean</td>
          <td>false</td>
          <td>Close an AccordionItem when it's the only
                                    one expanded</td>
      </tr>
      <tr>
          <td>onChange</td>
          <td>Function(keys)</td>
          <td>noop</td>
          <td>Triggered on change (open/close items)</td>
      </tr>
      <tr>
          <td>className</td>
          <td>String</td>
          <td>accordion</td>
          <td>CSS class(es) applied to the component</td>
      </tr>
    </tbody>
</table>

### AccordionItem

#### props:

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>expanded</td>
          <td>Boolean</td>
          <td>false</td>
          <td>Expands this item on first render</td>
      </tr>
      <tr>
          <td>className</td>
          <td>String</td>
          <td>accordion__item</td>
          <td>CSS class(es) applied to the component</td>
      </tr>
      <tr>
          <td>expandedClassName</td>
          <td>String</td>
          <td>null</td>
          <td>Class name for expanded panel state</td>
      </tr>
      <tr>
          <td>uuid</td>
          <td>String</td>
          <td>null</td>
          <td>Custom uuid to be passed to Accordion - onChange. Has to be unique.</td>
      </tr>
    </tbody>
</table>

### AccordionItemHeading

#### props:

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>className</td>
          <td>String</td>
          <td>accordion__heading</td>
          <td>CSS class(es) applied to the component</td>
      </tr>
      <tr>
          <td>expandedClassName</td>
          <td>String</td>
          <td>null</td>
          <td>Class name for expanded panel state</td>
      </tr>
    </tbody>
</table>

### AccordionItemPanel

#### props:

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>className</td>
          <td>String</td>
          <td>accordion__panel</td>
          <td>CSS class(es) applied to the component</td>
      </tr>
      <tr>
          <td>expandedClassName</td>
          <td>String</td>
          <td>accordion__panel--expanded</td>
          <td>Class name for expanded panel state</td>
      </tr>
    </tbody>
</table>

### AccordionItemState

#### props:

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>expanded</td>
          <td>Boolean</td>
          <td>false</td>
          <td>Expands this item on first render</td>
      </tr>
      <tr>
          <td>children</td>
          <td>Function</td>
          <td>null</td>
          <td>Takes expanded state as argument for conditional rendering</td>
      </tr>
    </tbody>
</table>

### resetNextUuid

<table class="table table-bordered table-striped">
    <tbody>
      <tr>
          <td>Function(void)</td>
      </tr>
      <tr>
          <td>Resets the internal counter for Accordion items' identifiers (including `id` attributes). For use in test suites and isomorphic frameworks.</td>
      </tr>
    </tbody>
</table>

## Accessibility

### What this project is doing accessibility-wise?

This project manages Accordions with several options available for allowing/not allowing multiple items to be open at once, and allowing/not allowing all items to be closed.

#### Single item open

> Use this with with props `allowMultipleExpanded` set to `false` on `Accordion`.

#### Multiple items open

> Use this with with props `allowMultipleExpanded` set to `true` on `Accordion`.

#### One item must remain open

> Use this with with props `allowZeroExpanded` set to `false` on `Accordion`.

#### All items can be closed

> Use this with with props `allowZeroExpanded` set to `true` on `Accordion`.

# Browser support

**Supported browser / device versions:**

| Browser       | Device/OS | Version | Notes |
| ------------- | --------- | ------- | ----- |
| Mobile Safari | iOS       | latest  |       |
| Chrome        | Android   | latest  |       |
| IE            | Windows   | 11      |       |
| MS Edge       | Windows   | latest  |       |
| Chrome        | Desktop   | latest  |       |
| Firefox       | Desktop   | latest  |       |
| Safari        | OSX       | latest  |       |
