def sum(low, high):
    if high <= low:
        return low
    else:
        return high + sum(low, high - 1)


print(sum(1, 10))
