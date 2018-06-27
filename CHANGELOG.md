# Changelog

> All notable changes to this project are documented in this file.
> This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Next

## [[v2.4.3]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.4.3)

### Fixed

*   Fixes issue with spacebar scrolling the page (see PR#99)
*   Fixes IE compatibility by replacing uses of Array.prototype.find.

## [[v2.4.2]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.4.2)

### Changed

*   Removes invalid test
*   Minor change to package.json to remove some redundant Jest config.
*   Upgrade one forgotten devDependency.

### Fixed

*   Emergency bug fix to remove asyc/await from the code (see PR#95)

## [[v2.4.1]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.4.1)

This release brings support for React 16.3+ by way of some minor refactoring to remove deprecated lifecycle methods.

### Changed

*   Replace deprecated lifecycle methods 'componentWillReceiveProps', 'componentWillUpdate' and 'componentWillMount'.
*   Updated `unstated` (internal dependency) to latest major release.
*   Updated all devDependencies.

## [[v2.4.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.4.0)

### Added

*   Possibility to have custom uuid on `AccordionItem` - suggested by https://github.com/springload/react-accessible-accordion/issues/70

### Fixed

*   Fix rollup config after version bump - https://gist.github.com/Rich-Harris/d472c50732dab03efeb37472b08a3f32
*   Adds existing arrow animation for aria-selected=true in fancy CSS

## [[v2.3.1]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.3.1)

### Fixed

*   Add `dist` folder to list of Flow ignores, so Flow doesn’t error after a build.
*   Issue with babel helpers. Just reverted commit 6f9f2c324a6fad4a35a84307241f4f710407f242 for now.

### Changed

*   Removed a couple of old npm scripts from the days before we introduced rollup to the build
    pipeline.
*   Upgraded a bunch of devDependencies, including Webpack which required a bit of a config refactor.

## [[v2.3.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.3.0)

### Changed

*   Refactored to use `unstated` for state-management instead of `mobx` + `mobx-react`, cutting the
    size of the bundle by approximately 60% 🎉.

## [[v2.2.1]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.2.1)

### Changed

*   Fixes mixed up filenames in the README

## [[v2.2.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.2.0)

### Added

*   Demo styles added to the bundle as two optional files:
    *   `minimal-example.css`: 'Minimal' theme - hide/show the AccordionBody component
    *   `fancy-example.css`: 'Fancy' theme - boilerplate styles for all components, as seen on our demo

## [[v2.1.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.1.0)

### Added

*   Publish flow types.

### Changed

*   Update all React components to accept arbitrary HTMLDivElement props (eg. 'lang', 'role' etc).
*   Upgrade all dev-dependencies except the eslint configs.
*   Replace snapshot tests with explicit assertions in AccordionItemBody and AccordionItemTitle.
*   Add specific assertions to tests in accordionStore.
*   Minor syntax change in AccordionItemBody

## [[v2.0.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v2.0.0)

Version 2.0 represents a total refactor, with a new context-based approach which should make this library more flexible, more maintainable and more comprehensively testable.

As this is a major release, users should expect some breaking changes - though they should be limited to the removal of the `activeItems` prop (read more below).

### Added

*   Exports `resetNextId` (https://github.com/springload/react-accessible-accordion/issues/41).

### Fixed

*   Defect where controlled components' props were overridden by React.Children.map (https://github.com/springload/react-accessible-accordion/issues/33).
*   Defect where accordion crashed with unexpected `children` types (https://github.com/springload/react-accessible-accordion/issues/45).
*   Defect where React Accessible Accordion's components could not be extended.
*   Defect where the `children` of `Accordion` or `AccordionItem` could not be arbitrary.
*   Defect where `AccordionItem` had to be a child of `Accordion` (as opposed to to an arbitrary-level descendant).
*   Defect where `AccordionItemBody` and `AccordionItemTitle` had to be children of `AccordionItem` (as opposed to arbitrary-level descendants).

### Removed:

*   🚨 Breaking change 🚨 `activeItems` property is no longer supported.

Control at the `Accordion` level (via the `activeItems` prop) and `AccordionItem` level (via the `expanded` prop) fought against one another, and choosing which control mechanism to give preference to would have been an arbitrary decision - and whichever way we went, we would have had test cases which demonstrated unusual/unpredictable behaviour. The `activeItems` mechanism was the obvious one to remove - it was arguably the "less React-y way", and we considered it more of a convenience than a feature. Crucially though, it fought too hard against the new architecture of the library, and keeping it would have prevented us enabling lots of other new features or resolving some of the issues that our users had raised.

If you're currently using activeItems, you're upgrade path might look like this:

```diff
const items = ['Foo', 'Bar'];
const activeItems = [0];

return (
-    <Accordion activeItems={activeItems} />
+    <Accordion />
        {activeItems.forEach((item, i) => (
-            <AccordionItem key={item}>{item}</AccordionItem>
+            <AccordionItem key={item} expanded={activeItems.includes(i)}>{item}</AccordionItem>
        )}
    </Accordion>
);
```

Please don't hesitate to reach out to one of the maintainers (or raise an issue) if you're having trouble upgrading - we're happy to help!

## [[v1.0.1]](https://github.com/springload/react-accessible-accordion/releases/tag/v1.0.1)

*   Renders predictable `id` attributes.(https://github.com/springload/react-accessible-accordion/pull/29)

## [[v1.0.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v1.0.0)

*   Replace prop-types implementation with flow-types (https://github.com/springload/react-accessible-accordion/pull/22)
    Thanks @ryami333 for the great contribution

NB: This version is backward compatible. It's just bumping to 1.0 to represent maturity rather than API changes.

## [[v0.6.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.6.0)

*   Improved accessibility support (Following https://github.com/springload/react-accessible-accordion/pull/19)
*   Adds possibility to programmatically open items(https://github.com/springload/react-accessible-accordion/pull/13)
    Thanks @epotockiy for the contribution
*   Improved accessibility status on demo page
*   Documentation about accessibility for this component

## [[v0.5.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.5.0)

*   Possibility to add a CSS class to hidden blocks (Following https://github.com/springload/react-accessible-accordion/pull/16)
*   Githooks are executable (https://github.com/springload/react-accessible-accordion/pull/15)
*   Bump to Node 8 / NPM 5

## [[v0.4.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.4.0)

*   Supports React 15.5+

## [[v0.3.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.3.0)

*   No warnings when you have only one item in the accordion

## [[v0.2.0]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.2.0)

*   Possibility to have extra blocks in AccordionItem

## [[v0.1.2]](https://github.com/springload/react-accessible-accordion/releases/tag/v0.1.2)

*   Accordion mode / Collapse mode
*   Possibility to pre expand items
*   100% coverage with unit tests
*   Possibility to customise CSS.
*   Clean CSS for the demo/github page.

## [[vx.y.z]](https://github.com/springload/Quicktube.js/releases/tag/x.y.z) Template from http://keepachangelog.com/

### Added

*   Something was added to the API / a new feature was introduced.

### Changed

### Fixed

### Removed
