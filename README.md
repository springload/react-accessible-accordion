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
import ReactDOM from 'react-dom';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

const Example = () => (
    <Accordion>
        <AccordionItem>
            <AccordionItemTitle>
                <h3>Simple title</h3>
            </AccordionItemTitle>
            <AccordionItemBody>
                <p>Body content</p>
            </AccordionItemBody>
        </AccordionItem>
        <AccordionItem>
            <AccordionItemTitle>
                <h3>Complex title</h3>
                <div>With a bit of description</div>
            </AccordionItemTitle>
            <AccordionItemBody>
                <p>Body content</p>
            </AccordionItemBody>
        </AccordionItem>
    </Accordion>
);

ReactDOM.render(<Example />, document.querySelector('[data-mount]'));
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
          <td>accordion</td>
          <td>Boolean</td>
          <td>true</td>
          <td>Open only one item at a time or not</td>
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
          <td>hideBodyClassName</td>
          <td>String</td>
          <td>null</td>
          <td>Class name for hidden body state</td>
      </tr>
      <tr>
          <td>uuid</td>
          <td>String</td>
          <td>null</td>
          <td>Custom uuid to be passed to Accordion - onChange. Has to be unique.</td>
      </tr>
    </tbody>
</table>

### AccordionItemTitle

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
          <td>accordion__title</td>
          <td>CSS class(es) applied to the component</td>
      </tr>
      <tr>
          <td>hideBodyClassName</td>
          <td>String</td>
          <td>null</td>
          <td>Class name for hidden body state</td>
      </tr>
    </tbody>
</table>

### AccordionItemBody

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
          <td>accordion__body</td>
          <td>CSS class(es) applied to the component</td>
      </tr>
      <tr>
          <td>hideBodyClassName</td>
          <td>String</td>
          <td>accordion__body--hidden</td>
          <td>Class name for hidden body state</td>
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

This project manages two types of Accordions, with single or multiple items open.

#### Single item

> Use this with with props `accordion` set to `true` on `Accordion`.

For this type of Accordion, you will get the following `role` set up on your elements:

* Accordion: `tablist`
* AccordionItem: no specific role
* AccordionItemTitle: `tab`
* AccordionItemBody: `tabpanel`

#### Multiple items

For this type of Accordion, you will get the following `role` set up on your elements:

> Use this with with props `accordion` set to `false` on `Accordion`.

* Accordion: no specific role
* AccordionItem: no specific role
* AccordionItemTitle: `button`
* AccordionItemBody: no specific role

## Development

### Install

> Clone the project on your computer, and install [Node](https://nodejs.org). This project also uses [nvm](https://github.com/springload/frontend-starter-kit/blob/master/docs/useful-tooling.md#nvm).

```sh
nvm install
# Then, install all project dependencies.
npm install
# Install the git hooks.
./.githooks/deploy
# Set up a `.env` file with the appropriate secrets.
touch .env
```

### Working on the project

> Everything mentioned in the installation process should already be done.

```sh
# Make sure you use the right node version.
nvm use
# Start the the development tools in watch mode.
npm run start
# Runs linting.
npm run lint
# Runs tests.
npm run test
# View other available commands with:
npm run
```

### Run the demo

> Everything mentioned in the installation process should already be done.

```sh
# Make sure you use the right node version.
nvm use
# Start the server and the development tools.
npm run start-demo
```

### Publish

```sh
npm version [TYPE]
git push origin master --tags
npm publish
```

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
