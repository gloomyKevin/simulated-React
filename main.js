import { createElement, Component, render } from './simulated_react.js'

// class MyComponent extends Component {
//     constructor() {
//         super();
//         this.state = {
//             a: 1,
//             b: 2
//         }
//     }

//     render() {
//         return <div>
//             <h1>my component</h1>
//             {/* <button onClick={() => { this.state.a++; this.rerender(); }}>+1</button> */}
//             <button onClick={() => { this.setState({ a: this.state.a + 1 }) }}>+1</button>
//             <span>{this.state.a.toString()}</span>
//             <span>{this.state.b.toString()}</span>
//             {this.children}
//         </div >
//     }
// }


// // window.a = <div id="a" class="c" >
// //     <div>abc</div>
// //     <div></div>
// //     <div></div>
// // </div>

// render(
//     <MyComponent id="a" class="c" >
//         <div>abc</div>
//         <div></div>
//         <div></div>
//     </MyComponent>, document.body)


// 实现三子棋tutorial
class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button
                className="square"
                onClick={() => this.setState({ value: 'X' })}
            >
                {this.state.value}
            </button>
        );
    }
}

class Board extends Component {
    renderSquare(i) {
        return <Square />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

render(
    <Game />,
    document.getElementById('root')
);
