// @flow

import React, { Component, type ElementProps } from 'react';
import { Provider } from 'mobx-react';
import { createAccordionStore } from '../accordionStore/accordionStore';

type AccordionProps = ElementProps<'div'> & {
    accordion: boolean,
    onChange: Function,
};

class Accordion extends Component<AccordionProps, *> {
    static defaultProps = {
        accordion: true,
        onChange: () => {},
        className: 'accordion',
        children: null,
    };

    accordionStore = createAccordionStore({
        accordion: this.props.accordion,
        onChange: this.props.onChange,
    });

    render() {
        const { accordion: accordionProp, onChange, ...rest } = this.props;
        const { accordion } = this.accordionStore;

        return (
            <Provider accordionStore={this.accordionStore}>
                <div role={accordion ? 'tablist' : null} {...rest} />
            </Provider>
        );
    }
}

export default Accordion;
