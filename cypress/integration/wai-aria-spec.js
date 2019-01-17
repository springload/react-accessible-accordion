import React from 'react';
import ReactDOM from 'react-dom';

describe('WAI ARIA Spec', function() {
    before(() => {
        cy.exec('yarn build');
    });

    beforeEach(() => {
        cy.visit('cypress/index.html');
        cy.document().then(document => {
            const {
                Accordion,
                AccordionItem,
                AccordionItemHeading,
                AccordionItemPanel,
            } = require('../../dist/umd');

            const classicAccordion = document.body.appendChild(
                document.createElement('div'),
            );

            ReactDOM.render(
                <div id="classic-accordion">
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemHeading>
                                Heading One
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                Sunt in reprehenderit cillum ex proident qui
                                culpa fugiat pariatur aliqua nostrud consequat
                                consequat enim quis sit consectetur ad aute ea
                                ex eiusmod id esse culpa et pariatur ad amet
                                pariatur pariatur dolor quis.
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                Heading Two
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                Velit tempor dolore commodo voluptate id do
                                nulla do ut proident cillum ad cillum voluptate
                                deserunt fugiat ut sed cupidatat ut consectetur
                                consequat incididunt sed in culpa do labore ea
                                incididunt ea in eiusmod.
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                Heading Three
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                Lorem ipsum esse occaecat voluptate duis
                                incididunt amet eiusmod sunt commodo sunt enim
                                anim ea culpa ut tempor dolore fugiat
                                exercitation aliquip commodo dolore elit esse
                                est ullamco velit et deserunt.
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion>
                </div>,
                classicAccordion,
            );
        });
    });

    context('Canary tests', () => {
        it('Loads the Cypress Testing Sandbox', function() {
            cy.title().should(
                'eq',
                'React Accessible Accordion - Cypress Testing Sandbox',
            );
        });

        it('has rendered the "classic accordion" example', () => {
            cy.get('#classic-accordion');
        });
    });

    context('Keyboard Interaction', () => {
        context('Enter or Space', () => {
            it('When focus is on the accordion header for a collapsed panel, expands the associated panel. If the implementation allows only one panel to be expanded, and if another panel is expanded, collapses that panel.', () => {
                // todo
            });

            it('When focus is on the accordion header for an expanded panel, collapses the panel if the implementation supports collapsing. Some implementations require one panel to be expanded at all times and allow only one panel to be expanded; so, they do not support a collapse function.', () => {
                // todo
            });
        });

        context('Tab', () => {
            it('Moves focus to the next focusable element; all focusable elements in the accordion are included in the page Tab sequence.', () => {
                // todo
            });
        });

        context('Shift + Tab', () => {
            it('Moves focus to the previous focusable element; all focusable elements in the accordion are included in the page Tab sequence.', () => {
                // todo
            });
        });

        context('Down Arrow (Optional)', () => {
            it('If focus is on an accordion header, moves focus to the next accordion header. If focus is on the last accordion header, either does nothing or moves focus to the first accordion header.', () => {
                // todo
            });
        });

        context('Up Arrow (Optional)', () => {
            it('If focus is on an accordion header, moves focus to the previous accordion header. If focus is on the first accordion header, either does nothing or moves focus to the last accordion header.', () => {
                // todo
            });
        });

        context('Home (Optional)', () => {
            it('When focus is on an accordion header, moves focus to the first accordion header.', () => {
                // todo
            });
        });

        context('End (Optional)', () => {
            it('When focus is on an accordion header, moves focus to the last accordion header.', () => {
                // todo
            });
        });
    });

    context('WAI-ARIA Roles, States, and Properties', () => {
        it('The title of each accordion header is contained in an element with role button.', () => {
            cy.get('.accordion__heading')
                .should('have.length', 3)
                .should('have.attr', 'role', 'button');
        });

        it('Each accordion header button is wrapped in an element with role heading that has a value set for aria-level that is appropriate for the information architecture of the page.', () => {
            // Not yet supported.
        });

        it('If the native host language has an element with an implicit heading and aria-level, such as an HTML heading tag, a native host language element may be used.', () => {
            // todo
        });

        it('The button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.', () => {
            // todo
        });

        it('If the accordion panel associated with an accordion header is visible, the header button element has aria-expanded set to true. If the panel is not visible, aria-expanded is set to false.', () => {
            const heading = cy
                .get('.accordion__heading')
                .first()
                // Panel not visible by default:
                .should('have.attr', 'aria-expanded', 'false')
                // But will be after a click
                .click()
                .should('have.attr', 'aria-expanded', 'true');
        });

        it('The accordion header button element has aria-controls set to the ID of the element containing the accordion panel content.', () => {
            // todo
        });

        it('If the accordion panel associated with an accordion header is visible, and if the accordion does not permit the panel to be collapsed, the header button element has aria-disabled set to true.', () => {
            // todo
        });

        it('Optionally, each element that serves as a container for panel content has role region and aria-labelledby with a value that refers to the button that controls display of the panel.', () => {
            // todo
        });

        it('Avoid using the region role in circumstances that create landmark region proliferation, e.g., in an accordion that contains more than approximately 6 panels that can be expanded at the same time.', () => {
            // todo
        });

        it('Role region is especially helpful to the perception of structure by screen reader users when panels contain heading elements or a nested accordion.', () => {
            // todo
        });
    });
});
