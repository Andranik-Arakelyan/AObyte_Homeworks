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

    this.children = Array.isArray(children)
      ? children
      : !children
      ? []
      : [children];
  }
  draw(type) {
    const element = document.createElement(type);
    let attrArray = Object.entries(this.attrs);
    if (attrArray.length) {
      attrArray.forEach(([key, value]) => element.setAttribute(key, value));
    }

    this.children.forEach((child) => element.appendChild(child.draw()));

    // if (this.children) {
    //   if (Array.isArray(this.children)) {
    //     this.children.forEach((child) => element.appendChild(child.draw()));
    //   } else {
    //     element.appendChild(this.children.draw());
    //   }
    // }
    return element;
  }
}

class DivElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.type = "div";
  }
  draw() {
    return super.draw(this.type);
  }
}

class InputElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.type = "input";
  }
  draw() {
    return super.draw(this.type);
  }
}

class SpanElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.type = "span";
  }
  draw() {
    return super.draw(this.type);
  }
}

class FormElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.type = "form";
  }
  draw() {
    return super.draw(this.type);
  }
}

class UlElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.type = "ul";
  }
  draw() {
    return super.draw(this.type);
  }
}

class LiElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.type = "li";
  }
  draw() {
    return super.draw(this.type);
  }
}

class BrElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.type = "br";
  }
  draw() {
    return super.draw(this.type);
  }
}

class LabelElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.type = "label";
  }
  draw() {
    return super.draw(this.type);
  }
}

class OtherElement extends DomElement {
  constructor(nodeText, ...args) {
    super(...args);
    this.nodeText = nodeText;
  }
  draw() {
    return document.createTextNode(this.nodeText);
  }
}

function el(type, attrs, children) {
  if (!(children instanceof DomElement) && !Array.isArray(children)) {
    children = new OtherElement(children);
  }
  let element;
  switch (type) {
    case "div":
      element = new DivElement(attrs, children);
      break;

    case "span":
      element = new SpanElement(attrs, children);
      break;

    case "form":
      element = new FormElement(attrs, children);
      break;

    case "input":
      element = new InputElement(attrs, children);
      break;

    case "ul":
      element = new UlElement(attrs, children);
      break;

    case "li":
      element = new LiElement(attrs, children);
      break;

    case "br":
      element = new BrElement(attrs, children);
      break;

    case "label":
      element = new LabelElement(attrs, children);
      break;
  }

  return element;
}

// TESTS

// 1

// const tree = el(
//   "div",
//   { class: "some_classname", id: "some_id" },
//   el("span", { class: "other" }, "hello")
// );

// 2

// const tree = el("form", { action: "/some_action" }, [
//   el("label", { for: "name" }, "Item 1"),
//   el("li", {}, "Item 2"),
//   el("li", {}, "Item 3"),
// ]);

// 3

const tree = el("form", { action: "/some_action" }, [
  el("label", { for: "name" }, "First name:"),
  el("br", {}),
  el("input", { type: "text", id: "name", name: "name", value: "My name" }),
  el("br", {}),
  el("label", { for: "last_name" }, "Last name:"),
  el("br", {}),
  el("input", {
    type: "text",
    id: "last_name",
    name: "last_name",
    value: "My second name",
  }),
  el("br", {}),
  el("input", { type: "submit", value: "Submit" }),
]);

document.getElementById("root").appendChild(tree.draw());
