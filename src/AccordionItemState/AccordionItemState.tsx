import * as React from 'react';

type AccordionItemStateProps = React.HTMLAttributes<HTMLDivElement> & {
    expanded: boolean;
    children(expanded: boolean): JSX.Element;
};

const AccordionItemState: React.SFC<AccordionItemStateProps> = (
    props: AccordionItemStateProps,
): JSX.Element => {
    return <React.Fragment>{props.children(props.expanded)}</React.Fragment>;
};
export default AccordionItemState;
