import { Stack } from "../../ch-9/stack.js";
import TreeNode from "./tree-node.js";

/**
 * The first data, left and right will be the root
 *
 * @this In this class, `this` will refer to the root node
 */
class BinarySearchTree extends TreeNode {
	#rootNode = this;

	addChild(data, leftVal = null, rightVal = null) {
		if (leftVal && leftVal >= data) {
			throw new Error("leftVal must be less than data!");
		}

		if (rightVal && rightVal < data) {
			throw new Error("rightVal must be more than data!");
		}

		const leftChild = leftVal && new BinarySearchTree(leftVal);
		const rightChild = rightVal && new BinarySearchTree(rightVal);
		const childTree = new BinarySearchTree(data, leftChild, rightChild);
		// console.log(childTree);
	}

	search(val, currentNode = this.#rootNode) {
		if (currentNode.data === val) {
			return currentNode;
		}

		if (val >= currentNode.data) {
			currentNode = currentNode.rightChild;
		} else {
			currentNode = currentNode.leftChild;
		}

		// Base case is when the next currentNode is null which means it is the bottom of the tree
		if (!currentNode) {
			return null;
		}

		return this.search(val, currentNode);
	}

	traverseV1(
		cb = node => console.log(node),
		// Since the first currentNode is root, then automatically root will be the first previousVisited node
		currentNode = this.#rootNode,
		previousVisited = this.#rootNode,
		unvisitedStack = new Stack(),
		// We use Map here so that hash as index key can be the node itself.
		// This allows us to determine if a node has been visited before.
		visitedNodes = new Map()
	) {
		// Base case 1: when the prev node is not root and the current is the root,
		// it means that we have traveresed the tree and we are back at the root.
		// The reason why we go back at the root again is because of how we pop
		// the unvisitedStack WHEN we go to that node, NOT AFTER we have visited the node's last child
		if (
			previousVisited !== this.#rootNode &&
			currentNode === this.#rootNode
		) {
			return;
		}

		// Use this node and set that this was the previously visited node and it has been visited
		// for the rest of the tree traversal
		cb(currentNode);
		previousVisited = currentNode;
		visitedNodes.set(currentNode, true);

		// If the currentNode has a child, it means that we need to visit each child.
		// So to do that, we need to visit its left AND/OR right child, so we need say that
		// "I want to visit this node again later since I could potentially call its child again"
		// by pushing it into a stack(just like call stacks) and visiting each child.
		if (currentNode.leftChild || currentNode.rightChild) {
			unvisitedStack.push(currentNode);
		}

		// CMT idea?
		// else if (
		// 	visitedNodes.get(currentNode.leftChild) &&
		// 	visitedNodes.get(currentNode.rightChild)
		// ) {
		// 	unvisitedStack.pop();
		// }

		// CMT this never activates, but it could've been a base case i think so imma keep it
		// // Base case 2: when the stack is empty, it means we have visited all the nodes
		// // and nothing was
		// if (!unvisitedStack.read) {
		// 	return;
		// }

		// The topNode we are going to work on is the one in the top of the stack.
		// The cool thing about this is that this could be the currentNode that was
		// pushed before OR the parent of the currentNode if currentNode wasn't
		// pushed in the previous if check.
		// This works since the top item of the stack before currentNode is pushed
		// is always going to be the parent of this currentNode in the tree.
		let topNode = unvisitedStack.read;

		// If we have visited both of this node's children before, we pop it out of the stack.
		// The previous if check adds currentNode to the stack regardless whether
		// its children has been visited before or not. Then, we check if we have visited them
		// in this if check.
		// REFAC why do i feel like i could combine this with the previous if check instead of having 2 seperate?
		if (
			visitedNodes.get(topNode.leftChild) &&
			visitedNodes.get(topNode.rightChild)
		) {
			// If this if check activaes, we should pop the top node from stack which indicates that we
			// have visited all of the node's children. We also move topNode to the
			// new item in the top of the stack (or you could say the item before the popped node).
			unvisitedStack.pop();
			topNode = unvisitedStack.read;
		}

		// We'll determine which children of the topNode to be used as the nextNode
		let nextNode;
		if (
			// Pick the left one if we haven't visited it yet AND it's not null/undef
			!visitedNodes.get(topNode.leftChild) &&
			topNode.leftChild
		) {
			nextNode = topNode.leftChild;
		} else if (
			// Pick the right one if the left one was visited before or it was null/undef AND we haven't visited
			// the rightChild yet AND it's not null/undef
			!visitedNodes.get(topNode.rightChild) &&
			topNode.rightChild
		) {
			nextNode = topNode.rightChild;
		}

		// Recurse again
		this.traverseV1(
			cb,
			nextNode,
			previousVisited,
			unvisitedStack,
			visitedNodes
		);
	}

	/**
	 *
	 * @param {Function} cb
	 *
	 * @param {BinarySearchTree} currentNode
	 *
	 * @param {Map<BinarySearchTree, {node: BinarySearchTree, totalChildren: number, visited: number }>} visitedNodes
	 *
	 * @param {Stack} unfinishedNodes
	 */
	traverseV2(
		cb = node => console.log(node),
		// Since the first currentNode is root, then automatically root will be the first previousVisited node
		currentNode = this.#rootNode,
		visitedNodes = new Map([]),
		unfinishedNodes = new Stack()
	) {
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
		return this.traverseV2(cb, nextNode, visitedNodes, unfinishedNodes);
	}

	get rootNode() {
		return this.#rootNode;
	}
}

const biSTree = new BinarySearchTree(
	50, // root
	new BinarySearchTree(
		25,
		new BinarySearchTree(
			10,
			new BinarySearchTree(4),
			new BinarySearchTree(11)
		),
		new BinarySearchTree(
			33,

			new BinarySearchTree(30),
			new BinarySearchTree(40)
		)
	),
	new BinarySearchTree(
		75,
		new BinarySearchTree(
			56,
			new BinarySearchTree(52),
			new BinarySearchTree(61)
		),
		new BinarySearchTree(
			89,
			new BinarySearchTree(82),
			new BinarySearchTree(95)
		)
	)
); // This works with traverseV2!

const biSTree2 = new BinarySearchTree(
	50, // root
	new BinarySearchTree(25),
	new BinarySearchTree(75)
); // This works with traverseV2!

// This works with traverseV2! But the it will colog undefined on the left node,
// but isn't that supposed to happen tho since technically there is a tree there
// but no value
const biSTree3 = new BinarySearchTree(
	50, // root
	new BinarySearchTree(),
	new BinarySearchTree(75)
);

// This works with traverseV2! But the it will colog undefined on the right node,
// but isn't that supposed to happen tho since technically there is a tree there
// but no value
const biSTree4 = new BinarySearchTree(
	50, // root
	new BinarySearchTree(25),
	new BinarySearchTree()
);

const biSTree5 = new BinarySearchTree(
	50, // root
	new BinarySearchTree(25),
	// new BinarySearchTree()
);

// Traversing the tree should print out in order => 50, 25, 10, 4, 11, 33, 30, 40, 75, 56, 52, 61, 89, 82, 95
// biSTree.traverseV1(node => console.log(node.data));
console.log("=====");
biSTree.traverseV2(node => console.log(node.data));
console.log("=====");
biSTree2.traverseV2(node => console.log(node.data));
console.log("=====");
biSTree3.traverseV2(node => console.log(node.data));
console.log("=====");
biSTree4.traverseV2(node => console.log(node.data));
console.log("=====");
biSTree5.traverseV2(node => console.log(node.data));
console.log("=====");
