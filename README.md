[react-accessible-accordion](https://springload.github.io/react-accessible-accordion/) [![npm](https://img.shields.io/npm/v/react-accessible-accordion.svg?style=flat-square)](https://www.npmjs.com/package/react-accessible-accordion) [![Build Status](https://travis-ci.org/springload/react-accessible-accordion.svg?branch=master)](https://travis-ci.org/springload/react-accessible-accordion) [![Coverage Status](https://coveralls.io/repos/github/springload/react-accessible-accordion/badge.svg)](https://coveralls.io/github/springload/react-accessible-accordion) [![Dependency Status](https://david-dm.org/springload/react-accessible-accordion.svg?style=flat-square)](https://david-dm.org/springload/react-accessible-accordion) [![devDependency Status](https://david-dm.org/springload/react-accessible-accordion/dev-status.svg?style=flat-square)](https://david-dm.org/springload/react-accessible-accordion#info=devDependencies)
[![Accessibility status](https://img.shields.io/badge/a11y-tested-brightgreen.svg)](http://wave.webaim.org/report#/https://springload.github.io/react-accessible-accordion/)
=========

> Accessible Accordion component for React. Inspired by [rc-collapse](https://github.com/react-component/collapse) and [react-sanfona](https://github.com/daviferreira/react-sanfona). :mag::ok_hand:

This is a work in progress. Feel free to contribute. [Try a demo now](https://springload.github.io/react-accessible-accordion/).

If you like accessible components, feel free to check this other repo [react-accessible-modal](https://github.com/springload/react-accessible-modal).

## Usage

First, grab the package from npm:

```sh
npm install --save react-accessible-accordion
# react-accessible-accordion's peerDependencies:
npm install --save react@^15.0.0 react-dom@^15.0.0
```

Then, import the editor and use it in your code. Here is a [basic example](https://springload.github.io/react-accessible-accordion/):

```js
import React from 'react';
import ReactDOM from 'react-dom';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import './node_modules/react-accessible-accordion/dist/react-accessible-accordion.css';

const Example = () => (
    <Accordion>
        <AccordionItem>
            <AccordionItemTitle>
                <h3>Simple title</h3>
            </AccordionItemTitle>
            <AccordionItemBody>
                <p>
                    Body content
                </p>
            </AccordionItemBody>
        </AccordionItem>
        <AccordionItem>
            <AccordionItemTitle>
                <h3>Complex title</h3>
                <div>With a bit of description</div>
            </AccordionItemTitle>
            <AccordionItemBody>
                <p>
                    Body content
                </p>
            </AccordionItemBody>
        </AccordionItem>
    </Accordion>
);

ReactDOM.render(<Example />, document.querySelector('[data-mount]'));
```

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
      <tr>
          <td>activeItems</td>
          <td>Array</td>
          <td>[]</td>
          <td>Indexes (or custom keys) to pre expand items. Can be changed dynamically. Doesn't have the priority against `AccordionItem - expanded` on first render.</td>
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
          <td>customKey</td>
          <td>String</td>
          <td></td>
          <td>Custom key to be used as a reference in `Accordion - activeItems`</td>
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

## Accessibility

### What this project is doing accessibility-wise?

This project manages two types of Accordions, with single or multiple items open.

#### Single item

> Use this with with props `accordion` set to `true` on `Accordion`.

For this type of Accordion, you will get the following `role` set up on your elements:

- Accordion: `tablist`
- AccordionItem: no specific role
- AccordionItemTitle: `tab`
- AccordionItemBody: `tabpanel`

#### Multiple items

For this type of Accordion, you will get the following `role` set up on your elements:

> Use this with with props `accordion` set to `false` on `Accordion`.

- Accordion: no specific role
- AccordionItem: no specific role
- AccordionItemTitle: `button`
- AccordionItemBody: no specific role

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

| Browser | Device/OS | Version | Notes |
|---------|-----------|---------|-------|
| Mobile Safari | iOS | latest ||
| Chrome | Android | latest ||
| IE | Windows | 11 ||
| MS Edge | Windows | latest ||
| Chrome | Desktop | latest ||
| Firefox | Desktop | latest ||
| Safari | OSX | latest ||
