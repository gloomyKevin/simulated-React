const RENDER_TO_DOM = Symbol("render to dom")

export class Component {
    constructor() {
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
        this._range = null;
    }

    setAttribute(name, value) {
        this.props[name] = value;
    }

    appendChild(component) {
        this.children.push(component);
    }

    get vdom() {
        return this.render().vdom;
    }

    get vchildren() {
        return this.children.map(child => child.vdom);
    }

    [RENDER_TO_DOM](range) {
        this._range = range;
        this._vdom = this.vdom;
        this._vdom[RENDER_TO_DOM](range);
    }

    update() {
        let isSameNode = (oldNode, newNode) => {
            // 类型不同,并且节点不同
            if (oldNode.type !== newNode.type) {
                return false
            }
            for (let name in newNode.props) {
                // 如果属性值不一致,则认为不同
                if (newNode.props[name] !== oldName.props[name]) {
                    return false;
                }
            }
            // 旧属性比新属性多,即属性的数量不同
            if (Object.keys(oldNode.props).length > Object.keys(newNode.props).length) {
                return false;
            }
            // 文本节点的内容不同
            if (newNode.type === "#text") {
                if (newNode.content !== oldNode.content) {
                    return false;
                }
            }
            return true;
        }
        let update = (oldNode, newNode) => {
            // type, props, children
            // #text, content
            if (!isSameNode(oldNode, newNode)) {
                // 新旧节点不同,此时为全新渲染
                newNode[RENDER_TO_DOM](oldNode._range);
                return;
            }
            // 如果新旧节点一样, 将oldNode的range强行设置为newNode的range
            newNode._range = oldNode._range;

            // 处理children
            let newChildren = newNode.vchildren;
            let oldChildren = oldChildren.vchildren;

            for (let i = 0; i < newChildren.length; i++) {
                let newChild = newChildren[i];
                let oldChild = oldChildren[i];
                if (i < oldChildren.length) {
                    update(oldChild, newChild);
                } else {
                    // TODO
                }
            }
        }
        let vdom = this.vdom;
        update(this._vdom, this.vdom);
        this._vdom = vdom;
    }
    // 重新绘制的算法
    // rerender() {
    //     let oldRange = this._range;
    //     let range = document.createRange();
    //     range.setStart(oldRange.startContainer, oldRange.startOffset);
    //     range.setEnd(oldRange.startContainer, oldRange.startOffset);
    //     this[RENDER_TO_DOM](range);

    //     oldRange.setStart(range.endContainer, range.endOffset);
    //     oldRange.deleteContents();
    //     // this[RENDER_TO_DOM](this._range);
    // }

    setState(newState) {
        if (this.state === null || typeof this.state !== "object") {
            this.state = newState;
            this.rerender();
            return;
        }

        let merge = (oldState, newState) => {
            for (let p in newState) {
                if (oldState[p] === null || typeof oldState[p] !== "object") {
                    oldState[p] = newState[p];
                } else {
                    merge(oldState[p], newState[p])
                }
            }
        }

        merge(this.state, newState);
        this.rerender();
    }

    // get root() {
    //     if (!this._root) {
    //         this._root = this.render().root;
    //     }
    //     return this._root;
    // }
}

class ElementWrapper extends Component {
    constructor(type) {
        super(type);
        this.type = type;
        // this.root = document.createElement(type);
    }

    // setAttribute(name, value) {
    //     if (name.match(/^on([\s\S]+)$/)) {
    //         this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value);
    //     } else {
    //         if (name === "className") {
    //             this.root.setAttribute("class", value);
    //         } else {
    //             this.root.setAttribute(name, value);
    //         }
    //         // this.root.setAttribute(name, value);
    //     }
    //     // this.root.setAttribute(name, value);
    // }

    get vdom() {
        this.vchildren = this.children.map(child => child.vdom);
        return this;
        // return {
        //     type: this.type,
        //     props: this.props,
        //     children: this.children.map((child => child.vdom))
        // }
    }

    // appendChild(component) {
    //     let range = document.createRange();
    //     range.setStart(this.root, this.root.childNodes.length);
    //     range.setEnd(this.root, this.root.childNodes.length);
    //     component[RENDER_TO_DOM](range);
    // }

    [RENDER_TO_DOM](range) {
        range.deleteContents();
        let root = document.createElement(this.type);
        for (let name in this.props) {
            let value = this.props[name];
            if (name.match(/^on([\s\S]+)$/)) {
                root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value);
            } else {
                if (name === "className") {
                    root.setAttribute("class", value);
                } else {
                    root.setAttribute(name, value);
                }
                // this.root.setAttribute(name, value);
            }
            // this.root.setAttribute(name, value);
        }

        if (!this.vchildren) {
            this.vchildren = this.children.map(child => child.vdom);
        }

        for (let child of this.vchildren) {
            let childRange = document.createRange();
            childRange.setStart(root, root.childNodes.length);
            childRange.setEnd(root, root.childNodes.length);
            child[RENDER_TO_DOM](childRange);
        }
        range.insertNode(root);
    }
}

class TextWrapper extends Component {
    constructor(content) {
        super(content);
        this.type = "#text";
        this.content = content;
        this.root = document.createTextNode(content);
    }

    get vdom() {
        return this;
        // return {
        //     type: "#text",
        //     content: this.content
        // }
    }


    [RENDER_TO_DOM](range) {
        range.deleteContents();
        range.insertNode(this.root);
    }
}

export function createElement(type, attributes, ...children) {
    let e;
    if (typeof type === 'string') {
        e = new ElementWrapper(type);
    } else {
        e = new type;
    }

    for (let p in attributes) {
        e.setAttribute(p, attributes[p]);
    }

    let insertChildren = (children) => {
        for (let child of children) {
            if (typeof child === "string") {
                child = new TextWrapper(child);
            }
            if (child === null) {
                continue;
            }
            if ((typeof child === 'object') && (child instanceof Array)) {
                insertChildren(child);
            } else {
                e.appendChild(child);
            }
        }
    }
    insertChildren(children);

    return e;
}

export function render(component, parentElement) {
    // parentElement.appendChild(component.root);
    let range = document.createRange();
    range.setStart(parentElement, 0);
    range.setEnd(parentElement, parentElement.childNodes.length);
    range.deleteContents();
    component[RENDER_TO_DOM](range);
}