class TreeNode:
    def __init__(self, data) -> None:
        self.left = None
        self.data = data
        self.right = None

    def __setitem__(self, prop, elem):
        self[prop] = elem

    def __setattr__(self, __name: str, __value) -> None:
        self[__name] = __value


# t = TreeNode(1)
# t.data = 2
# print(t.data)
