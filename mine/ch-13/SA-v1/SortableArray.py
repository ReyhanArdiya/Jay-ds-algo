from partition import partition


class SortableArray:
    def __init__(self, *args) -> None:
        self.arr = list(args)

    def partition(self):
        return partition(self.arr)
        # return self.arr


arr1 = SortableArray(0, 5, 2, 1, 6, 3)
print(arr1.partition())
print(arr1.arr)

arr2 = SortableArray(3, 4, 2, 0.2, 4.8, 10, 6, 5.5, 4.9, 7, 20, 5)
print(arr2.partition())
print(arr2.arr)
