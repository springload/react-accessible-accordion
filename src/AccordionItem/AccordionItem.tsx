import { default as classnames } from 'classnames';
import * as React from 'react';
import { AccordionContext } from '../AccordionContext/AccordionContext';
import { Item } from '../AccordionStore/AccordionStore';
import { UUID } from '../ItemContext/ItemContext';

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
    uuid: UUID;
    expandedClassName?: string;
    expanded?: boolean;
    accordionContext: AccordionContext;
};

class AccordionItem extends React.Component<AccordionItemProps> {
    componentDidMount(): void {
        const { uuid, accordionContext } = this.props;

        accordionContext.addItem({
            uuid,
            expanded: this.props.expanded || false,
        });
    }

    componentWillUnmount(): void {
        this.props.accordionContext.removeItem(this.props.uuid);
    }

    // This is here so that the user can dynamically set the 'expanded' state using the 'expanded' prop.
    componentDidUpdate(prevProps: AccordionItemProps): void {
        const { uuid, expanded, accordionContext } = this.props;
        if (expanded !== prevProps.expanded) {
            accordionContext.setExpanded(uuid, expanded);
        }
    }

    render(): JSX.Element {
        const {
            uuid,
            className,
            expandedClassName,
            accordionContext,
            expanded,
            ...rest
        } = this.props;

        // Deliberately not using 'find' because IE compat.
        const currentItem = accordionContext.items.filter(
            (item: Item) => item.uuid === uuid,
        )[0];

        if (!currentItem) {
            return null;
        }

        return (
            <div
                className={classnames(className, {
                    [String(expandedClassName)]:
                        currentItem.expanded && expandedClassName,
                })}
                {...rest}
            />
        );
    }
}

export default AccordionItem;
