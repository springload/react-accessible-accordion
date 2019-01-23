import { default as classnames } from 'classnames';
import * as React from 'react';
import {
    AccordionContainer,
    Item,
} from '../AccordionContainer/AccordionContainer';
import { UUID } from '../ItemContainer/ItemContainer';

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
    uuid: UUID;
    hideBodyClassName?: string;
    disabled?: boolean;
    expanded?: boolean;
    focus?: boolean;
    accordionStore: AccordionContainer;
};

class AccordionItem extends React.Component<AccordionItemProps> {
    componentDidMount(): void {
        const { uuid, accordionStore, disabled, focus } = this.props;

        accordionStore.addItem({
            uuid,
            expanded: this.props.expanded || false,
            disabled,
            focus,
        });
    }

    componentWillUnmount(): void {
        this.props.accordionStore.removeItem(this.props.uuid);
    }

    // This is here so that the user can dynamically set the 'expanded' state using the 'expanded' prop.
    componentDidUpdate(prevProps: AccordionItemProps): void {
        const { uuid, expanded, accordionStore } = this.props;
        if (expanded !== prevProps.expanded) {
            accordionStore.setExpanded(uuid, expanded);
        }
    }

    render(): JSX.Element {
        const {
            uuid,
            className,
            hideBodyClassName,
            accordionStore,
            disabled,
            expanded,
            focus,
            ...rest
        } = this.props;

        // Deliberately not using 'find' because IE compat.
        const currentItem = accordionStore.items.filter(
            (item: Item) => item.uuid === uuid,
        )[0];

        if (!currentItem) {
            return null;
        }

        return (
            <div
                className={classnames(className, {
                    [String(hideBodyClassName)]:
                        !currentItem.expanded && hideBodyClassName,
                })}
                {...rest}
            />
        );
    }
}

export default AccordionItem;
