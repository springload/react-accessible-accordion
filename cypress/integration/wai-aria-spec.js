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
});
