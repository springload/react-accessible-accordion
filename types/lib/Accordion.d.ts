import React from "react";

type Props = {
    accordion?: boolean;
    onChange?: (keys: number[] | string[]) => number[] | string[];
    className?: string;
};

declare var Accordion: React.Component<Props>;
export default Accordion;
