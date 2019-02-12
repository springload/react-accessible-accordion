// tslint:disable-next-line no-implicit-dependencies no-import-side-effect
import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import placeholders, { Placeholder } from './placeholders';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState,
} from '../../src';

// tslint:disable-next-line no-import-side-effect
import './main.css';

// tslint:disable-next-line no-import-side-effect ordered-imports
import '../../src/css/fancy-example.css';

const renderFn = (expanded: boolean): JSX.Element => {
    return expanded ? <>This item is expanded</> : <>This item is collapsed</>;
};

const Arrow = (): JSX.Element => (
    <span className="accordion__arrow" role="presentation" />
);

// tslint:disable-next-line max-func-body-length
const App = (): JSX.Element => (
    <div className="demo-container">
        <h1>React Accessible Accordion</h1>

        <p>
            React Component for creating an 'Accordion' that adheres to the{' '}
            <a
                href="https://www.w3.org/TR/wai-aria-practices-1.1/#accordion"
                target="_BLANK"
                rel="noreferrer, nofollow"
            >
                WAI ARIA spec
            </a>{' '}
            for accessibility.
        </p>

        <h2 className="u-margin-top">Default behaviour</h2>

        <p>
            By default, only one item may be expanded and it can only be
            collapsed again by expanding another.
        </p>

        <Accordion>
            {placeholders.map((placeholder: Placeholder) => (
                <AccordionItem key={placeholder.heading}>
                    <AccordionItemHeading>
                        <Arrow />
                        {placeholder.heading}
                    </AccordionItemHeading>
                    <AccordionItemPanel>{placeholder.panel}</AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>

        <h2 className="u-margin-top">Expanding multiple items at once</h2>

        <p>
            If you set <strong>allowMultipleExpanded</strong> to{' '}
            <strong>true</strong> then the accordion will permit multiple items
            to be expanded at once.
        </p>

        <Accordion allowMultipleExpanded={true}>
            {placeholders.map((placeholder: Placeholder) => (
                <AccordionItem key={placeholder.heading}>
                    <AccordionItemHeading>
                        <Arrow />
                        {placeholder.heading}
                    </AccordionItemHeading>
                    <AccordionItemPanel>{placeholder.panel}</AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>

        <h2 className="u-margin-top">Collapsing the last expanded item</h2>

        <p>
            If you set <strong>allowZeroExpanded</strong> to{' '}
            <strong>true</strong> then a solitary expanded item may be collapsed
            again.
        </p>

        <Accordion allowZeroExpanded={true}>
            {placeholders.map((placeholder: Placeholder) => (
                <AccordionItem key={placeholder.heading}>
                    <AccordionItemHeading>
                        <Arrow />
                        {placeholder.heading}
                    </AccordionItemHeading>
                    <AccordionItemPanel>{placeholder.panel}</AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>

        <h2 className="u-margin-top">Pre-expanded items</h2>

        <p>
            If you set <strong>preExpanded</strong>, then you can choose which
            items are expanded on mount.
        </p>

        <p>
            The strings passed to <strong>preExpanded</strong> are directly
            related to the <strong>uuid</strong> props of{' '}
            <strong>AccordionItem</strong>.
        </p>

        <Accordion preExpanded={[placeholders[0].uuid]}>
            {placeholders.map((placeholder: Placeholder) => (
                <AccordionItem
                    key={placeholder.heading}
                    uuid={placeholder.uuid}
                >
                    <AccordionItemHeading>
                        <Arrow />
                        {placeholder.heading}
                    </AccordionItemHeading>
                    <AccordionItemPanel>{placeholder.panel}</AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>

        <h2 className="u-margin-top">Informative onChange</h2>

        <p>
            When you use the <strong>onChange</strong> prop, you can get
            feedback about which items are expanded.
        </p>

        <p>
            In this example, we are simply logging the uuids of the expanded
            items to the console. Have a click around then check your console to
            see this in action.
        </p>

        <Accordion
            // tslint:disable-next-line react-this-binding-issue jsx-no-lambda
            onChange={(itemUuids: (string | number)[]): void => {
                // tslint:disable-next-line no-console
                console.log(itemUuids);
            }}
        >
            {placeholders.map((placeholder: Placeholder) => (
                <AccordionItem
                    key={placeholder.heading}
                    uuid={placeholder.uuid}
                >
                    <AccordionItemHeading>
                        <Arrow />
                        {placeholder.heading}
                    </AccordionItemHeading>
                    <AccordionItemPanel>{placeholder.panel}</AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>

        <h2 className="u-margin-top" />

        <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <Arrow />
                    Render something different when expanded
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        When you open/close this item, you should see the text
                        under the heading change.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <Arrow />
                    How to?
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        Pass the AccordionItemState component a render prop
                        function.
                    </p>
                    <p>
                        This should take the item's expanded state as an
                        argument.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    </div>
);

ReactDOM.render(<App />, document.getElementById('app-root'));
