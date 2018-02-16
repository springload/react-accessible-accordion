// @flow

import React, { Component, type Node } from 'react';
import { Provider } from 'mobx-react';
import { createAccordionStore } from '../accordionStore/accordionStore';

type AccordionProps = {
    accordion: boolean,
    children: Node,
    // activeItems: Array<string | number>,
    className: string,
    onChange: Function,
};

class Accordion extends Component<AccordionProps, *> {
    static defaultProps = {
        accordion: true,
        onChange: () => {},
        className: 'accordion',
        activeItems: [],
    };

    accordionStore = createAccordionStore({
        accordion: this.props.accordion,
        onChange: this.props.onChange,
    });

    render() {
        const { className, children } = this.props;
        const { accordion } = this.accordionStore;

        return (
            <Provider accordionStore={this.accordionStore}>
                <div role={accordion ? 'tablist' : null} className={className}>
                    {children}
                </div>
            </Provider>
        );
    }
}

export default Accordion;
