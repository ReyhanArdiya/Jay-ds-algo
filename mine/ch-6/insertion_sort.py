def insertion_sort(lst: list):
    for i in range(1, len(lst)):
        gap = i
        left_val_count = i
        temp_val = lst[i]

        for j in range(left_val_count):
            left_val_index = i - (1 + j)
            # We could not use left_val for less memory but using this is more readable IMO
            left_val = lst[left_val_index]

            if left_val > temp_val:
                lst[gap] = left_val
                lst[left_val_index] = temp_val
            elif left_val < temp_val:
                lst[gap] = temp_val
                break
            gap -= 1

    return lst


print(insertion_sort([8, 4, 2, 3]))
print(insertion_sort([4, 2, 7, 1, 3]))
print(insertion_sort([
    36, 19, 28, 21, 22, 42, 49, 16, 1, 16, 48, 14, 20, 34, 7, 9, 27, 45, 45,
    5, 44, 46, 10, 41, 16, 19, 4, 19, 25, 20, 37, 44, 34, 19, 24, 6, 11, 1,
    21, 48, 10, 4, 31, 35, 30, 32, 37, 8, 34, 7
]))
