def sum(arr: list):
    if len(arr) != 1:
        return arr[0] + sum(arr[1:])
    return arr[0]


print(sum([1, 2, 3]))
# Stack!
# BASE: return 3 => 3
# return 2 + sum([3]) => 2 + 3 => 5
# return 1 + sum([2,3]) => 1 + 5 => 6
