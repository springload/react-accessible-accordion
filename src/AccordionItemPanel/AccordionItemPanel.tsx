import { default as classnames } from 'classnames';
import * as React from 'react';
import { UUID } from '../ItemContainer/ItemContainer';

type AccordionItemPanelProps = React.HTMLAttributes<HTMLDivElement> & {
    expandedClassName: string;
    uuid: UUID;
    expanded: boolean;
    allowMultipleExpanded: boolean;
};

const AccordionItemPanel: React.SFC<AccordionItemPanelProps> = ({
    className,
    expandedClassName,
    uuid,
    expanded,
    allowMultipleExpanded,
    ...rest
}: AccordionItemPanelProps): JSX.Element => {
    const role = allowMultipleExpanded ? null : 'region';
    const hideAriaAttribute = allowMultipleExpanded ? !expanded : null;

    return (
        <div
            id={`accordion__panel-${uuid}`}
            className={classnames(className, {
                [expandedClassName]: expanded,
            })}
            aria-hidden={hideAriaAttribute}
            aria-labelledby={`accordion__heading-${uuid}`}
            role={role}
            {...rest}
        />
    );
};
export default AccordionItemPanel;
