class ElementWrapper {
    constructor(type) {

    }

    setAttribute(name, value) {

    }

    appendChild() {

    }
}

class TextWrapper {
    constructor(content) {

    }

    setAttribute(name, value) {

    }

    appendChild() {

    }
}

class Component {
    constructor() {

    }

    setAttribute(name, value) {

    }

    appendChild() {

    }
}

export function createElement(type, attributes, ...children) {
    if (typeof type === 'string') {
        e = document.createElement(type);
    } else {
        e = new type;
    }

    for (let p in attributes) {
        e.setAttribute(p, attributes[p]);
    }
    for (let child of children) {
        if (typeof child === "string") {
            child = document.createTextNode(child);
        }
        e.appendChild(child);
    }
    return e;
}

export function render(component, parentElement) {

}