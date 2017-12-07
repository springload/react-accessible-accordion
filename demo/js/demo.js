import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from '../../src';

import '../css/demo.css';
import '../../src/react-accessible-accordion.css';

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItems: [0, 1],
            value: '',
        };
        this.changeActiveItems = this.changeActiveItems.bind(this);
    }

    handleChange = evt => {
        this.setState({
            value: evt.target.value,
        });
    };

    changeActiveItems(activeItems) {
        this.setState({
            activeItems,
        });
    }

    render() {
        return (
            <div className="demo-container">
                <h2>Issue 33</h2>

                <Accordion accordion>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                Open and try to write something in the input
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <input
                                onChange={this.handleChange}
                                value={this.state.value}
                            />
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3>Another Child</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            Just not to be alone
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>

                <h2 className="u-margin-top">Default settings</h2>

                <Accordion>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                Accessible Accordion
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                Accessible Accordion component for React.
                                Inspired by{' '}
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
                                </a>.
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem className="accordion__item">
                        <AccordionItemTitle>
                            <h3 className=" u-position-relative u-margin-bottom-s">
                                Components
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                            <div>See all the components from this package</div>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <ul>
                                <li>Accordion</li>
                                <li>AccordionItem</li>
                                <li>AccordionItemTitle</li>
                                <li>AccordionItemBody</li>
                            </ul>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>

                <h2 className="u-margin-top">Allow multiple</h2>

                <Accordion accordion={false}>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                Accordion
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
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
                                        <td>accordion</td>
                                        <td>Boolean</td>
                                        <td>true</td>
                                        <td>
                                            Open only one item at a time or not
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
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                AccordionItem
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
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
                                            Expands this item on first render
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
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                AccordionItemTitle
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
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
                                        <td>accordion__title</td>
                                        <td>
                                            CSS class(es) applied to the
                                            component
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                AccordionItemBody
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
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
                                        <td>accordion__body</td>
                                        <td>
                                            CSS class(es) applied to the
                                            component
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>hideBody ClassName</td>
                                        <td>String</td>
                                        <td>accordion__body--hidden</td>
                                        <td>
                                            Class name for hidden body state
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>

                <h2 className="u-margin-top">Multi Accordion children</h2>

                <Accordion>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                Components API
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <Accordion accordion={false}>
                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <h3 className="u-position-relative">
                                            Accordion
                                            <div
                                                className="accordion__arrow"
                                                role="presentation"
                                            />
                                        </h3>
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
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
                                                    <td>accordion</td>
                                                    <td>Boolean</td>
                                                    <td>true</td>
                                                    <td>
                                                        Open only one item at a
                                                        time or not
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>onChange</td>
                                                    <td>Function(keys)</td>
                                                    <td>noop</td>
                                                    <td>
                                                        Triggered on change
                                                        (open/close items)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>className</td>
                                                    <td>String</td>
                                                    <td>accordion</td>
                                                    <td>
                                                        CSS class(es) applied to
                                                        the component
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </AccordionItemBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <h3 className="u-position-relative">
                                            AccordionItem
                                            <div
                                                className="accordion__arrow"
                                                role="presentation"
                                            />
                                        </h3>
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
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
                                                        Expands this item on
                                                        first render
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>className</td>
                                                    <td>String</td>
                                                    <td>accordion__item</td>
                                                    <td>
                                                        CSS class(es) applied to
                                                        the component
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </AccordionItemBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <h3 className="u-position-relative">
                                            AccordionItemTitle
                                            <div
                                                className="accordion__arrow"
                                                role="presentation"
                                            />
                                        </h3>
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
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
                                                    <td>accordion__title</td>
                                                    <td>
                                                        CSS class(es) applied to
                                                        the component
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </AccordionItemBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <h3 className="u-position-relative">
                                            AccordionItemBody
                                            <div
                                                className="accordion__arrow"
                                                role="presentation"
                                            />
                                        </h3>
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
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
                                                    <td>accordion__body</td>
                                                    <td>
                                                        CSS class(es) applied to
                                                        the component
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>hideBody ClassName</td>
                                                    <td>String</td>
                                                    <td>
                                                        accordion__body--hidden
                                                    </td>
                                                    <td>
                                                        Class name for hidden
                                                        body state
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </AccordionItemBody>
                                </AccordionItem>
                            </Accordion>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className=" u-position-relative u-margin-bottom-s">
                                Development
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                            <div>How to install the project</div>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                Clone the project on your computer, and install
                                Node. This project also uses nvm.
                            </p>
                            <p>
                                nvm install<br />
                                # Then, install all project dependencies.<br />
                                npm install<br />
                                # Install the git hooks.<br />
                                ./.githooks/deploy<br />
                                # Set up a `.env` file with the appropriate
                                secrets.<br />
                                touch .env
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>

                <h2 className="u-margin-top">Pre expanded children</h2>

                <Accordion>
                    <AccordionItem expanded={true}>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                Working on the project
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                Everything mentioned in the installation process
                                should already be done.
                            </p>
                            <p>
                                # Make sure you use the right node version.<br />
                                nvm use<br />
                                # Start the the development tools in watch mode.<br
                                />
                                npm run start<br />
                                # Runs linting.<br />
                                npm run lint<br />
                                # Runs tests.<br />
                                npm run test<br />
                                # View other available commands with:<br />
                                npm run
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className=" u-position-relative u-margin-bottom-s">
                                Run the demo
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                            <div>To have an easy play around</div>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                Everything mentioned in the installation process
                                should already be done.
                            </p>
                            <p>
                                # Make sure you use the right node version.<br />
                                nvm use<br />
                                # Start the server and the development tools.<br
                                />
                                npm run start-demo
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>

                <h2 className="u-margin-top">With permanent blocks</h2>

                <Accordion>
                    <AccordionItem expanded={false}>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                Working on the project
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                Everything mentioned in the installation process
                                should already be done.
                            </p>
                            <p>
                                # Make sure you use the right node version.<br />
                                nvm use<br />
                                # Start the the development tools in watch mode.<br
                                />
                                npm run start<br />
                                # Runs linting.<br />
                                npm run lint<br />
                                # Runs tests.<br />
                                npm run test<br />
                                # View other available commands with:<br />
                                npm run
                            </p>
                        </AccordionItemBody>
                        <div className="block">
                            Please feel free to contribute to this repository
                        </div>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className=" u-position-relative u-margin-bottom-s">
                                Run the demo
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                            <div>To have an easy play around</div>
                        </AccordionItemTitle>
                        <div className="block">
                            This block fits in between the title and the body.
                        </div>
                        <AccordionItemBody>
                            <p>
                                Everything mentioned in the installation process
                                should already be done.
                            </p>
                            <p>
                                # Make sure you use the right node version.<br />
                                nvm use<br />
                                # Start the server and the development tools.<br
                                />
                                npm run start-demo
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>

                <h2 className="u-margin-top">
                    A bit of animation on the arrow?
                </h2>

                <Accordion>
                    <AccordionItem>
                        <AccordionItemTitle className="accordion__title accordion__title--animated">
                            <h3 className="u-position-relative">
                                Animated Accessible Accordion
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>Did you notice the animation on the arrow?</p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem className="accordion__item">
                        <AccordionItemTitle className="accordion__title accordion__title--animated">
                            <h3 className="u-position-relative">
                                How to?
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>Check css/demo.css in the demo/ folder :)</p>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>

                <h2 className="u-margin-top">Only one item</h2>

                <Accordion>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                Single item
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>Why would you need more than one?</p>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>

                <h2 className="u-margin-top">Change active items</h2>

                <div>
                    <button
                        className="btn u-margin-right"
                        onClick={() => this.changeActiveItems([0, 1])}
                    >
                        Default
                    </button>
                    <button
                        className="btn"
                        onClick={() => this.changeActiveItems([2])}
                    >
                        Only third item
                    </button>
                </div>

                <Accordion
                    className="u-margin-top"
                    accordion={false}
                    activeItems={this.state.activeItems}
                >
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                First item
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>This should be open by default.</p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                Second item
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>This shoud be open by default.</p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative">
                                Third item
                                <div
                                    className="accordion__arrow"
                                    role="presentation"
                                />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>This should open when clicking on the button.</p>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>
            </div>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('app-root'));
