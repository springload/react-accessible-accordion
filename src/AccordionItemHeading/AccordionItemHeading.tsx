import { default as classnames } from 'classnames';
import * as React from 'react';
import { UUID } from '../ItemContainer/ItemContainer';

type AccordionItemHeadingProps = React.HTMLAttributes<HTMLDivElement> & {
    expandedClassName: string;
    expanded: boolean;
    uuid: UUID;
    disabled: boolean;
    setExpanded(uuid: UUID, expanded: boolean): void;
};

type AccordionItemHeadingState = {};

const getClosest = (el, selector) => {
    return el && (el.matches(selector) ? el : getClosest(el.parentNode, selector));
};

const focusNextHeading = (evt, el) => {
    if(el !== evt.target) {
        const nextControl = el.querySelector('[data-aria-control]');
        evt.preventDefault();
        nextControl.focus();
    }
};

export default class AccordionItemHeading extends React.Component<
    AccordionItemHeadingProps,
    AccordionItemHeadingState
> {
    handleClick = (): void => {
        const { uuid, expanded, setExpanded } = this.props;

        setExpanded(uuid, !expanded);
    };

    handleKeyPress = (evt: React.KeyboardEvent<HTMLDivElement>): void => {
        const keyCode = evt.which.toString();
        const parentSelector = '[data-accordion]';
        const parentAccordion = getClosest(evt.target, parentSelector);

        switch (keyCode) {
            case '13':
            case '32':
                evt.preventDefault();
                this.handleClick();
                break;
            case '36':
                // home
                focusNextHeading(evt, parentAccordion.firstChild);
                break;
            case '35':
                // end
                focusNextHeading(evt, parentAccordion.lastChild);
                break;
            default:
                break;
        }
    };

    render(): JSX.Element {
        const {
            className,
            expandedClassName,
            setExpanded,
            expanded,
            uuid,
            disabled,
            ...rest
        } = this.props;

        const id = `accordion__heading-${uuid}`;
        const ariaControls = `accordion__panel-${uuid}`;

        const headingClassName = classnames(className, {
            [expandedClassName]: expandedClassName && expanded,
        });

        return (
            <div
                id={id}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={headingClassName}
                aria-disabled={disabled}
                onClick={this.handleClick}
                role="button"
                tabIndex={0}
                data-aria-control={true}
                onKeyDown={this.handleKeyPress}
                {...rest}
            />
        );
    }
}