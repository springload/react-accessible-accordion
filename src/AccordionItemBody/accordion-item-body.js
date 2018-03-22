// @flow

import React, { type ElementProps } from 'react';
import classNames from 'classnames';
import { Subscribe } from 'unstated';
import AccordionContainer from '../AccordionContainer/AccordionContainer';
import ItemContainer from '../ItemContainer/ItemContainer';

const defaultProps = {
    className: 'accordion__body',
    hideBodyClassName: 'accordion__body--hidden',
};

type AccordionItemBodyProps = ElementProps<'div'> & {
    hideBodyClassName: string,
    uuid: string | number,
};

type AccordionItemBodyWrapperProps = ElementProps<'div'> & {
    hideBodyClassName: string,
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

const AccordionItemBodyWrapper = (props: AccordionItemBodyWrapperProps) => (
    <Subscribe to={[AccordionContainer, ItemContainer]}>
        {(accordionStore, itemStore) => (
            <AccordionItemBody
                {...props}
                uuid={itemStore.state.uuid}
                accordionStore={accordionStore}
            />
        )}
    </Subscribe>
);
AccordionItemBodyWrapper.defaultProps = defaultProps;

export default AccordionItemBodyWrapper;
