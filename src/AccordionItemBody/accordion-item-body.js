// @flow

import React, { type ElementProps } from 'react';
import classNames from 'classnames';

type AccordionItemBodyProps = ElementProps<'div'> & {
    hideBodyClassName: string,
    uuid: string | number,
    expanded: boolean,
    disabled: boolean,
    accordion: boolean,
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
