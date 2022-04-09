from functools import reduce


class SortableArray:
    def __init__(self, *args) -> None:
        self.arr = list(args)

    def partition(self, l_pointer, r_pointer):
        """
        Partitions self.arr
         """
        pivot_index = r_pointer
        pivot = self.arr[pivot_index]
        r_pointer -= 1

        while True:
            while self.arr[l_pointer] < pivot:
                l_pointer += 1

            while self.arr[r_pointer] > pivot:
                r_pointer -= 1

            if l_pointer >= r_pointer:
                break

            self.arr[l_pointer], self.arr[r_pointer] = self.arr[r_pointer], self.arr[l_pointer]

        self.arr[l_pointer], self.arr[pivot_index] = pivot, self.arr[l_pointer]

        return l_pointer

    def quicksort(self, l_pointer, r_pointer):
        # Base case when self.arr has 0 / 1 elements
        # This also handles if there is no more subarr in the left or right of the current subarr
        # since by that point trying to r_pointer - l_pointer would most likely
        # result in a negative integer
        if r_pointer - l_pointer <= 0:
            return

        # Partition self.arr and get the pivot's index
        pivot_index = self.partition(l_pointer, r_pointer)

        # CMT why do i feel like calling this 2 times per recursion would take a lot of memory complexity?
        # Quicksort for subarray left of pivot
        self.quicksort(l_pointer, pivot_index - 1)

        # Quicksort for subarray right of pivot
        self.quicksort(pivot_index + 1, r_pointer)

        # This return is optional
        return self.arr

    def quickselect(self, kth_lowest_value, l_pointer, r_pointer):
        # Base case No. 1: when self.arr has 0 / 1 elements
        if r_pointer - l_pointer <= 0:
            return

        pivot_index = self.partition(l_pointer, r_pointer)

        # Base case No. 2: when pivot_index is the right kth_lowest_value
        if pivot_index == kth_lowest_value:
            return self.arr[pivot_index]

        if pivot_index > kth_lowest_value:
            return self.quickselect(kth_lowest_value, l_pointer, pivot_index - 1)

        if pivot_index < kth_lowest_value:
            return self.quickselect(kth_lowest_value, pivot_index + 1, r_pointer)

    def contains_dups(self):
        arr_len = len(self.arr)
        self.quicksort(0, arr_len - 1)

        for i in range(arr_len - 1):
            if self.arr[i] == self.arr[i + 1]:
                return True

        return False

    def greatest_3_product(self):
        # Sort first for O(N log N)
        self.quicksort(0, len(self.arr) - 1)

        # The greatest 3 number would be the last 3 numbers in array when it is sorted ascending
        # , so we just reduce that
        return reduce(lambda a, b: a*b, self.arr[-3:])

    def find_missing_number(self):
        arr_len = len(self.arr)

        # Sort first for O(N log N)
        self.quicksort(0, arr_len - 1)

        # Loop through array up until 2nd to last element
        for i in range(arr_len - 1):
            # Since it is sorted ascending and we expect the arrray to contain
            # 0 - arr_len; we expect that the next number after the current
            # number (i) is always + 1 of it (e.g. if the current number is 3, we expect
            # the next one to be 4). If it is not, we return the missing number
            if i + 1 != self.arr[i + 1]:
                return i + 1


# arr1 = SortableArray(0, 5, 2, 1, 6, 3)
# # arr1 = SortableArray(0,1,2)
# # print(arr1.partition(0, len(arr1.arr) - 1))
# print(arr1.quicksort(0, len(arr1.arr) - 1))
# # print(arr1.arr)


# arr2 = SortableArray(3, 4, 2, 0.2, 4.8, 10, 6, 5.5, 4.9, 7, 20, 5)
# # print(arr2.partition(0, len(arr2.arr) - 1))
# # print(arr2.arr)
# print(arr2.quicksort(0, len(arr2.arr) - 1))

# [10,1,5,7,3]
# [1,3,10,5,7]
# [1,3,5,7,10]

# arr3 = SortableArray(10, 13, 23, 9, 300)
# print(arr3.quickselect(0, 0, len(arr3.arr) - 1))  # 9
# print(arr3.quickselect(1, 0, len(arr3.arr) - 1))  # 10
# print(arr3.quickselect(2, 0, len(arr3.arr) - 1))  # 13
# print(arr3.quickselect(3, 0, len(arr3.arr) - 1))  # 23
# print(arr3.quickselect(4, 0, len(arr3.arr) - 1))  # 300
# print(arr3.quickselect(5, 0, len(arr3.arr) - 1))  # None
# print(arr3.quickselect(6, 0, len(arr3.arr) - 1))  # None

# arr3 = SortableArray(0, 50, 20, 10, 60, 30)
# print(arr3.quickselect(0, 0, len(arr3.arr) - 1))  # 9
# print(arr3.quickselect(1, 0, len(arr3.arr) - 1))  # 10
# print(arr3.quickselect(2, 0, len(arr3.arr) - 1))  # 13
# print(arr3.quickselect(3, 0, len(arr3.arr) - 1))  # 23
# print(arr3.quickselect(4, 0, len(arr3.arr) - 1))  # 300
# print(arr3.quickselect(5, 0, len(arr3.arr) - 1))  # None
# print(arr3.quickselect(6, 0, len(arr3.arr) - 1))  # None
# arr4 = SortableArray(4, 1, 3, 2, 5)
# print(arr4.contains_dups())
# arr5 = SortableArray(9, 3, 1, 5, 8)
# print(arr5.greatest_3_product())

# arr6 = SortableArray(5, 2, 4, 1, 0)
# print(arr6.find_missing_number())
# arr6 = SortableArray( 9, 3, 2, 5, 6, 7, 1, 0, 4 )
# print(arr6.find_missing_number())
