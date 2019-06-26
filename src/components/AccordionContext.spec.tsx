import { render } from '@testing-library/react';
import * as React from 'react';
import { Consumer, Provider } from './AccordionContext';

describe('ItemContext', () => {
    it('renders children props', () => {
        const { getByText } = render(
            <Provider>
                <Consumer>{(): string => 'Hello World'}</Consumer>
            </Provider>,
        );

        expect(getByText('Hello World')).toBeTruthy();
    });
});
