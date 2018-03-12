// @flow

import React, { Component } from 'react';
import type { ElementProps } from 'react';
import consecutive from 'consecutive';
import classNames from 'classnames';
import { Subscribe } from 'unstated';
import AccordionContainer from '../Accordion/accordion.container';

let nextUuid = consecutive();
export function resetNextUuid() {
    nextUuid = consecutive();
}

type AccordionItemProps = ElementProps<'div'> & {
    hideBodyClassName: string,
    disabled: boolean,
    expanded: boolean,
    accordionStore: ?AccordionContainer,
};

const defaultProps = {
    className: 'accordion__item',
    hideBodyClassName: '',
    disabled: false,
    expanded: false,
    accordionStore: undefined,
};

class AccordionItem extends Component<AccordionItemProps, *> {
    uuid = nextUuid();

    componentWillMount() {
        const { accordionStore, disabled } = this.props;

        accordionStore.addItem({
            uuid: this.uuid,
            expanded: this.props.expanded || false,
            disabled,
        });
    }

    componentWillUnmount() {
        this.props.accordionStore.removeItem(this.uuid);
    }

    // This is here so that the user can dynamically set the 'expanded' state using the 'expanded' prop.
    componentWillReceiveProps({
        expanded,
        accordionStore,
    }: AccordionItemProps) {
        if (expanded !== this.props.expanded) {
            accordionStore.setExpanded(this.uuid, expanded);
        }
    }

    render() {
        const {
            className,
            hideBodyClassName,
            accordionStore,
            disabled,
            expanded: expandedProp,
            ...rest
        } = this.props;

        const currentItem = accordionStore.state.items.find(
            item => item.uuid === this.uuid,
        );

        if (!currentItem) {
            return null;
        }
        const { expanded } = currentItem;

        return (
            <div
                className={classNames(className, {
                    [hideBodyClassName]: !expanded && hideBodyClassName,
                })}
                {...rest}
            />
        );
    }
}

const AccordionItemSubscriber = (props: AccordionItemProps) => (
    <Subscribe to={[AccordionContainer]}>
        {accordionStore => (
            <AccordionItem {...props} accordionStore={accordionStore} />
        )}
    </Subscribe>
);
AccordionItemSubscriber.defaultProps = defaultProps;

export default AccordionItemSubscriber;
