import { createElement, Component, render } from './simulated_react.js'

class MyComponent extends Component {
    constructor(type) {

    }

    setAttribute(name, value) {

    }

    appendChild() {

    }
}



// window.a = <div id="a" class="c" >
//     <div>abc</div>
//     <div></div>
//     <div></div>
// </div>

render(
    <MyComponent id="a" class="c" >
        <div>abc</div>
        <div></div>
        <div></div>
    </MyComponent>, document.body)