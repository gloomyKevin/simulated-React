import { createElement, Component, render } from './simulated_react.js'

class MyComponent extends Component {
    constructor() {
        super();
        this.state = {
            a: 1,
            b: 2
        }
    }

    render() {
        return <div>
            <h1>my component</h1>
            <button onClick={() => { this.state.a++; this.rerender(); }}>+1</button>
            <span>{this.state.a.toString()}</span>
            {this.children}
        </div >
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