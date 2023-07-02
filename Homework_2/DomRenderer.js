/* Implement DOM renderer:
    1. You must create el function, which has the following signature
    function el(type: string, attrs: object, children: DomElement | DomElement[])
    So basically it accepts the following:
    a. The type of the dom element to be created ('div', 'span', etc)
    b. An object with tag attributes (class, id, etc)
    c. Child elements. This one can be either DomElement (SpanElement for instance) or an array of DomElement.
    In case of an array, all elements in the array are siblings under same parent
    d. The el function should return a DomElement instance
    2. Create DomElement class, which must be a base class for all Elements
    3. Each class extending DomElement should implement draw method
    4. Each HTML tag must have a corresponding class extending DomElement. For instance a "div" tag should have
    DivElement class:
    class DivElement extends DomElement {
      draw(children) {
        // 1. Create div with
        // const div = document.createElement("DIV");
        // 2. Append children to div
        // 3. Return div
      }
    }
*/

class DomElement {
  constructor(attrs, children) {
    this.attrs = attrs;
    this.children = children;
  }
  draw(type) {
    const element = document.createElement(type);
    let attrArray = Object.entries(this.attrs);
    if (attrArray.length) {
      attrArray.forEach(([key, value]) => element.setAttribute(key, value));
    }
    if (this.children) {
      if (typeof this.children === "string") {
        element.innerHTML = this.children;
      } else if (Array.isArray(this.children)) {
        this.children.forEach((child) => element.appendChild(child.draw()));
      } else {
        element.appendChild(this.children.draw());
      }
    }
    return element;
  }
}

class DivElement extends DomElement {
  constructor(type, ...args) {
    super(...args);
    this.type = type;
  }
  draw() {
    return super.draw(this.type);
  }
}

class InputElement extends DomElement {
  constructor(type, ...args) {
    super(...args);
    this.type = type;
  }
  draw() {
    return super.draw(this.type);
  }
}

class SpanElement extends DomElement {
  constructor(type, ...args) {
    super(...args);
    this.type = type;
  }
  draw() {
    return super.draw(this.type);
  }
}

class FormElement extends DomElement {
  constructor(type, ...args) {
    super(...args);
    this.type = type;
  }
  draw() {
    return super.draw(this.type);
  }
}

class UlElement extends DomElement {
  constructor(type, ...args) {
    super(...args);
    this.type = type;
  }
  draw() {
    return super.draw(this.type);
  }
}

class LiElement extends DomElement {
  constructor(type, ...args) {
    super(...args);
    this.type = type;
  }
  draw() {
    return super.draw(this.type);
  }
}

class BrElement extends DomElement {
  constructor(type, ...args) {
    super(...args);
    this.type = type;
  }
  draw() {
    return super.draw(this.type);
  }
}

class LabelElement extends DomElement {
  constructor(type, ...args) {
    super(...args);
    this.type = type;
  }
  draw() {
    return super.draw(this.type);
  }
}

function el(type, attrs, children) {
  let element;
  switch (type) {
    case "div":
      element = new DivElement(type, attrs, children);
      break;

    case "span":
      element = new SpanElement(type, attrs, children);
      break;

    case "form":
      element = new FormElement(type, attrs, children);
      break;

    case "input":
      element = new InputElement(type, attrs, children);
      break;

    case "ul":
      element = new UlElement(type, attrs, children);
      break;

    case "li":
      element = new LiElement(type, attrs, children);
      break;

    case "br":
      element = new BrElement(type, attrs, children);
      break;

    case "label":
      element = new LabelElement(type, attrs, children);
      break;
  }

  return element;
}

// TESTS

// 1

/* const tree =
        el("div", {"class": "some_classname", "id": "some_id"},
        el("span", {}, 'hello')
    );
*/

// 2

/*
  const tree = el(
  "div",
  {},
  el("ul", {}, [
    el("li", {}, "Item 1"),
    el("li", {}, "Item 2"),
    el("li", {}, "Item 3"),
  ])
);
*/

// 3

const tree = el("form", { action: "/some_action" }, [
  el("label", { for: "name" }, "First name:"),
  el("br", {}, null),
  el(
    "input",
    { type: "text", id: "name", name: "name", value: "My name" },
    null
  ),
  el("br", {}, null),
  el("label", { for: "last_name" }, "Last name:"),
  el("br", {}, null),
  el(
    "input",
    {
      type: "text",
      id: "last_name",
      name: "last_name",
      value: "My second name",
    },
    null
  ),
  el("br", {}, null),
  el("input", { type: "submit", value: "Submit" }, null),
]);

document.getElementById("root").appendChild(tree.draw());
