import { createElement } from './simulated_react.js'

class MyComponent {

}



// window.a = <div id="a" class="c" >
//     <div>abc</div>
//     <div></div>
//     <div></div>
// </div>

document.body.appendChild(
    <MyComponent id="a" class="c" >
        <div>abc</div>
        <div></div>
        <div></div>
    </MyComponent>
)