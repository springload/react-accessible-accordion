import * as React from 'react';

type AccordionItemStateProps = React.HTMLAttributes<HTMLDivElement> & {
    expanded: boolean;
    render(expanded: boolean): React.ReactNode;
};

const AccordionItemState = (props: AccordionItemStateProps): JSX.Element => {
    return <>{props.render(props.expanded)}</>;
};
export default AccordionItemState;
