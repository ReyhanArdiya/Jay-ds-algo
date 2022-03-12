def count_ones(arr_arr: list, count_what):
    count = 0

    for row in arr_arr:
        for col in row:
            if col == count_what:
                count += 1

    return count


print(count_ones([
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1],
    [1, 0]
], count_what=1
))
