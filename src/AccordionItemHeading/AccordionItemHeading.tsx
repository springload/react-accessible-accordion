import { default as classnames } from 'classnames';
import * as React from 'react';
import { UUID } from '../ItemContainer/ItemContainer';

type AccordionItemHeadingProps = React.HTMLAttributes<HTMLDivElement> & {
    hideBodyClassName: string;
    expanded: boolean;
    uuid: UUID;
    disabled: boolean;
    focus: boolean;
    removeFocus(uuid: UUID): void;
    setExpanded(uuid: UUID, expanded: boolean): void;
    setFocusToHead(): void;
    setFocusToTail(): void;
    setFocusToPrevious(uuid: UUID): void;
    setFocusToNext(uuid: UUID): void;
};

type AccordionItemHeadingState = {};

export default class AccordionItemHeading extends React.Component<
    AccordionItemHeadingProps,
    AccordionItemHeadingState
> {
    focusRef: React.RefObject<HTMLDivElement> = React.createRef();

    componentDidUpdate(): void {
        if (this.props.focus) {
            this.focusRef.current.focus();
        }
    }

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

    handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>): void => {
        const {
            uuid,
            setFocusToHead,
            setFocusToTail,
            setFocusToPrevious,
            setFocusToNext,
        } = this.props;

        switch (evt.which) {
            case 35:
                evt.preventDefault();
                setFocusToTail();
                break;
            case 36:
                evt.preventDefault();
                setFocusToHead();
                break;
            case 38:
                evt.preventDefault();
                setFocusToPrevious(uuid);
                break;
            case 40:
                evt.preventDefault();
                setFocusToNext(uuid);
                break;
            default:
                evt.preventDefault();
        }
    };

    handleBlur = (): void => {
        this.props.removeFocus(this.props.uuid);
    };

    render(): JSX.Element {
        const {
            className,
            hideBodyClassName,
            setExpanded,
            expanded,
            uuid,
            disabled,
            focus,
            setFocusToHead,
            setFocusToTail,
            setFocusToPrevious,
            setFocusToNext,
            removeFocus,
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
                ref={this.focusRef}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={titleClassName}
                onClick={onClick}
                role={role}
                tabIndex={0}
                onKeyPress={this.handleKeyPress}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleBlur}
                {...rest}
            />
        );
    }
}
