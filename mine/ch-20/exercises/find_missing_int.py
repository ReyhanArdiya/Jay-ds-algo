def find_missing_int(int_arr: list[int]):
    """
    time O(N + M)
    space O(N)
    """
    int_hash = {}
    highest_int = int_arr[0]

    # N loop
    for num in int_arr:
        int_hash[num] = True
        if num > highest_int:
            highest_int = num

    # M loop
    for num in range(highest_int + 1):
        if num not in int_hash:
            return num


def find_missing_int_linear(int_arr: list[int]):
    full_sum = 0
    current_sum = 0

    for n in range(len(int_arr)):
        full_sum += n + 1
        current_sum += int_arr[n]

    return full_sum - current_sum


arr1 = [2, 3, 0, 6, 1, 5]
arr2 = [8, 2, 3, 9, 4, 7, 5, 0, 6]

# CMT I think my version is faster since N + M can be less than 2N especially since my version
# can break early, but it does take more space than Jay's version which is just O(1)

print(find_missing_int(arr1))
print(find_missing_int(arr2))

print(find_missing_int_linear(arr1))
print(find_missing_int_linear(arr2))
