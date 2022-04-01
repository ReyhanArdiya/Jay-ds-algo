def add_until_100(array):
    if len(array) == 0:
        return 0

    res = add_until_100(array[1:])
    if array[0] + res > 100:
        return res
    else:
        return array[0] + res


print(add_until_100([99, 39]))
