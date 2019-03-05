import { mount } from 'enzyme';
import * as React from 'react';
import { default as Accordion } from './Accordion';
import { Provider, ProviderProps } from './AccordionContext';
import { UUID } from './ItemContext';

describe('Accordion', () => {
    it('renders without erroring', () => {
        expect(() => {
            mount(<Accordion />);
        }).not.toThrow();
    });

    describe('className', () => {
        it('is “accordion” by default', () => {
            expect(
                mount(<Accordion />)
                    .getDOMNode()
                    .getAttribute('class'),
            ).toBe('accordion');
        });

        it('can be overridden', () => {
            const OVERRIDE = 'OVERRIDE';
            expect(
                mount(<Accordion className={OVERRIDE} />)
                    .getDOMNode()
                    .getAttribute('class'),
            ).toBe(OVERRIDE);
        });
    });

    describe('context provision', () => {
        it('is given to descendants', () => {
            expect(mount(<Accordion />).find(Provider).length).toEqual(1);
        });

        it('respects all directly-proxied ProviderProps', () => {
            // This test asserts that all ProviderProps are respected, AND
            // the ProxiedProviderProps type helps to ensure that we haven't
            // forgotten any.

            type ProxiedProviderProps = Pick<
                Required<ProviderProps>,
                Exclude<keyof ProviderProps, 'children'> // 'children' is not proxied directly, and is tested separately below.
            >;

            const props: ProxiedProviderProps = {
                preExpanded: ['foo', 'bar'],
                allowMultipleExpanded: true,
                allowZeroExpanded: true,
                onChange: (args: UUID[]): void => {
                    // noop
                },
            };

            expect(
                mount(<Accordion {...props} />)
                    .find(Provider)
                    .props(),
            ).toMatchObject(props);
        });

        it('respects the ‘children’ prop', () => {
            expect(
                mount(
                    <Accordion>
                        <div data-foo={true} />
                    </Accordion>,
                ).find('[data-foo]'),
            ).toHaveLength(1);
        });
    });
});
