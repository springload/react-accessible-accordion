import { default as classnames } from 'classnames';
import * as React from 'react';
import { UUID } from '../ItemContainer/ItemContainer';

type AccordionItemPanelProps = React.HTMLAttributes<HTMLDivElement> & {
    hideBodyClassName: string;
    uuid: UUID;
    expanded: boolean;
    allowMultipleExpanded: boolean;
};

const AccordionItemPanel = (props: AccordionItemPanelProps): JSX.Element => {
    const {
        className,
        hideBodyClassName,
        uuid,
        expanded,
        allowMultipleExpanded,
        ...rest
    } = props;

    const role = allowMultipleExpanded ? null : 'region';
    const hideAriaAttribute = allowMultipleExpanded ? !expanded : null;

    return (
        <div
            id={`accordion__panel-${uuid}`}
            className={classnames(className, {
                [hideBodyClassName]: !expanded,
            })}
            aria-hidden={hideAriaAttribute}
            aria-labelledby={`accordion__heading-${uuid}`}
            role={role}
            {...rest}
        />
    );
};

export default AccordionItemPanel;
