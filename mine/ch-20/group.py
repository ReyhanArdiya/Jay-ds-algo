def groupV1(arr: list):
    """
    time O(N + M * E); N is first loop, M is second loop and E is third loop
    space O(N + M); N is chars and M is grouped atleast
     """
    chars = {}

    for val in arr:
        if chars.get(val):
            chars[val] += 1
        else:
            chars[val] = 1

    grouped = []
    for [key, val] in chars.items():
        for _ in range(val):
            grouped.append(key)

    return grouped


arr = ['a', "c", "d", "b", "b", "c", "a", "d", "c", "b", "a", "d"]
print(groupV1(arr))
