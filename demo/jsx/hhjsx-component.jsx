// @ts-nocheck

import { customElement } from "../../esm/index.js";

const HHJSXCmp = customElement('hh-jsx-cmp', {
    connectedCallback() {
        this.appendChild(
            <div>
                <h2>HHJSX WebComponent Component</h2>
                <button onclick={() => alert('Hello!')}>Click me!</button>
            </div>
        );
    }
});

const HtmlHammerJSXComponent = (props, ...children) =>
    // Instead React's <>
    <fragment>
        <h1>JSX & Htmlhammer Example</h1>
        <a
            name="foo"
        >
            <div nn="NN attribute">
                <ul>
                    <li>
                        <a>1</a>
                    </li>
                    <li>
                        <a>2</a>
                    </li>
                </ul>
            </div>
            <div aa="AA attribute">Some div Content</div>
            {children ?? map(child => <child></child>)}
        </a>
    </fragment>

document.body.append(
    <HtmlHammerJSXComponent>
        <h1>I am a child</h1>
        <HHJSXCmp />
    </HtmlHammerJSXComponent>
);
