def arr_max(arr: list):
    print("In arr_max")
    if len(arr) == 1:
        return arr[0]

    if arr[0] > arr_max(arr[1:]):
        return arr[0]

    return arr_max(arr[1:])


print(arr_max([1, 2, 3]))


def opt_arr_max(arr: list):
    print("In opt_arr_max")
    # Optimized to not call recursion on last number so -1 on the call stack
    if len(arr) == 2:
        return arr[0] if arr[0] > arr[1] else arr[1]

    # Use var to only call recursion one time instead of two for each highest number
    # from rest of arr
    highest = opt_arr_max(arr[1:])
    return arr[0] if arr[0] > highest else highest


print(opt_arr_max([1, 2, 3, 4]))
