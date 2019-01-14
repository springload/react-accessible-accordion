import { default as classnames } from 'classnames';
import * as React from 'react';
import { UUID } from '../ItemContainer/ItemContainer';

type AccordionItemTitleProps = React.HTMLAttributes<HTMLDivElement> & {
    hideBodyClassName: string;
    expanded: boolean;
    uuid: UUID;
    disabled: boolean;
    accordion: boolean;
    setExpanded(uuid: UUID, expanded: boolean): void;
};

type AccordionItemTitleState = {};

export default class AccordionItemTitle extends React.Component<
    AccordionItemTitleProps,
    AccordionItemTitleState
> {
    handleClick = (): void => {
        const { uuid, expanded, setExpanded } = this.props;

        setExpanded(uuid, !expanded);
    };

    handleKeyPress = (evt: React.KeyboardEvent<HTMLDivElement>): void => {
        if (evt.charCode === 13 || evt.charCode === 32) {
            evt.preventDefault();
            this.handleClick();
        }
    };

    render(): JSX.Element {
        const {
            className,
            hideBodyClassName,
            accordion,
            setExpanded,
            expanded,
            uuid,
            disabled,
            ...rest
        } = this.props;

        const id = `accordion__title-${uuid}`;
        const ariaControls = `accordion__body-${uuid}`;
        const role = 'button';
        const titleClassName = classnames(className, {
            [hideBodyClassName]: hideBodyClassName && !expanded,
        });
        const onClick = disabled ? undefined : this.handleClick;

        return (
            <div
                id={id}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={titleClassName}
                onClick={onClick}
                role={role}
                tabIndex={0}
                onKeyPress={this.handleKeyPress}
                {...rest}
            />
        );
    }
}
