// tslint:disable-next-line no-implicit-dependencies no-import-side-effect
import * as React from 'react';
// tslint:disable-next-line no-implicit-dependencies no-import-side-effect
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// tslint:disable-next-line no-implicit-dependencies no-import-side-effect no-submodule-imports
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
// tslint:disable-next-line no-implicit-dependencies no-import-side-effect no-submodule-imports
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);

import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState,
} from '../../../src';

type Props = {
    code: string;
};

type AccordionItemState = {
    expanded: boolean;
};

const Code = ({ code }: Props) => {
    return (
        <Accordion allowZeroExpanded={true} className="code">
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton className="code__button">
                        <AccordionItemState>
                            {({ expanded }: AccordionItemState) =>
                                expanded ? 'Hide' : 'Show'
                            }
                        </AccordionItemState>{' '}
                        code
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="code__panel">
                    {/* tslint:disable-next-line no-unsafe-any */}
                    <SyntaxHighlighter language="jsx" style={prism}>
                        {code}
                    </SyntaxHighlighter>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default Code;
