# Contributing

## Development

### Install

Clone the project on your computer, and install [Node](https://nodejs.org). This
project also uses
[nvm](https://github.com/springload/frontend-starter-kit/blob/master/docs/useful-tooling.md#nvm).

### Working on the project

```sh
# Use the right node version.
nvm install
# Install dependencies.
yarn install
```

Once installed, see the `scripts` key in `package.json` for all of the available
tasks.

### Run the demo

> Everything mentioned in the installation process should already be done.

```sh
# Make sure you use the right node version.
nvm use
# Start the server and the development tools.
yarn start-demo
```

### Publish

```sh
npm version [TYPE]
git push origin master --tags
npm publish
yarn pages
```

# Project Principles

The following principles should help to inform decisions at every level of the
project's architecture, from communication to implementation, and everything in
between.

## Inclusivity

The driving principal behind the existence of React Accessible Accordion is an
inclusive web. Primarily, this relates to the inclusivity of those web users
with disabilities or impairments which require the use of assistive hardware or
other assistive technology, such as screenreaders. This principle of inclusivity
should also apply to the technical community as a whole, such that RAA should
_try_ to remain as technology-agnostic as possible. Examples of technical
decisions driven by the principle of inclusivity:

-   A deep browser backward compatibility.
-   A deep React version backward compatibility.
-   Maintenance of both Typescript _and_ Flow types (WIP at time of writing).

## Trust

Our users need to be able to trust that we are making sensible decisions with
regards to performance, spec-compliance and API patterns, or they will simply
use another Accordion component which may not. This manifests in closing issues
quickly, releasing often, communicating openly and effectively, making sensible
technology choices and limiting the number of breaking changes, to name a few.

## Fast + Light

Consuming React Accessible Accordion should not result in enormous bundle sizes.
The bundle size should be routinely audited, using a tool such as
[Bundlephobia](https://bundlephobia.com/result?p=react-accessible-accordion). We
avoid using third-party dependencies where possible, particularly when they do
not support tree-shaking or add bloat which is disproportionate to their
utility.
