import * as React from 'react';
import classNames from 'classnames';
import { UUID } from '../ItemContainer/ItemContainer';

type AccordionItemBodyProps = React.HTMLProps<HTMLDivElement> & {
    hideBodyClassName: string;
    uuid: UUID;
    expanded: boolean;
    disabled: boolean;
    accordion: boolean;
};

const AccordionItemBody = (props: AccordionItemBodyProps) => {
    const {
        className,
        hideBodyClassName,
        uuid,
        expanded,
        disabled,
        accordion,
        ...rest
    } = props;

    return (
        <div
            id={`accordion__body-${uuid}`}
            className={classNames(className, {
                [hideBodyClassName]: !expanded,
            })}
            aria-hidden={!expanded}
            aria-labelledby={`accordion__title-${uuid}`}
            role={accordion ? 'tabpanel' : null}
            {...rest}
        />
    );
};

export default AccordionItemBody;
