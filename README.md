[react-accessible-accordion](https://springload.github.io/react-accessible-accordion/) [![npm](https://img.shields.io/npm/v/react-accessible-accordion.svg?style=flat-square)](https://www.npmjs.com/package/react-accessible-accordion) [![Build Status](https://travis-ci.org/springload/react-accessible-accordion.svg?branch=master)](https://travis-ci.org/springload/react-accessible-accordion) [![Coverage Status](https://coveralls.io/repos/github/springload/react-accessible-accordion/badge.svg)](https://coveralls.io/github/springload/react-accessible-accordion) [![Dependency Status](https://david-dm.org/springload/react-accessible-accordion.svg?style=flat-square)](https://david-dm.org/springload/react-accessible-accordion) [![devDependency Status](https://david-dm.org/springload/react-accessible-accordion/dev-status.svg?style=flat-square)](https://david-dm.org/springload/react-accessible-accordion#info=devDependencies) [![Code Climate](https://codeclimate.com/github/springload/react-accessible-accordion/badges/gpa.svg)](https://codeclimate.com/github/springload/react-accessible-accordion)
=========

> Accessible Accordion component for React. Inspired by [rc-collapse](https://github.com/react-component/collapse) and [react-sanfona](https://github.com/daviferreira/react-sanfona). :memo::cocktail:

This is a work in progress. Feel free to contribute. [Try a demo now](https://springload.github.io/react-accessible-accordion/).

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
# Start the server and the development tools.
npm run start
# Runs linting.
npm run lint
# Runs tests.
npm run test
# View other available commands with:
npm run
```

### Publish

```sh
git release vx.y.z
npm run dist
# Use irish-pub to check the package content. Install w/ npm install -g first.
irish-pub
npm publish
```
