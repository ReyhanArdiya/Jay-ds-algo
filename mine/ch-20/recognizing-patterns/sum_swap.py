def sum_swap_quadratic(arr_1, arr_2):
    """
    time O(N * M)
    space O(1)
     """
    for i in range(len(arr_1)):
        for j in range(len(arr_2)):
            arr_1[i], arr_2[j] = arr_2[j], arr_1[i]

            if sum(arr_1) == sum(arr_2):
                arr_1[i], arr_2[j] = arr_2[j], arr_1[i]
                return [i, j]

            arr_1[i], arr_2[j] = arr_2[j], arr_1[i]


def sum_swap_linear(arr_1, arr_2):
    """
    time O(N + M)
    space O(N + M)
     """
    arr_1_sum = sum(arr_1)
    arr_2_sum = sum(arr_2)

    smallest_arr = None
    biggest_arr = None

    if arr_2_sum < arr_1_sum:
        smallest_arr = arr_2
        biggest_arr = arr_1
    else:
        smallest_arr = arr_1
        biggest_arr = arr_2

    biggest_arr_hashed = {}
    for i in range(len(biggest_arr)):
        biggest_arr_hashed[biggest_arr[i]] = i

    smallest_arr_sum = sum(smallest_arr)
    balanced_sum = abs(arr_1_sum - arr_2_sum) // 2 + smallest_arr_sum
    difference = balanced_sum - smallest_arr_sum

    for i in range(len(smallest_arr)):
        counterpart = smallest_arr[i] + difference
        counterpart_index = biggest_arr_hashed.get(counterpart)
        if counterpart_index is not None:
            return [i, counterpart_index] if smallest_arr == arr_1 else [counterpart_index, i]


array_1 = [1, 8, 2, 4]
array_2 = [0, 7, 2, 2]
array_3 = [1, 2, 3, 4, 5]
array_4 = [6, 7, 8]
array_5 = [10, 15, 20]
array_6 = [5, 30]

print(sum_swap_quadratic(array_1, array_2))
print(sum_swap_linear(array_1, array_2))

print(sum_swap_quadratic(array_3, array_4))
print(sum_swap_linear(array_3, array_4))

print(sum_swap_quadratic(array_5, array_6))
print(sum_swap_linear(array_5, array_6))

hash_1 = {"a": 1, "c": 2}
hash_2 = {"c":2,"a": 1}

print(hash_1 == hash_2)
