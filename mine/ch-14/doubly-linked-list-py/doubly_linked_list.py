from doubly_node import DoublyNode


class DoublyLinkedList:
    __first_node = None
    __current_node = None
    __last_node = None

    def __init__(self, data) -> None:
        new_node = DoublyNode(data)
        self.__first_node = new_node
        self.__current_node = new_node
        self.__last_node = new_node

    def __reset_current(self):
        self.__current_node = self.__first_node

    def push(self, data):
        new_node = DoublyNode(data)
        self.__last_node.next = new_node
        new_node.previous = self.__last_node
        self.__last_node = new_node

    def traverse(self, callback=lambda node: print(node)):
        callback(self.__current_node)

        if self.__current_node.next is None:
            self.__reset_current()
            return

        self.__current_node = self.__current_node.next
        self.traverse(callback)


dll = DoublyLinkedList(1)
dll.push(2)

dll.traverse(lambda node: print(node.previous.data))
