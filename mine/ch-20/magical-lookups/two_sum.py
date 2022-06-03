def two_sum_quadratic(arr, target):
    """
    # O(N^2)
    # space O(1)
    """
    iteration = range(len(arr))

    for i in iteration:
        for j in iteration:
            if i != j and arr[i] + arr[j] == target:
                return True
    return False


def two_sum_linear(num_arr, target_sum):
    """
    # O(N)
    # space O(N)
    """
    nums = {}

    for num in num_arr:
        if nums.get(target_sum - num):
            return True
        nums[num] = True

    return False


arr_true = [2, 0, 4, 1, 7, 9]
arr_false = [2, 0, 4, 5, 3, 9]
target = 10

# Quadratic
print(two_sum_quadratic(arr_true, target))
print(two_sum_quadratic(arr_false, target))

# Linear
print(two_sum_linear(arr_true, target))
print(two_sum_linear(arr_false, target))
