import React from "react";

type Props = {
    uuid?: string | number;
    hideBodyClassName?: string;
    className?: string;
    expanded?: boolean;
};

declare class AccordionItem extends React.Component<Props> {}
export default AccordionItem;
