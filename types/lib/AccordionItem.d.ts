import React from "react";

type Props = {
    uuid?: string | number;
    hideBodyClassName?: string;
    className?: string;
    expanded?: boolean;
};

declare var AccordionItem: React.Component<Props>;
export default AccordionItem;
