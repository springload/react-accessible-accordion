// tslint:disable react-a11y-anchors

import * as React from 'react';
import { v4 } from 'uuid';

export type Placeholder = {
    uuid: string;
    heading: string;
    panel: JSX.Element;
};

const placeholders: Placeholder[] = [
    {
        uuid: v4(),
        heading: 'What harsh truths do you prefer to ignore?',
        panel: (
            <>
                In pariatur <a href="#">excepteur</a> ut do aliquip qui mollit
                aliqua exercitation <a href="#">excepteur</a> consequat
                reprehenderit nostrud laborum voluptate veniam non dolore dolore
                aliqua incididunt amet nisi minim cillum elit.
            </>
        ),
    },
    {
        uuid: v4(),
        heading: 'Is free will real or just an illusion?',
        panel: (
            <>
                Dolor esse proident nisi minim nisi aute nulla sed proident
                magna id eiusmod consectetur laborum aliqua minim{' '}
                <a href="#">excepteur</a> sunt anim anim esse aliquip et ea enim
                proident veniam veniam quis adipisicing nulla amet id commodo.
            </>
        ),
    },
    {
        uuid: v4(),
        heading: 'Is there a meaning to life? If so, what is it?',
        panel: (
            <>
                Consectetur pariatur proident irure proident ea laboris ut do do
                quis consequat sed officia dolore consequat ut deserunt ea sit
                sit culpa.
            </>
        ),
    },
    {
        uuid: v4(),
        heading: 'Is the meaning of life the same for animals and humans?',
        panel: (
            <>
                Ex culpa eu veniam ea quis velit exercitation reprehenderit
                reprehenderit dolore pariatur incididunt occaecat ut irure ut
                sed dolor veniam sint incididunt esse duis duis dolore sunt aute
                incididunt amet quis.
            </>
        ),
    },
    {
        uuid: v4(),
        heading: 'Where is the line between art and not art?',
        panel: (
            <>
                Id aute tempor ad sunt et exercitation nulla duis dolore irure
                elit consectetur laborum reprehenderit veniam nostrud in duis ut
                duis ullamco dolore do adipisicing sed proident nostrud aute ut
                ea cupidatat exercitation sit elit.
            </>
        ),
    },
];

export default placeholders;
