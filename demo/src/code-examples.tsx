export const ExampleDefault = `import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';

<Accordion>
    {items.map((item) => (
        <AccordionItem key={item.uuid}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    {item.heading}
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {item.content}
            </AccordionItemPanel>
        </AccordionItem>
    ))}
</Accordion>`;

export const ExampleAllowMultipleExpanded = `<Accordion allowMultipleExpanded>
    {items.map((item) => (
        <AccordionItem key={item.uuid}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    {item.heading}
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {item.content}
            </AccordionItemPanel>
        </AccordionItem>
    ))}
</Accordion>`;

export const ExampleAllowMultipleExpandedFalse = `<Accordion allowMultipleExpanded={false}>
    {items.map((item) => (
        <AccordionItem key={item.uuid}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    {item.heading}
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {item.content}
            </AccordionItemPanel>
        </AccordionItem>
    ))}
</Accordion>`;

export const ExampleAllowZeroExpanded = `<Accordion allowZeroExpanded>
    {items.map((item) => (
        <AccordionItem key={item.uuid}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    {item.heading}
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {item.content}
            </AccordionItemPanel>
        </AccordionItem>
    ))}
</Accordion>`;

export const ExamplePreExpanded = `<Accordion preExpanded={['a', 'c']}>
  <AccordionItem uuid="a" /> // Will be expanded by default
  <AccordionItem uuid="b" />
  <AccordionItem uuid="c" /> // Will be expanded by default
  <AccordionItem uuid="d" />
</Accordion>`;

export const ExampleOnChange = `<Accordion onChange={() => console.log('Hello world')}>
    {items.map((item) => (
        <AccordionItem key={item.uuid}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    {item.heading}
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {item.content}
            </AccordionItemPanel>
        </AccordionItem>
    ))}
</Accordion>`;

export const ExampleAccordionItemState = `<Accordion>
    <AccordionItem>
        <AccordionItemHeading>
            <AccordionItemButton>
                This item is 
                <AccordionItemState>
                    {({ expanded }) => (expanded ? 'expanded' : 'collapsed')}
                </AccordionItemState>
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p>I am the content</p>
        </AccordionItemPanel>
    </AccordionItem>
</Accordion>`;

export const ExampleDangerouslySetExpanded = `<Accordion>
    {items.map((item, i) => {
        const isExpanded = i < 2;

        return (
            <AccordionItem
                key={item.heading}
                uuid={item.uuid}
                dangerouslySetExpanded={isExpanded}
            >
                <AccordionItemHeading>
                    <AccordionItemButton>
                        {item.heading}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    {item.panel}
                </AccordionItemPanel>
            </AccordionItem>
        );
    })}
  </Accordion>`;
