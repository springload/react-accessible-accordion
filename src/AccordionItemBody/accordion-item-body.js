// @flow

import React, { type ElementProps } from 'react';
import classNames from 'classnames';

type AccordionItemBodyProps = ElementProps<'div'> & {
    hideBodyClassName: string,
    uuid: string | number,
};

const AccordionItemBody = (props: AccordionItemBodyProps) => {
    const {
        accordionStore,
        uuid,
        className,
        hideBodyClassName,
        ...rest
    } = props;
    const { state: { items, accordion } } = props.accordionStore;
    const foundItem = items.find(item => item.uuid === uuid);
    if (!foundItem) return null;

    const { expanded } = foundItem;
    const id = `accordion__body-${uuid}`;
    const ariaLabelledby = `accordion__title-${uuid}`;
    const role = accordion ? 'tabpanel' : null;

    const bodyClass = classNames(className, {
        [hideBodyClassName]: !expanded,
    });
    const ariaHidden = !expanded;
    return (
        <div
            id={id}
            className={bodyClass}
            aria-hidden={ariaHidden}
            aria-labelledby={ariaLabelledby}
            role={role}
            {...rest}
        />
    );
};

export default AccordionItemBody;
