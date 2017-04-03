import React from 'react';
import ReactDOM from 'react-dom';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from '../../src';

import '../css/demo.css';
import '../../src/react-accessible-accordion.css';

const Example = () => (
    <div className="demo-container">
        <h2>Default settings</h2>

        <Accordion>
            <AccordionItem>
                <AccordionItemTitle>
                    <h3 className="u-position-relative">
                        Simple title
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        sollicitudin, quam at pulvinar rhoncus, turpis sem condimentum
                        purus, id ullamcorper sem lectus nec nulla. Vestibulum fringilla
                        nisi eget erat iaculis mollis a sit amet metus. Donec nec tortor
                        mollis, scelerisque ex quis, pharetra elit. Nam leo nulla, porttitor
                        at felis non, mollis blandit nisl. Curabitur finibus ex ut ipsum
                        scelerisque, eget imperdiet lacus dignissim. Donec a blandit
                        sem. <a href="/">Aliquam interdum posuere mi eu posuere.</a> Nam venenatis
                        auctor fermentum. Donec facilisis eleifend viverra. Integer malesuada
                        dapibus sodales. Integer mollis maximus bibendum. Maecenas varius
                        nisl aliquam velit commodo, quis consectetur massa fringilla. Pellentesque
                        blandit ex mauris, vel vulputate mauris egestas vitae.
                    </p>
                </AccordionItemBody>
            </AccordionItem>
            <AccordionItem className="accordion__item">
                <AccordionItemTitle>
                    <h3 className=" u-position-relative u-margin-bottom-s">
                        Complex title
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                    <div>With a bit of description</div>
                </AccordionItemTitle>
                <AccordionItemBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        sollicitudin, quam at pulvinar rhoncus, turpis sem condimentum
                        purus, id ullamcorper sem lectus nec nulla. Vestibulum fringilla
                        nisi eget erat iaculis mollis a sit amet metus. Donec nec tortor
                        mollis, scelerisque ex quis, pharetra elit. Nam leo nulla, porttitor
                        at felis non, mollis blandit nisl. Curabitur finibus ex ut ipsum
                        scelerisque, eget imperdiet lacus dignissim. Donec a blandit
                        sem. Aliquam interdum posuere mi eu posuere. Nam venenatis
                        auctor fermentum. Donec facilisis eleifend viverra. Integer malesuada
                        dapibus sodales. Integer mollis maximus bibendum. Maecenas varius
                        nisl aliquam velit commodo, quis consectetur massa fringilla. Pellentesque
                        blandit ex mauris, vel vulputate mauris egestas vitae.
                    </p>
                </AccordionItemBody>
            </AccordionItem>
        </Accordion>

        <h2 className="u-margin-top">Allow multiple</h2>

        <Accordion accordion={false}>
            <AccordionItem>
                <AccordionItemTitle>
                    <h3 className="u-position-relative">
                        Simple title
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        sollicitudin, quam at pulvinar rhoncus, turpis sem condimentum
                        purus, id ullamcorper sem lectus nec nulla. Vestibulum fringilla
                        nisi eget erat iaculis mollis a sit amet metus. Donec nec tortor
                        mollis, scelerisque ex quis, pharetra elit. Nam leo nulla, porttitor
                        at felis non, mollis blandit nisl. Curabitur finibus ex ut ipsum
                        scelerisque, eget imperdiet lacus dignissim. Donec a blandit
                        sem. Aliquam interdum posuere mi eu posuere. Nam venenatis
                        auctor fermentum. Donec facilisis eleifend viverra. Integer malesuada
                        dapibus sodales. Integer mollis maximus bibendum. Maecenas varius
                        nisl aliquam velit commodo, quis consectetur massa fringilla. Pellentesque
                        blandit ex mauris, vel vulputate mauris egestas vitae.
                    </p>
                </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemTitle>
                    <h3 className=" u-position-relative u-margin-bottom-s">
                        Complex title
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                    <div>With a bit of description</div>
                </AccordionItemTitle>
                <AccordionItemBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        sollicitudin, quam at pulvinar rhoncus, turpis sem condimentum
                        purus, id ullamcorper sem lectus nec nulla. Vestibulum fringilla
                        nisi eget erat iaculis mollis a sit amet metus. Donec nec tortor
                        mollis, scelerisque ex quis, pharetra elit. Nam leo nulla, porttitor
                        at felis non, mollis blandit nisl. Curabitur finibus ex ut ipsum
                        scelerisque, eget imperdiet lacus dignissim. Donec a blandit
                        sem. Aliquam interdum posuere mi eu posuere. Nam venenatis
                        auctor fermentum. Donec facilisis eleifend viverra. Integer malesuada
                        dapibus sodales. Integer mollis maximus bibendum. Maecenas varius
                        nisl aliquam velit commodo, quis consectetur massa fringilla. Pellentesque
                        blandit ex mauris, vel vulputate mauris egestas vitae.
                    </p>
                </AccordionItemBody>
            </AccordionItem>
        </Accordion>

        <h2 className="u-margin-top">Multi Accordion children</h2>

        <Accordion>
            <AccordionItem>
                <AccordionItemTitle>
                    <h3 className="u-position-relative">
                        Simple title
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                    <Accordion accordion={false}>
                        <AccordionItem>
                            <AccordionItemTitle>
                                <h3 className="u-position-relative">
                                    Simple title
                                    <div className="accordion__arrow" role="presentation" />
                                </h3>
                            </AccordionItemTitle>
                            <AccordionItemBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        sollicitudin, quam at pulvinar rhoncus, turpis sem condimentum
                        purus, id ullamcorper sem lectus nec nulla. Vestibulum fringilla
                        nisi eget erat iaculis mollis a sit amet metus. Donec nec tortor
                        mollis, scelerisque ex quis, pharetra elit. Nam leo nulla, porttitor
                        at felis non, mollis blandit nisl. Curabitur finibus ex ut ipsum
                        scelerisque, eget imperdiet lacus dignissim. Donec a blandit
                        sem. Aliquam interdum posuere mi eu posuere. Nam venenatis
                        auctor fermentum. Donec facilisis eleifend viverra. Integer malesuada
                        dapibus sodales. Integer mollis maximus bibendum. Maecenas varius
                        nisl aliquam velit commodo, quis consectetur massa fringilla. Pellentesque
                        blandit ex mauris, vel vulputate mauris egestas vitae.
                                </p>
                            </AccordionItemBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemTitle>
                                <h3 className=" u-position-relative u-margin-bottom-s">
                                    Complex title
                                    <div className="accordion__arrow" role="presentation" />
                                </h3>
                                <div>With a bit of description</div>
                            </AccordionItemTitle>
                            <AccordionItemBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        sollicitudin, quam at pulvinar rhoncus, turpis sem condimentum
                        purus, id ullamcorper sem lectus nec nulla. Vestibulum fringilla
                        nisi eget erat iaculis mollis a sit amet metus. Donec nec tortor
                        mollis, scelerisque ex quis, pharetra elit. Nam leo nulla, porttitor
                        at felis non, mollis blandit nisl. Curabitur finibus ex ut ipsum
                        scelerisque, eget imperdiet lacus dignissim. Donec a blandit
                        sem. Aliquam interdum posuere mi eu posuere. Nam venenatis
                        auctor fermentum. Donec facilisis eleifend viverra. Integer malesuada
                        dapibus sodales. Integer mollis maximus bibendum. Maecenas varius
                        nisl aliquam velit commodo, quis consectetur massa fringilla. Pellentesque
                        blandit ex mauris, vel vulputate mauris egestas vitae.
                                </p>
                            </AccordionItemBody>
                        </AccordionItem>
                    </Accordion>
                </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemTitle>
                    <h3 className=" u-position-relative u-margin-bottom-s">
                        Complex title
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                    <div>With a bit of description</div>
                </AccordionItemTitle>
                <AccordionItemBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        sollicitudin, quam at pulvinar rhoncus, turpis sem condimentum
                        purus, id ullamcorper sem lectus nec nulla. Vestibulum fringilla
                        nisi eget erat iaculis mollis a sit amet metus. Donec nec tortor
                        mollis, scelerisque ex quis, pharetra elit. Nam leo nulla, porttitor
                        at felis non, mollis blandit nisl. Curabitur finibus ex ut ipsum
                        scelerisque, eget imperdiet lacus dignissim. Donec a blandit
                        sem. Aliquam interdum posuere mi eu posuere. Nam venenatis
                        auctor fermentum. Donec facilisis eleifend viverra. Integer malesuada
                        dapibus sodales. Integer mollis maximus bibendum. Maecenas varius
                        nisl aliquam velit commodo, quis consectetur massa fringilla. Pellentesque
                        blandit ex mauris, vel vulputate mauris egestas vitae.
                    </p>
                </AccordionItemBody>
            </AccordionItem>
        </Accordion>

        <h2 className="u-margin-top">Pre expanded items</h2>

        <Accordion>
            <AccordionItem expanded={true}>
                <AccordionItemTitle>
                    <h3 className="u-position-relative">
                        Simple title
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        sollicitudin, quam at pulvinar rhoncus, turpis sem condimentum
                        purus, id ullamcorper sem lectus nec nulla. Vestibulum fringilla
                        nisi eget erat iaculis mollis a sit amet metus. Donec nec tortor
                        mollis, scelerisque ex quis, pharetra elit. Nam leo nulla, porttitor
                        at felis non, mollis blandit nisl. Curabitur finibus ex ut ipsum
                        scelerisque, eget imperdiet lacus dignissim. Donec a blandit
                        sem. Aliquam interdum posuere mi eu posuere. Nam venenatis
                        auctor fermentum. Donec facilisis eleifend viverra. Integer malesuada
                        dapibus sodales. Integer mollis maximus bibendum. Maecenas varius
                        nisl aliquam velit commodo, quis consectetur massa fringilla. Pellentesque
                        blandit ex mauris, vel vulputate mauris egestas vitae.
                    </p>
                </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemTitle>
                    <h3 className=" u-position-relative u-margin-bottom-s">
                        Complex title
                        <div className="accordion__arrow" role="presentation" />
                    </h3>
                    <div>With a bit of description</div>
                </AccordionItemTitle>
                <AccordionItemBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        sollicitudin, quam at pulvinar rhoncus, turpis sem condimentum
                        purus, id ullamcorper sem lectus nec nulla. Vestibulum fringilla
                        nisi eget erat iaculis mollis a sit amet metus. Donec nec tortor
                        mollis, scelerisque ex quis, pharetra elit. Nam leo nulla, porttitor
                        at felis non, mollis blandit nisl. Curabitur finibus ex ut ipsum
                        scelerisque, eget imperdiet lacus dignissim. Donec a blandit
                        sem. Aliquam interdum posuere mi eu posuere. Nam venenatis
                        auctor fermentum. Donec facilisis eleifend viverra. Integer malesuada
                        dapibus sodales. Integer mollis maximus bibendum. Maecenas varius
                        nisl aliquam velit commodo, quis consectetur massa fringilla. Pellentesque
                        blandit ex mauris, vel vulputate mauris egestas vitae.
                    </p>
                </AccordionItemBody>
            </AccordionItem>
        </Accordion>
    </div>
);

ReactDOM.render(<Example />, document.getElementById('app-root'));
