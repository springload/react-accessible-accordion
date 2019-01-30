import * as React from 'react';

type AccordionItemStateProps = React.HTMLAttributes<HTMLDivElement> & {
    expanded: boolean;
    children(expanded: boolean): React.ReactNode;
};

const AccordionItemState = (props: AccordionItemStateProps): JSX.Element => {
    return <>{props.children(props.expanded)}</>;
};
export default AccordionItemState;
