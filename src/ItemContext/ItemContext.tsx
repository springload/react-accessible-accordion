// tslint:disable:max-classes-per-file

import * as React from 'react';
import {
    AccordionContext,
    Consumer as AccordionContextConsumer,
} from '../AccordionContext/AccordionContext';
import {
    InjectedHeadingAttributes,
    InjectedPanelAttributes,
} from '../AccordionStore/AccordionStore';

export type UUID = string | number;

type ProviderProps = {
    children?: React.ReactNode;
    uuid: UUID;
    accordionContext: AccordionContext;
};

export type ProviderWrapperProps = Pick<
    ProviderProps,
    Exclude<keyof ProviderProps, 'accordionContext'>
>;

export type ItemContext = {
    uuid: UUID;
    expanded: boolean;
    disabled: boolean;
    panelAttributes: InjectedPanelAttributes;
    headingAttributes: InjectedHeadingAttributes;
    toggleExpanded(): void;
};

const Context = React.createContext(null as ItemContext | null);

class Provider extends React.Component<ProviderProps> {
    toggleExpanded = (): void => {
        this.props.accordionContext.toggleExpanded(this.props.uuid);
    };

    renderChildren = (accordionContext: AccordionContext): JSX.Element => {
        const { uuid } = this.props;

        const expanded = accordionContext.isItemDisabled(uuid);
        const disabled = accordionContext.isItemDisabled(uuid);
        const panelAttributes = accordionContext.getPanelAttributes(uuid);
        const headingAttributes = accordionContext.getHeadingAttributes(uuid);

        return (
            <Context.Provider
                value={{
                    uuid,
                    expanded,
                    disabled,
                    toggleExpanded: this.toggleExpanded,
                    panelAttributes,
                    headingAttributes,
                }}
                children={this.props.children}
            />
        );
    };

    render(): JSX.Element {
        return (
            <AccordionContextConsumer>
                {this.renderChildren}
            </AccordionContextConsumer>
        );
    }
}

const ProviderWrapper: React.SFC<ProviderWrapperProps> = (
    props: ProviderWrapperProps,
): JSX.Element => (
    <AccordionContextConsumer>
        {(accordionContext: AccordionContext): JSX.Element => (
            <Provider {...props} accordionContext={accordionContext} />
        )}
    </AccordionContextConsumer>
);

export { ProviderWrapper as Provider };

type ConsumerProps = {
    children(container: ItemContext): React.ReactNode;
};

export class Consumer extends React.PureComponent<ConsumerProps> {
    renderChildren = (container: ItemContext | null): React.ReactNode => {
        return container ? this.props.children(container) : null;
    };

    render(): JSX.Element {
        return <Context.Consumer>{this.renderChildren}</Context.Consumer>;
    }
}
