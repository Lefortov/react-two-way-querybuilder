import TreeNode from './TreeNode';

export default class ASTree {
  static buildTree(tokens, combinators) {
    let tree;
    let currentNode = null;
    for (let i = 0, length = tokens.length; i < length; i += 1) {
      if (tokens[i] === '(') {
        const node = new TreeNode(tokens[i], currentNode, []);
        if (!currentNode) {
          tree = node;
        } else {
          currentNode.addChild(node);
        }
        currentNode = node;
      }

      const currCombinator = combinators.find(x => x.combinator === tokens[i]);
      if (currCombinator && currentNode.value !== tokens[i]) {
        const node = new TreeNode(tokens[i], currentNode, []);
        currentNode.addChild(node);
        currentNode = node;
      }

      if (tokens[i].field) {
        if (!combinators.find(x => x.combinator === currentNode.value)) {
          const combinator = this.getNearestCombinator(tokens, i, combinators);
          const combNode = new TreeNode(combinator, currentNode, []);
          currentNode.addChild(combNode);
          currentNode = combNode;
        }
        const node = new TreeNode(tokens[i], currentNode, []);
        currentNode.addChild(node);
      }

      if (tokens[i] === ')') {
        while (currentNode.value !== '(') {
          currentNode = currentNode.parent;
        }
        currentNode.value += ')';
        currentNode = currentNode.parent;
      }
    }
    return tree;
  }

  static getNearestCombinator(tokens, index, combinators) {
    for (let i = index, length = tokens.length; i < length; i += 1) {
      if (combinators.find(x => x.combinator === tokens[i])) {
        return tokens[i];
      }
    }
  }
}
