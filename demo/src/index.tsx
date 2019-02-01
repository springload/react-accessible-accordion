// tslint:disable-next-line no-implicit-dependencies no-import-side-effect
import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

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

type Placeholder = {
    heading: string;
    panel: string;
};

const placeholders: Placeholder[] = [
    {
        heading: 'What harsh truths do you prefer to ignore?',
        panel:
            'In pariatur excepteur ut do aliquip qui mollit aliqua exercitation excepteur consequat reprehenderit nostrud laborum voluptate veniam non dolore dolore aliqua incididunt amet nisi minim cillum elit.',
    },
    {
        heading: 'Is free will real or just an illusion?',
        panel:
            'Dolor esse proident nisi minim nisi aute nulla sed proident magna id eiusmod consectetur laborum aliqua minim excepteur sunt anim anim esse aliquip et ea enim proident veniam veniam quis adipisicing nulla amet id commodo.',
    },
    {
        heading: 'Is there a meaning to life? If so, what is it?',
        panel:
            'Consectetur pariatur proident irure proident ea laboris ut do do quis consequat sed officia dolore consequat ut deserunt ea sit sit culpa.',
    },
    {
        heading: 'Is the meaning of life the same for animals and humans?',
        panel:
            'Ex culpa eu veniam ea quis velit exercitation reprehenderit reprehenderit dolore pariatur incididunt occaecat ut irure ut sed dolor veniam sint incididunt esse duis duis dolore sunt aute incididunt amet quis.',
    },
    {
        heading: 'Where is the line between art and not art?',
        panel:
            'Id aute tempor ad sunt et exercitation nulla duis dolore irure elit consectetur laborum reprehenderit veniam nostrud in duis ut duis ullamco dolore do adipisicing sed proident nostrud aute ut ea cupidatat exercitation sit elit.',
    },
];

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

        <h2 className="u-margin-top">Pre expanded children</h2>

        <p>TODO</p>

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
                    uuid={placeholder.heading}
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
