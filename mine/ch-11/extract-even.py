# [1,2,3,4,5,6]
def ext_even(num_arr: list, even_nums=[]):
    """
    A function that accepts an array of numbers and
    returns a new array containing just the even numbers
    """
    if not (num_arr[0] % 2):
        even_nums.append(num_arr[0])

    if len(num_arr) == 1:
        return even_nums

    return ext_even(num_arr[1:])


print(ext_even([1, 2, 3, 4, 5, 6, 7, 8]))


def select_even(num_arr: list):
    is_even = not (num_arr[0] % 2)

    if len(num_arr) == 1:
        return [num_arr[0]] if is_even else []
    elif is_even:
        return [num_arr[0]] + select_even(num_arr[1:])
    elif len(num_arr) >= 2:
        return select_even(num_arr[1:])


print(select_even([1, 2, 3, 4, 5, 6, 7, 8]))
