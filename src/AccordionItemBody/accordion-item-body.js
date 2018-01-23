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
        activeItems: Array<string | number>,
        accordion: boolean,
        onChange: Function,
    },
    accordionItemStore: {
        itemKey: string | number,
        itemUuid: string,
        expanded: boolean,
    },
};

const AccordionItemBody = (props: AccordionItemBodyProps) => {
    const { accordion } = props.accordionStore;
    const { itemUuid, expanded } = props.accordionItemStore;
    const { children, className, hideBodyClassName } = props;

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

export default inject('accordionStore', 'accordionItemStore')(
    observer(AccordionItemBody),
);
