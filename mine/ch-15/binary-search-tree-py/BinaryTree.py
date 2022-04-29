from TreeNode import TreeNode


class BinaryTree:
    __root = TreeNode(None)

    def __init__(self, data) -> None:
        self.__root.data = data

    def add_child(self, data, which="left"):
        self.__root[which] = TreeNode(data)


biTree = BinaryTree(1)
biTree.add_child(2)


print(biTree)
