import React from "react";

type Props = {
    accordion?: boolean;
    onChange?: (keys: number[] | string[]) => number[] | string[];
    className?: string;
};

declare class Accordion extends React.Component<Props> {}
export default Accordion;
