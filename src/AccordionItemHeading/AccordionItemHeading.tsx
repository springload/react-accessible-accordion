import { default as classnames } from 'classnames';
import * as React from 'react';
import { UUID } from '../ItemContainer/ItemContainer';

type AccordionItemHeadingProps = React.HTMLAttributes<HTMLDivElement> & {
    hideBodyClassName: string;
    expanded: boolean;
    uuid: UUID;
    disabled: boolean;
    setExpanded(uuid: UUID, expanded: boolean): void;
};

type AccordionItemHeadingState = {};

export default class AccordionItemHeading extends React.Component<
    AccordionItemHeadingProps,
    AccordionItemHeadingState
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
            setExpanded,
            expanded,
            uuid,
            disabled,
            ...rest
        } = this.props;

        const id = `accordion__heading-${uuid}`;
        const ariaControls = `accordion__panel-${uuid}`;
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
