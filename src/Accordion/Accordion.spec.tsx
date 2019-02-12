import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { Provider } from '../AccordionContext/AccordionContext';
import { default as AccordionItem } from '../AccordionItem/AccordionItem.wrapper';
import { default as AccordionItemHeading } from '../AccordionItemHeading/AccordionItemHeading.wrapper';
import { default as Accordion } from './Accordion.wrapper';

// describe('Accordion', () => {
//     it('different className', () => {
//         const wrapper = mount(<Accordion className="testCSSClass" />);
//         expect(wrapper.find('div').props().className).toEqual('testCSSClass');
//     });

//     describe('<Accordion allowMultipleExpanded="false" />', () => {
//         const [FooTitle, BarTitle]: React.SFC[] = [
//             (): JSX.Element => <AccordionItemHeading>Foo</AccordionItemHeading>,
//             (): JSX.Element => <AccordionItemHeading>Bar</AccordionItemHeading>,
//         ];

//         function mountAccordion(): ReactWrapper {
//             return mount(
//                 <Accordion>
//                     <AccordionItem>
//                         <FooTitle />
//                     </AccordionItem>
//                     <AccordionItem>
//                         <BarTitle />
//                     </AccordionItem>
//                 </Accordion>,
//             );
//         }

//         it('expands a collapsed item when its title is clicked', () => {
//             const wrapper = mountAccordion();

//             wrapper.find(FooTitle).simulate('click');

//             const provider = wrapper.find(Provider).instance() as Provider;

//             expect(
//                 provider.state.items.filter(
//                     (item: Item) => item.expanded === true,
//                 ).length,
//             ).toEqual(1);
//         });

//         it('expands a collapsed item when its title is clicked, and closes the others', () => {
//             const wrapper = mountAccordion();

//             wrapper.find(BarTitle).simulate('click');

//             const instance = wrapper.find(Provider).instance() as Provider;

//             expect(
//                 instance.state.items.filter(
//                     (item: Item) => item.expanded === true,
//                 ).length,
//             ).toEqual(1);
//         });

//         it('pre expanded accordion', () => {
//             const wrapper = mount(
//                 <Accordion>
//                     <AccordionItem expanded={true}>Fake Child</AccordionItem>
//                     <AccordionItem>Fake Child</AccordionItem>
//                 </Accordion>,
//             );

//             const instance = wrapper.find(Provider).instance() as Provider;

//             expect(
//                 instance.state.items.filter(
//                     (item: Item) => item.expanded === true,
//                 ).length,
//             ).toEqual(1);
//         });

//         it('works with multiple pre expanded accordion. Extra expands are just ignored.', () => {
//             const expandedClassName = 'EXPANDED';
//             const wrapper = mount(
//                 <Accordion allowMultipleExpanded={false}>
//                     <AccordionItem
//                         expanded={true}
//                         expandedClassName={expandedClassName}
//                     >
//                         Fake Child
//                     </AccordionItem>
//                     <AccordionItem
//                         expanded={true}
//                         expandedClassName={expandedClassName}
//                     >
//                         Fake Child
//                     </AccordionItem>
//                 </Accordion>,
//             );

//             const instance = wrapper.find(Provider).instance() as Provider;

//             expect(
//                 instance.state.items.filter((item: Item) => item.expanded)
//                     .length,
//             ).toEqual(1);
//             expect(
//                 wrapper.findWhere((item: ReactWrapper) =>
//                     item.hasClass(expandedClassName),
//                 ).length,
//             ).toEqual(1);
//         });

//         it('respects arbitrary user-defined props', () => {
//             const wrapper = mount(<Accordion lang="en" />);
//             const div = wrapper.find('div').getDOMNode();

//             expect(div.getAttribute('lang')).toEqual('en');
//         });
//     });

//     describe('<Accordion allowMultipleExpanded="true" />', () => {
//         const [FooTitle, BarTitle]: React.SFC[] = [
//             (): JSX.Element => <AccordionItemHeading>Foo</AccordionItemHeading>,
//             (): JSX.Element => <AccordionItemHeading>Bar</AccordionItemHeading>,
//         ];

//         function mountMultipleExpanded(): ReactWrapper {
//             return mount(
//                 <Accordion allowMultipleExpanded={true}>
//                     <AccordionItem>
//                         <FooTitle />
//                     </AccordionItem>
//                     <AccordionItem>
//                         <BarTitle />
//                     </AccordionItem>
//                 </Accordion>,
//             );
//         }

//         it('expands a collapsed item when its title is clicked', () => {
//             const wrapper = mountMultipleExpanded();

//             wrapper.find(FooTitle).simulate('click');

//             const instance = wrapper.find(Provider).instance() as Provider;

//             expect(
//                 instance.state.items.filter(
//                     (item: Item) => item.expanded === true,
//                 ).length,
//             ).toEqual(1);
//         });

//         it("expands a collapsed item when its title is clicked, and doesn't close the others", () => {
//             const wrapper = mountMultipleExpanded();

//             wrapper.find(FooTitle).simulate('click');
//             wrapper.find(BarTitle).simulate('click');

//             const instance = wrapper.find(Provider).instance() as Provider;

//             expect(
//                 instance.state.items.filter(
//                     (item: Item) => item.expanded === true,
//                 ).length,
//             ).toEqual(2);
//         });

//         it('collapses an expanded item when its title is clicked and there is more than one item expanded', () => {
//             const wrapper = mountMultipleExpanded();

//             wrapper.find(FooTitle).simulate('click'); // open
//             wrapper.find(BarTitle).simulate('click'); // open
//             wrapper.find(FooTitle).simulate('click'); // close

//             const instance = wrapper.find(Provider).instance() as Provider;

//             expect(
//                 instance.state.items.filter(
//                     (item: Item) => item.expanded === true,
//                 ).length,
//             ).toEqual(1);
//         });
//     });

//     it('pre expanded accordion when allowMultipleExpanded is true', () => {
//         const wrapper = mount(
//             <Accordion allowMultipleExpanded={true}>
//                 <AccordionItem expanded={true}>Fake Child</AccordionItem>
//                 <AccordionItem expanded={true}>Fake Child</AccordionItem>
//             </Accordion>,
//         );

//         const instance = wrapper.find(Provider).instance() as Provider;

//         expect(
//             instance.state.items.filter((item: Item) => item.expanded === true)
//                 .length,
//         ).toEqual(2);
//     });
// });

// describe('<Accordion allowZeroExpanded="false" />', () => {
//     const FooTitle: React.SFC = (): JSX.Element => (
//         <AccordionItemHeading>Foo</AccordionItemHeading>
//     );

//     function mountAccordion(): ReactWrapper {
//         return mount(
//             <Accordion>
//                 <AccordionItem>
//                     <FooTitle />
//                 </AccordionItem>
//             </Accordion>,
//         );
//     }

//     it("doesn't collapse an expanded item when it's the only item expanded", () => {
//         const wrapper = mountAccordion();

//         wrapper.find(FooTitle).simulate('click'); // open
//         wrapper.find(FooTitle).simulate('click'); // close

//         const instance = wrapper.find(Provider).instance() as Provider;

//         expect(
//             instance.state.items.filter((item: Item) => item.expanded === true)
//                 .length,
//         ).toEqual(1);
//     });
// });

// describe('<Accordion allowZeroExpanded="true" />', () => {
//     const FooTitle: React.SFC = (): JSX.Element => (
//         <AccordionItemHeading>Foo</AccordionItemHeading>
//     );

//     function mountZeroExpanded(): ReactWrapper {
//         return mount(
//             <Accordion allowZeroExpanded={true}>
//                 <AccordionItem>
//                     <FooTitle />
//                 </AccordionItem>
//             </Accordion>,
//         );
//     }

//     it("collapses an expanded item when its title is clicked and it's the only item open", () => {
//         const wrapper = mountZeroExpanded();

//         wrapper.find(FooTitle).simulate('click'); // open
//         wrapper.find(FooTitle).simulate('click'); // close

//         const provider = wrapper.find(Provider).instance() as Provider;

//         expect(
//             provider.state.items.filter((item: Item) => item.expanded === true)
//                 .length,
//         ).toEqual(0);
//     });
// });
