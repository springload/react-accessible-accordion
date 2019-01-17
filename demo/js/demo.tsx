// tslint:disable-next-line no-implicit-dependencies no-import-side-effect
import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
} from '../../src';

// tslint:disable-next-line no-import-side-effect
import '../../src/css/fancy-example.css';

// tslint:disable-next-line max-func-body-length
const Example = (): JSX.Element => (
    <div className="demo-container">
        <h2>Default settings</h2>

        <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <h3 className="u-position-relative">
                        Accessible Accordion
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        Accessible Accordion component for React. Inspired by{' '}
                        <a
                            href="https://github.com/react-component/collapse"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            rc-collapse
                        </a>{' '}
                        and{' '}
                        <a
                            href="https://github.com/daviferreira/react-sanfona"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            react-sanfona
                        </a>
                        .
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="accordion__item">
                <AccordionItemHeading>
                    <h3 className=" u-position-relative u-margin-bottom-s">
                        Components
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                    <div>See all the components from this package</div>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <ul>
                        <li>Accordion</li>
                        <li>AccordionItem</li>
                        <li>AccordionItemHeading</li>
                        <li>AccordionItemPanel</li>
                    </ul>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>

        <h2 className="u-margin-top">Allow multiple</h2>

        <Accordion allowMultipleExpanded={true}>
            <AccordionItem>
                <AccordionItemHeading>
                    <h3 className="u-position-relative">
                        Accordion
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>type</th>
                                <th>default</th>
                                <th>description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>allowMultipleExpanded</td>
                                <td>Boolean</td>
                                <td>false</td>
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
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <h3 className="u-position-relative">
                        AccordionItem
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>type</th>
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
                        </tbody>
                    </table>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <h3 className="u-position-relative">
                        AccordionItemHeading
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>type</th>
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
                        </tbody>
                    </table>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <h3 className="u-position-relative">
                        AccordionItemPanel
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>type</th>
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
                                <td>hideBody ClassName</td>
                                <td>String</td>
                                <td>accordion__panel--hidden</td>
                                <td>Class name for hidden body state</td>
                            </tr>
                        </tbody>
                    </table>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>

        <h2 className="u-margin-top">Multi Accordion children</h2>

        <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <h3 className="u-position-relative">
                        Components API
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <Accordion allowMultipleExpanded={true}>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <h3 className="u-position-relative">
                                    Accordion
                                    <div
                                        className="accordion__arrow"
                                        role="presentation"
                                    />
                                </h3>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>name</th>
                                            <th>type</th>
                                            <th>default</th>
                                            <th>description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>allowMultipleExpanded</td>
                                            <td>Boolean</td>
                                            <td>false</td>
                                            <td>
                                                Open only one item at a time or
                                                not
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>onChange</td>
                                            <td>Function(keys)</td>
                                            <td>noop</td>
                                            <td>
                                                Triggered on change (open/close
                                                items)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>className</td>
                                            <td>String</td>
                                            <td>accordion</td>
                                            <td>
                                                CSS class(es) applied to the
                                                component
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <h3 className="u-position-relative">
                                    AccordionItem
                                    <div
                                        className="accordion__arrow"
                                        role="presentation"
                                    />
                                </h3>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>name</th>
                                            <th>type</th>
                                            <th>default</th>
                                            <th>description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>expanded</td>
                                            <td>Boolean</td>
                                            <td>false</td>
                                            <td>
                                                Expands this item on first
                                                render
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>className</td>
                                            <td>String</td>
                                            <td>accordion__item</td>
                                            <td>
                                                CSS class(es) applied to the
                                                component
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <h3 className="u-position-relative">
                                    AccordionItemHeading
                                    <div
                                        className="accordion__arrow"
                                        role="presentation"
                                    />
                                </h3>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>name</th>
                                            <th>type</th>
                                            <th>default</th>
                                            <th>description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>className</td>
                                            <td>String</td>
                                            <td>accordion__heading</td>
                                            <td>
                                                CSS class(es) applied to the
                                                component
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <h3 className="u-position-relative">
                                    AccordionItemPanel
                                    <div
                                        className="accordion__arrow"
                                        role="presentation"
                                    />
                                </h3>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>name</th>
                                            <th>type</th>
                                            <th>default</th>
                                            <th>description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>className</td>
                                            <td>String</td>
                                            <td>accordion__panel</td>
                                            <td>
                                                CSS class(es) applied to the
                                                component
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>hideBody ClassName</td>
                                            <td>String</td>
                                            <td>accordion__panel--hidden</td>
                                            <td>
                                                Class name for hidden body state
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <h3 className=" u-position-relative u-margin-bottom-s">
                        Development
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                    <div>How to install the project</div>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        Clone the project on your computer, and install Node.
                        This project also uses nvm.
                    </p>
                    <p>
                        nvm install
                        <br />
                        # Then, install all project dependencies.
                        <br />
                        npm install
                        <br />
                        # Set up a `.env` file with the appropriate secrets.
                        <br />
                        touch .env
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>

        <h2 className="u-margin-top">Pre expanded children</h2>

        <Accordion>
            <AccordionItem expanded={true}>
                <AccordionItemHeading>
                    <h3 className="u-position-relative">
                        Working on the project
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        Everything mentioned in the installation process should
                        already be done.
                    </p>
                    <p>
                        # Make sure you use the right node version.
                        <br />
                        nvm use
                        <br />
                        # Start the the development tools in watch mode.
                        <br />
                        yarn start
                        <br />
                        # Runs linting.
                        <br />
                        yarn lint
                        <br />
                        # Runs tests.
                        <br />
                        yarn test
                        <br />
                        # View other available commands with:
                        <br />
                        yarn
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <h3 className=" u-position-relative u-margin-bottom-s">
                        Run the demo
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                    <div>To have an easy play around</div>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        Everything mentioned in the installation process should
                        already be done.
                    </p>
                    <p>
                        # Make sure you use the right node version.
                        <br />
                        nvm use
                        <br />
                        # Start the server and the development tools.
                        <br />
                        yarn start-demo
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>

        <h2 className="u-margin-top">With permanent blocks</h2>

        <Accordion>
            <AccordionItem expanded={false}>
                <AccordionItemHeading>
                    <h3 className="u-position-relative">
                        Working on the project
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        Everything mentioned in the installation process should
                        already be done.
                    </p>
                    <p>
                        # Make sure you use the right node version.
                        <br />
                        nvm use
                        <br />
                        # Start the the development tools in watch mode.
                        <br />
                        yarn start
                        <br />
                        # Runs linting.
                        <br />
                        yarn lint
                        <br />
                        # Runs tests.
                        <br />
                        yarn test
                        <br />
                        # View other available commands with:
                        <br />
                        yarn
                    </p>
                </AccordionItemPanel>
                <div className="block">
                    Please feel free to contribute to this repository
                </div>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <h3 className=" u-position-relative u-margin-bottom-s">
                        Run the demo
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                    <div>To have an easy play around</div>
                </AccordionItemHeading>
                <div className="block">
                    This block fits in between the title and the body.
                </div>
                <AccordionItemPanel>
                    <p>
                        Everything mentioned in the installation process should
                        already be done.
                    </p>
                    <p>
                        # Make sure you use the right node version.
                        <br />
                        nvm use
                        <br />
                        # Start the server and the development tools.
                        <br />
                        yarn start-demo
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>

        <h2 className="u-margin-top">A bit of animation on the arrow?</h2>

        <Accordion>
            <AccordionItem>
                <AccordionItemHeading className="accordion__heading accordion__heading--animated">
                    <h3 className="u-position-relative">
                        Animated Accessible Accordion
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>Did you notice the animation on the arrow?</p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="accordion__item">
                <AccordionItemHeading className="accordion__heading accordion__heading--animated">
                    <h3 className="u-position-relative">
                        How to?
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>Check css/demo.css in the demo/ folder :)</p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>

        <h2 className="u-margin-top">Only one item</h2>

        <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <h3 className="u-position-relative">
                        Single item
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>Why would you need more than one?</p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>

        <h2 className="u-margin-top">Informative onChange</h2>

        <Accordion
            // tslint:disable-next-line react-this-binding-issue jsx-no-lambda
            onChange={(itemUuid: string | number): void => {
                // tslint:disable-next-line no-console
                console.log(itemUuid);
            }}
        >
            <AccordionItem uuid="uniqueItem-1">
                <AccordionItemHeading>
                    <h3 className="u-position-relative">
                        Unique Item #1
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        If you open/close this item you should see
                        `uniqueItem-1` printed in the console.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem uuid="uniqueItem-2">
                <AccordionItemHeading>
                    <h3 className="u-position-relative">
                        Unique Item #2
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        If you open/close this item you should see
                        `uniqueItem-2` printed in the console.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    </div>
);

ReactDOM.render(<Example />, document.getElementById('app-root'));
