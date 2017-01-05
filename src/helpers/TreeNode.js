export default class TreeNode {
  constructor(value, parent, children) {
    this._value = value;
    this._parent = parent;
    this._children = children;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (value) {
      this._value = value;
    }
  }

  get parent() {
    return this._parent;
  }

  set parent(parent) {
    if (parent) {
      this._parent = parent;
    }
  }

  get children() {
    return this._children;
  }

  set children(children) {
    if (children) {
      this._children = children;
    }
  }

  addChild(child) {
    this._children.push(child);
  }
}
