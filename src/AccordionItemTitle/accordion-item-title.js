// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import classNames from 'classnames';

type AccordionItemTitleProps = {
    id: string,
    expanded: boolean,
    onClick: Function,
    ariaControls: string,
    children: Node,
    className: string,
    hideBodyClassName: string,
    role: string,
    level: number,
};

type AccordionItemTitleState = {};

class AccordionItemTitle extends Component<
    AccordionItemTitleProps,
    AccordionItemTitleState,
> {
    static accordionElementName = 'AccordionItemTitle';

    static defaultProps = {
        id: '',
        expanded: false,
        onClick: () => {},
        ariaControls: '',
        className: 'accordion__title',
        hideBodyClassName: '',
        role: '',
        level: 0,
    };

    handleKeyPress(evt: SyntheticInputEvent<HTMLButtonElement>) {
        const { onClick } = this.props;
        if (evt.charCode === 13 || evt.charCode === 32) {
            onClick();
        }
    }

    handleKeyPress = this.handleKeyPress.bind(this);

    render() {
        const {
            id,
            expanded,
            ariaControls,
            onClick,
            children,
            className,
            role,
            hideBodyClassName,
            level,
        } = this.props;
        const titleClassName = classNames(className, {
            [hideBodyClassName]: hideBodyClassName && !expanded,
        });

        if (role === 'heading') {
            return (
                <div aria-level={level} role={role}>
                    <div
                        id={id}
                        aria-expanded={expanded}
                        aria-controls={ariaControls}
                        className={titleClassName}
                        onClick={onClick}
                        role="button"
                        tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
                        onKeyPress={this.handleKeyPress}
                    >
                        {children}
                    </div>
                </div>
            );
        }
        return (
            <div
                id={id}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={titleClassName}
                onClick={onClick}
                role={role}
                tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
                onKeyPress={this.handleKeyPress}
            >
                {children}
            </div>
        );
    }
}

export default AccordionItemTitle;
