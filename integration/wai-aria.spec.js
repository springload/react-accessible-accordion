describe('WAI ARIA Spec', () => {
    describe('Keyboard Interaction', () => {
        describe('Enter or Space', () => {
            it('When focus is on the accordion header for a collapsed panel, expands the associated panel. If the implementation allows only one panel to be expanded, and if another panel is expanded, collapses that panel.', () => {
                // todo
            });

            it('When focus is on the accordion header for an expanded panel, collapses the panel if the implementation supports collapsing. Some implementations require one panel to be expanded at all times and allow only one panel to be expanded; so, they do not support a collapse function.', () => {
                // todo
            });
        });

        describe('Tab', () => {
            it('Moves focus to the next focusable element; all focusable elements in the accordion are included in the page Tab sequence.', () => {
                // todo
            });
        });

        describe('Shift + Tab', () => {
            it('Moves focus to the previous focusable element; all focusable elements in the accordion are included in the page Tab sequence.', () => {
                // todo
            });
        });

        describe('Down Arrow (Optional)', () => {
            it('If focus is on an accordion header, moves focus to the next accordion header. If focus is on the last accordion header, either does nothing or moves focus to the first accordion header.', () => {
                // todo
            });
        });

        describe('Up Arrow (Optional)', () => {
            it('If focus is on an accordion header, moves focus to the previous accordion header. If focus is on the first accordion header, either does nothing or moves focus to the last accordion header.', () => {
                // todo
            });
        });

        describe('Home (Optional)', () => {
            it('When focus is on an accordion header, moves focus to the first accordion header.', () => {
                // todo
            });
        });

        describe('End (Optional)', () => {
            it('When focus is on an accordion header, moves focus to the last accordion header.', () => {
                // todo
            });
        });
    });

    describe('WAI-ARIA Roles, States, and Properties', () => {
        it('The title of each accordion header is contained in an element with role button.', () => {
            // todo
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
            // todo
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
    });
});
