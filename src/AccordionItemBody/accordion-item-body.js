// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';

const defaultProps = {
    className: 'accordion__body',
    hideBodyClassName: 'accordion__body--hidden',
};

type AccordionItemBodyProps = {
    children: Node,
    className: string,
    hideBodyClassName: string,
    accordionStore: {
        items: Array<Object>,
        accordion: boolean,
        onChange: Function,
    },
    itemkey: string | number,
};

export const AccordionItemBody = (props: AccordionItemBodyProps) => {
    const { itemkey, children, className, hideBodyClassName } = props;
    const { items, accordion } = props.accordionStore;
    const foundItem = items.find(item => item.itemkey === itemkey);
    if (!foundItem) return null;

    const { itemUuid, expanded } = foundItem;
    const id = `accordion__body-${itemUuid}`;
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
            aria-labelledby={id.replace(
                'accordion__body-',
                'accordion__title-',
            )}
            role={role}
        >
            {children}
        </div>
    );
};

AccordionItemBody.defaultProps = defaultProps;
// We need this to be able to assign correct params to element.
// Minifiers modify component name
AccordionItemBody.accordionElementName = 'AccordionItemBody';

export default inject('accordionStore', 'itemkey')(observer(AccordionItemBody));
