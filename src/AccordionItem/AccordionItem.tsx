import classNames from 'classnames';
import * as React from 'react';
import { AccordionContainer } from '../AccordionContainer/AccordionContainer';
import { UUID } from '../ItemContainer/ItemContainer';

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
    uuid: UUID;
    hideBodyClassName?: string;
    disabled?: boolean;
    expanded?: boolean;
    accordionStore: AccordionContainer;
};

class AccordionItem extends React.Component<AccordionItemProps> {
    componentDidMount() {
        const { uuid, accordionStore, disabled } = this.props;

        accordionStore.addItem({
            uuid,
            expanded: this.props.expanded || false,
            disabled,
        });
    }

    componentWillUnmount() {
        this.props.accordionStore.removeItem(this.props.uuid);
    }

    // This is here so that the user can dynamically set the 'expanded' state using the 'expanded' prop.
    componentDidUpdate(prevProps: AccordionItemProps) {
        const { uuid, expanded, accordionStore } = this.props;
        if (expanded !== prevProps.expanded) {
            accordionStore.setExpanded(uuid, expanded);
        }
    }

    render() {
        const {
            uuid,
            className,
            hideBodyClassName,
            accordionStore,
            disabled,
            expanded,
            ...rest
        } = this.props;

        // Deliberately not using 'find' because IE compat.
        const currentItem = accordionStore.items.filter(
            item => item.uuid === uuid,
        )[0];

        if (!currentItem) {
            return null;
        }

        return (
            <div
                className={classNames(className, {
                    [String(hideBodyClassName)]:
                        !currentItem.expanded && hideBodyClassName,
                })}
                {...rest}
            />
        );
    }
}

export default AccordionItem;
