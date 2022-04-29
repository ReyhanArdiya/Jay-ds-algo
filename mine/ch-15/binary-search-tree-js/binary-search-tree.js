import BinaryTreeNode from "./binary-tree-node.js";
import { Stack } from "../../ch-9/stack.js";
import traverseTree from "../traverse-tree.js";

/**
 * The first data, left and right will be the root
 *
 * @this In this class, `this` will refer to the root node
 */
class BinarySearchTree extends BinaryTreeNode {
	#rootNode = this;

	#goToLeftOrRight(data, node) {
		return data >= node.data ? node.rightChild : node.leftChild;
	}

	#getAvailableChild(node) {
		return node.leftChild ? node.leftChild : node.rightChild;
	}

	/**
	 *
	 * @param {BinaryTreeNode | BinarySearchTree} node
	 *
	 * @param {boolean} firstTime
	 */
	searchSuccessor(node, firstTime = true) {
		if (!node.leftChild) {
			return node;
		}

		const nextNode = firstTime ? node.rightChild : node.leftChild;
		if (firstTime) {
			firstTime = false;
		}

		return this.searchSuccessor(nextNode, firstTime);
	}

	insert(data, currentNode = this.#rootNode) {
		// If its bigger, we drill to right
		if (data >= currentNode.data) {
			// If right still is a node, we drill into that instead
			if (currentNode.rightChild) {
				return this.insert(data, currentNode.rightChild);
			} else {
				// If it is null, we just insert it there and stop recursion
				return currentNode.rightChild = new BinarySearchTree(data);
			}
		} else if (data < currentNode.data) {
			// If its smaller, we drill to left
			// If left still is a node, we drill into that instead
			if (currentNode.leftChild) {
				return this.insert(data, currentNode.leftChild);
			} else {
				// If it is null, we just insert it there and stop recursion
				return currentNode.leftChild = new BinarySearchTree(data);
			}
		}
	}

	search(val, currentNode = this.#rootNode) {
		// Base case:
		// 1. is when we found the node we are looking for
		// 2. is when the currentNode is null which means it is the end of the tree
		// and we cant go down anymore
		if (!currentNode || currentNode.data === val) {
			return currentNode;
		}

		return this.search(
			val,
			// If val is more or equals to current, we'll search the rightChild
			// since all of the right ancestor will be more than current so
			// there is a possibility it is located there; vice-versa for leftChild
			this.#goToLeftOrRight(val, currentNode)
		);
	}

	searchAndGetParent(val, currentNode = this.#rootNode) {
		if (
			!currentNode ||
			currentNode.leftChild.data === val ||
			currentNode.rightChild.data === val
		) {
			return currentNode;
		}

		return this.searchAndGetParent(
			val,
			// If val is more or equals to current, we'll search the rightChild
			// since all of the right ancestor will be more than current so
			// there is a possibility it is located there; vice-versa for leftChild
			this.#goToLeftOrRight(val, currentNode)
		);
	}

	delete(val, currentNode = this.#rootNode) {
		/** @type {BinarySearchTree | BinaryTreeNode}*/
		const toBeDeletedNode = this.search(val, currentNode);

		// If we didn't find the node, return null
		if (!toBeDeletedNode) {
			return toBeDeletedNode;
		}

		// Get the parent of toBeDeletedNode since the way we are deleting it is by
		// changing the reference to that node from the parent to null
		const parentOfToBeDeletedNode =
			toBeDeletedNode === this.#rootNode ?
				this.#rootNode :
				this.searchAndGetParent(toBeDeletedNode.data, currentNode);

		// If the tobedeleted doesn't have any child, just delete it
		if (!toBeDeletedNode.leftChild && !toBeDeletedNode.rightChild) {
			// Change the parent's reference to that deleted node to null
			if (
				parentOfToBeDeletedNode.leftChild.data === toBeDeletedNode.data
			) {
				parentOfToBeDeletedNode.leftChild = null;
			} else {
				parentOfToBeDeletedNode.rightChild = null;
			}

			return;
		}

		// If it has two children
		if (toBeDeletedNode.leftChild && toBeDeletedNode.rightChild) {
			// Get the successor of this node
			const successor = this.searchSuccessor(toBeDeletedNode);
			const parentOfSuccessor = this.searchAndGetParent(
				successor.data,
				currentNode
			);

			toBeDeletedNode.data = successor.data;

			if (successor.rightChild) {
				parentOfSuccessor.leftChild = successor.rightChild;
				successor.rightChild = null;
			} else if (parentOfSuccessor.leftChild.data === successor.data) {
				parentOfSuccessor.leftChild = null;
			} else {
				parentOfSuccessor.rightChild = null;
			}

			return;
		}

		// If it has one children
		if (toBeDeletedNode.leftChild || toBeDeletedNode.rightChild) {
			if (toBeDeletedNode.leftChild) {
				// We delete it by switching their data
				toBeDeletedNode.data = toBeDeletedNode.leftChild.data;

				// And setting the reference to old leftChild to null => moving it up
				toBeDeletedNode.leftChild = null;
			} else {
				// We delete it by switching their data
				toBeDeletedNode.data = toBeDeletedNode.rightChild.data;

				// And setting the reference to old rightChild to null => moving it up
				toBeDeletedNode.rightChild = null;
			}
		}
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

	inorderTraversal(currentNode = this.#rootNode) {
		if (currentNode.leftChild) {
			this.inorderTraversal(currentNode.leftChild);
		}

		console.log(currentNode.data);

		if (currentNode.rightChild) {
			this.inorderTraversal(currentNode.rightChild);
		}
	}

	preorderTraverse(
		cb = node => console.log(node.data),
		currentNode = this.#rootNode
	) {
		console.log(currentNode.data);

		if (currentNode.leftChild) {
			this.preorderTraverse(cb, currentNode.leftChild);
		}

		if (currentNode.rightChild) {
			this.preorderTraverse(cb, currentNode.rightChild);
		}
	}

	postorderTraverse(
		cb = node => console.log(node.data),
		currentNode = this.#rootNode
	) {
		if (currentNode.leftChild) {
			this.postorderTraverse(cb, currentNode.leftChild);
		}

		if (currentNode.rightChild) {
			this.postorderTraverse(cb, currentNode.rightChild);
		}

		console.log(currentNode.data);
	}

	max(currentNode = this.#rootNode) {
		// Keep drilling to the right child until we find the one that doesn't have rightchild.
		// The largest number is the bottom-right most node because of how binary search works
		// (where if the value is greater than current, then search the rightChild)
		if (!currentNode.rightChild) {
			return currentNode.data;
		}

		return this.max(currentNode.rightChild);
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
	new BinarySearchTree(25)
	// new BinarySearchTree()
);

const biSTreeStr = new BinarySearchTree(
	"Moby Dick", // root
	new BinarySearchTree(
		"Great Expectations",
		new BinarySearchTree("Alice in Wonderland"),
		new BinarySearchTree("Lord of the Flies")
	),
	new BinarySearchTree(
		"Robinson Crusoe",
		new BinarySearchTree("Pride and Prejudice"),
		new BinarySearchTree("The Odyssey")
	)
	// new BinarySearchTree()
);

// biSTreeStr.inorderTraversal();
// biSTree.inorderTraversal();
biSTreeStr.postorderTraverse();
// console.log(biSTree.max());
// console.log(biSTreeStr.max());

// biSTreeStr.traverseV2(node => console.log(node.data));
// console.log("=====");
// biSTreeStr.delete("Moby Dick");
// biSTreeStr.traverseV2(node => console.log(node.data));

// Traversing the tree should print out in order => 50, 25, 10, 4, 11, 33, 30, 40, 75, 56, 52, 61, 89, 82, 95
// biSTree.traverseV1(node => console.log(node.data));
// console.log("=====");
// biSTree.traverseV2(node => console.log(node.data));
// console.log("=====");
// biSTree2.traverseV2(node => console.log(node.data));
// console.log("=====");
// biSTree3.traverseV2(node => console.log(node.data));
// console.log("=====");
// biSTree4.traverseV2(node => console.log(node.data));
// console.log("=====");
// biSTree5.traverseV2(node => console.log(node.data));
// console.log("=====");

// traverseTree(({ data }) => console.log(data), biSTree);
// console.log(biSTree.search(51));
// biSTree.addChild(94);
// biSTree.addChild(96);
// biSTree.traverseV2(node => console.log(node.data));

// biSTree5.traverseV2();
// console.log("=====");
// biSTree5.insert(94);
// biSTree5.insert(50);
// biSTree5.insert(93);
// biSTree5.insert(96);
// biSTree5.traverseV2();

// /* CMT I follow the explanation starting from page 260 */
// biSTree.traverseV2(node => console.log(node.data));

// // When deleted node doesnt have any children
// console.log("===== delete 4");
// biSTree.delete(4);
// biSTree.traverseV2(node => console.log(node.data));

// // When deleted node has one child
// console.log("===== delete 10");
// biSTree.delete(10);
// biSTree.traverseV2(node => console.log(node.data));

// // When deleted node has two children
// console.log("===== delete 56");
// biSTree.delete(56);
// biSTree.traverseV2(node => console.log(node.data));

// // When sucessor has right children
// console.log("===== insert 55");
// biSTree.insert(55);
// biSTree.traverseV2(node => console.log(node.data));

// console.log("===== delete 50");
// biSTree.delete(50);
// biSTree.traverseV2(node => console.log(node.data));

// // Random
// console.log("===== delete 25");
// biSTree.delete(25);
// biSTree.traverseV2(node => console.log(node.data));

// console.log("===== delete 345");
// biSTree.delete(345);
// biSTree.traverseV2(node => console.log(node.data));

// console.log("===== delete 75");
// biSTree.delete(75);
// biSTree.traverseV2(node => console.log(node.data));
