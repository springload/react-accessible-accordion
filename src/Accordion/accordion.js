// @flow

import React, { type ElementProps } from 'react';
import { Provider, Subscribe } from 'unstated';
import AccordionContainer from './accordion.container';

type AccordionProps = ElementProps<'div'> & {
    accordion: boolean,
    onChange: Function,
    accordionStore: ?AccordionContainer,
};

const defaultProps: AccordionProps = {
    accordion: true,
    onChange: () => {},
    className: 'accordion',
    children: null,
    accordionStore: undefined,
};

const Accordion = (props: AccordionProps) => {
    const { accordion, onChange, accordionStore, ...rest } = props;
    accordionStore.init(accordion, onChange);
    return (
        <div
            role={accordionStore.state.accordion ? 'tablist' : null}
            {...rest}
        />
    );
};

const AccordionSubscriber = (props: AccordionProps) => (
    <Subscribe to={[AccordionContainer]}>
        {accordionStore => (
            <Accordion {...props} accordionStore={accordionStore} />
        )}
    </Subscribe>
);

const AccordionProvider = (props: AccordionProps) => (
    <Provider>
        <AccordionSubscriber {...props} />
    </Provider>
);
AccordionProvider.defaultProps = defaultProps;

export default AccordionProvider;
