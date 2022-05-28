def has_duplicates_memory_efficient(array: list):
    length = len(array)
    for i in range(length - 1):
        for j in range(i + 1, length):
            if array[i] == array[j]:
                return True

    return False


def has_duplicates_time_efficient(array: list):
    entries = {}

    for i in array:
        if entries.get(i):
            return True
        entries[i] = True

    return False


arr_1 = [1, 2, 3, 4]
arr_2 = [
    2, 1, 3, 2]

print(has_duplicates_memory_efficient(arr_1))
print(has_duplicates_memory_efficient(arr_2))

print(has_duplicates_time_efficient(arr_1))
print(has_duplicates_time_efficient(arr_2))
