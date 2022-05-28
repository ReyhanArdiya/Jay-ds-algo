def reverse_in_place(arr: list):
    length = len(arr)
    for i in range(length // 2):  # == floor(length / 2)
        arr[i], arr[length - 1 - i] = arr[length - 1 - i], arr[i]

    return arr


print(reverse_in_place([1, 2, 3, 4, 5]))
