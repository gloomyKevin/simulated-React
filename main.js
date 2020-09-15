import { createElement, Component, render } from './simulated_react.js'

class MyComponent extends Component {
    render() {
        return <div>
            <h1>my component</h1>
            {this.children}
        </div>
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