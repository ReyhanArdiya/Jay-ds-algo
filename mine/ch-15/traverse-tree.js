import BinaryTreeNode from "./binary-search-tree-js/binary-tree-node.js";
import { Stack } from "../ch-9/stack.js";

/**
 * I assume that this will traverse any tree, but so far I've only
 * tested this with regular binary tree and binary search tree.
 *
 * @param {Function} cb
 *
 * @param {BinaryTreeNode} currentNode
 *
 * @param {Map<BinaryTreeNode, {node: BinaryTreeNode, totalChildren: number, visited: number }>} visitedNodes
 *
 * @param {Stack} unfinishedNodes
 */
const traverseTree = (
	cb = node => console.log(node),
	// Since the first currentNode is root, then automatically root will be the first previousVisited node
	currentNode = new BinaryTreeNode(
		"root",
		new BinaryTreeNode("rootLeft"),
		new BinaryTreeNode("rootRight")
	),
	visitedNodes = new Map([]),
	unfinishedNodes = new Stack()
) => {
	// In each recursion, we just have to work with one node (currentNode),
	// and later delegate the nextNode to the next recursion

	// Check if we have visited currentNode before
	let currentInVisitedNode = visitedNodes.get(currentNode);

	// If we have, we just increment the number of time we visited it
	if (currentInVisitedNode) {
		currentInVisitedNode.visited++;
	} else {
		// If not, we store it in our memo
		visitedNodes.set(currentNode, {
			node          : currentNode,
			totalChildren : 0,
			visited       : 1
		});

		// And change the currentInVisitedNode to be currentNode after it has been saved
		currentInVisitedNode = visitedNodes.get(currentNode);

		// We increment its totalChildren
		if (currentInVisitedNode.node.leftChild) {
			currentInVisitedNode.totalChildren++;
		}

		if (currentInVisitedNode.node.rightChild) {
			currentInVisitedNode.totalChildren++;
		}
	}

	// We only pass it to cb if we visited the current node for the first time
	if (currentInVisitedNode.visited === 1) {
		cb(currentNode);
	}

	// We'll get the top node in our stack memo to work on next
	let topNodeInStack = unfinishedNodes.read;

	// If the current node has any children AND
	// the current topNodeInStack is not the current
	// (as to avoid pushing the same node twice to the stack)...
	if (
		currentInVisitedNode.totalChildren &&
		topNodeInStack?.node !== currentNode
	) {
		// ...We push it to the stack so that we can track that we should visit
		// this node again until we have visited all of its children
		unfinishedNodes.push(currentInVisitedNode);

		// We also change topNodeInStack so that we can work with the latest
		// top node if it was just pushed previously
		topNodeInStack = unfinishedNodes.read;
	}

	// If the number of times we have visited this topNode is more than
	// the total of its children, it means we have visited all of its children
	if (topNodeInStack.visited > topNodeInStack.totalChildren) {
		// Therefore, we can pop it from the stack to indicate that we are finished
		// with this node since we have visited of its children
		unfinishedNodes.pop();

		// And we also change topNodeInStack so that we can work with the
		// latest top node since it was changed by popping something before
		topNodeInStack = unfinishedNodes.read;
	}

	// The base case when stack is empty, which means we have visited all
	// of our tree's nodes, therefore we didn't push anything new again before this line
	if (!unfinishedNodes.read) {
		return;
	}

	// The nextNode we are going to work on could be...

	// ...The topNodeInStack (the reason why we access the node property is because
	// we store its memory reference there, since the schema in our stack is the node,
	// the node's totalChildren and the number of times we have visited the node)
	let nextNode = topNodeInStack.node;
	if (
		topNodeInStack.node.leftChild &&
		!visitedNodes.get(topNodeInStack.node.leftChild)
	) {
		// ... the node's leftChild if the topNode has a leftChild and we haven't visited it yet
		nextNode = topNodeInStack.node.leftChild;
	} else if (
		topNodeInStack.node.rightChild &&
		!visitedNodes.get(topNodeInStack.node.rightChild)
	) {
		// ... the node's rightChild if the topNode has a rightChild and we haven't visited it yet
		nextNode = topNodeInStack.node.rightChild;
	}

	// Then finally, we recurse with the nextNode to work with
	return traverseTree(cb, nextNode, visitedNodes, unfinishedNodes);
};

export default traverseTree;

// const BinaryTree = new BinaryTreeNode(
// 	1,
// 	new BinaryTreeNode(2, new BinaryTreeNode(3), new BinaryTreeNode(4)),
// 	new BinaryTreeNode(5, new BinaryTreeNode(6), new BinaryTreeNode(7))
// );

// traverseTree(node => console.log(node.data), BinaryTree);
