import * as React from 'react';
import classNames from 'classnames';
import { UUID } from '../ItemContainer/ItemContainer';

type AccordionItemTitleProps = React.HTMLAttributes<HTMLDivElement> & {
    hideBodyClassName: string;
    expanded: boolean;
    uuid: UUID;
    disabled: boolean;
    accordion: boolean;
    setExpanded: (UUID, boolean) => any;
};

type AccordionItemTitleState = {};

class AccordionItemTitle extends React.Component<
    AccordionItemTitleProps,
    AccordionItemTitleState
> {
    static accordionElementName = 'AccordionItemTitle';

    handleClick = () => {
        const { uuid, expanded, setExpanded } = this.props;

        setExpanded(uuid, !expanded);
    };

    handleKeyPress = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.charCode === 13 || evt.charCode === 32) {
            evt.preventDefault();
            this.handleClick();
        }
    };

    render() {
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
        const role = accordion ? 'tab' : 'button';
        const titleClassName = classNames(className, {
            [hideBodyClassName]: hideBodyClassName && !expanded,
        });

        if (role === 'tab') {
            return (
                <div
                    id={id}
                    aria-selected={expanded}
                    aria-controls={ariaControls}
                    className={titleClassName}
                    onClick={disabled ? undefined : this.handleClick}
                    role={role}
                    tabIndex={0}
                    onKeyPress={this.handleKeyPress}
                    {...rest}
                />
            );
        }
        return (
            <div
                id={id}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={titleClassName}
                onClick={disabled ? undefined : this.handleClick}
                role={role}
                tabIndex={0}
                onKeyPress={this.handleKeyPress}
                {...rest}
            />
        );
    }
}

export default AccordionItemTitle;
