from math import floor


class Heap:
    # __data = [100, 88, 25, 87, 16, 8, 12, 86, 50, 2, 15, 3]
    __data = []

    def print_nodes(self):
        for node in self.__data:
            print(node)

    def root_node(self):
        """
        Returns the root node of this Heap
        """
        return self.__data[0]

    def last_node(self):
        """
        Returns the last node of this Heap
        """
        return self.__data[-1]

    def left_child_of_index(self, index, return_node=True):
        node_index = index * 2 + 1

        if return_node:
            return self.__data[node_index]

        return node_index

    def right_child_of_index(self, index, return_node=True):
        node_index = index * 2 + 2

        if return_node:
            return self.__data[node_index]

        return node_index

    def parent_of_index(self, index, return_node=True):
        node_index = floor((index - 1) / 2)

        if return_node:
            return self.__data[node_index]

        return node_index

    def insert(self, value):
        # Insert the value as the next last_node
        self.__data.append(value)

        # Get the last_node_i, which at first will be the last item in the array
        last_node_i = len(self.__data) - 1

        # Get its parent index and value
        last_node_parent_i = self.parent_of_index(last_node_i, False)
        last_node_parent_val = self.__data[last_node_parent_i]

        # While our new last_node is not at root and its value is greater than the parent, trickle up
        while last_node_i > 0 and value > last_node_parent_val:
            # Switch their places
            self.__data[last_node_i] = last_node_parent_val
            self.__data[last_node_parent_i] = value

            # last_node index will be at its parent's index
            last_node_i = last_node_parent_i

            # Since our last_node moved, its parent changes
            last_node_parent_i = self.parent_of_index(last_node_i, False)
            last_node_parent_val = self.__data[last_node_parent_i]

    # My version
    def delete(self):
        # Move last_node to root node
        self.__data[0] = self.__data.pop()

        # Keep the root_node to trickle down later
        trickle_node_i = 0
        trickle_node_val = self.root_node()

        # the trickle_node children for checking
        lc_i = self.left_child_of_index(trickle_node_i, False)
        rc_i = self.right_child_of_index(trickle_node_i, False)

        # Largest between children
        largest_i = lc_i if self.__data[lc_i] > self.__data[rc_i] else rc_i
        largest_val = self.__data[largest_i]

        while trickle_node_val < largest_val:
            self.__data[trickle_node_i] = largest_val
            self.__data[largest_i] = trickle_node_val

            # move the trickle_node index
            trickle_node_i = largest_i

            # the trickle_node new children for checking
            lc_i = self.left_child_of_index(trickle_node_i, False)
            rc_i = self.right_child_of_index(trickle_node_i, False)
            data_len = len(self.__data) - 1

            # If we trickled to the bottom where we don't have any children
            # (signified by indices that are out of range), we stop
            if lc_i > data_len or rc_i > data_len:
                break

            # Largest between new children
            largest_i = lc_i if self.__data[lc_i] > self.__data[rc_i] else rc_i
            largest_val = self.__data[largest_i]

    # Jays ver.
    def greater_child_of(self, index, ret_val: True):
        try:
            # Children indices
            lc_i = self.left_child_of_index(index, False)
            rc_i = self.right_child_of_index(index, False)

            data_len = len(self.__data)

            # If right children is out of range but left children is in data, it means we don't have
            # a right child and we just return left children
            if rc_i >= data_len > lc_i:
                return lc_i if not ret_val else self.__data[lc_i]

            # Largest between children
            largest_i = lc_i if self.__data[lc_i] > self.__data[rc_i] else rc_i
            largest_val = self.__data[largest_i]

            return largest_val if ret_val else largest_i
        except IndexError:
            return False

    def delete_jay(self):
        # Move last_node to root node
        self.__data[0] = self.__data.pop()

        # Keep the root_node to trickle down later
        trickle_node_i = 0
        trickle_node_val = self.root_node()

        # Get largest child if it exist
        largest_child_i = self.greater_child_of(trickle_node_i, False)

        # Only trickle down when we have a largest child AND it is greater than trickle_node_val
        while largest_child_i and trickle_node_val < self.__data[largest_child_i]:
            # Swap them
            self.__data[trickle_node_i], self.__data[largest_child_i] = self.__data[largest_child_i], self.__data[trickle_node_i]

            # Setup the new indices
            trickle_node_i = largest_child_i
            largest_child_i = self.greater_child_of(trickle_node_i, False)
