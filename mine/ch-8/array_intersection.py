def array_intersection(arr1, arr2):
    largest_arr = None
    smallest_arr = None

    if (len(arr1) > len(arr2)):
        largest_arr = arr1
        smallest_arr = arr2
    else:
        largest_arr = arr2
        smallest_arr = arr1

    hash_table = {}
    for val in largest_arr:
        hash_table[val] = True

    print(hash_table["1"])

    return [val for val in smallest_arr if hash_table[val]]


print(array_intersection([1, 2, 3, 4, 5], [0, 2, 4, 6, 8]))
