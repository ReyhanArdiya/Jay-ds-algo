# Partitions an array. This version works but it's not the most optimized :)

def partition(arr: list, r_pointer=None, l_pointer=0):
    """
    Partitions an array
     """
    r_pointer = len(arr) - 2 if r_pointer is None else r_pointer
    pivot = arr[-1]

    while l_pointer < r_pointer:
        arr_slice = arr[l_pointer:r_pointer + 1]

        for l_val in arr_slice:
            if l_val >= pivot:
                break
            l_pointer += 1

        arr_slice.reverse()
        for r_val in arr_slice:
            if r_val <= pivot or r_val == 0:
                break
            r_pointer -= 1

        if l_pointer < r_pointer:
            # temp_left = arr[l_pointer]
            # arr[l_pointer] = arr[r_pointer]
            # arr[r_pointer] = temp_left
            arr[l_pointer], arr[r_pointer] = arr[r_pointer], arr[l_pointer]

    # arr[-1] = arr[l_pointer]
    # arr[l_pointer] = pivot
    arr[-1], arr[l_pointer] = arr[l_pointer], pivot

    return l_pointer


# print(partition([0, 5, 2, 1, 6, 3]))
# print(partition([10, 4, 5, 0.2, 2, 3, 6, 5.5, 4.9, 7, 20, 4.8]))
