// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { type Store } from '../accordionStore/accordionStore';

const defaultProps = {
    className: 'accordion__body',
    hideBodyClassName: 'accordion__body--hidden',
};

type AccordionItemBodyProps = {
    children: Node,
    className: string,
    hideBodyClassName: string,
    accordionStore: Store,
    uuid: string | number,
};

const AccordionItemBody = (props: AccordionItemBodyProps) => {
    const { uuid, children, className, hideBodyClassName } = props;
    const { items, accordion } = props.accordionStore;
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
        >
            {children}
        </div>
    );
};

AccordionItemBody.defaultProps = defaultProps;

export default inject('accordionStore', 'uuid')(observer(AccordionItemBody));
