def word_builder(strArr: list):
    """
    - 1 + N + N * (N - 1) + 1 + 1
    - N + N * N
    - N^2
    """
    res = []

    for i in range(len(strArr)):
        for j in range(len(strArr)):
            if i != j:
                res.append(strArr[i] + strArr[j])

    # for IIdx, i in enumerate(strArr):
    #     for JIdx, j in enumerate(strArr):
    #         if IIdx != JIdx:
    #             res.append(i + j)

    return res


print(word_builder(["a", "b", "c", "d"]))
print(word_builder(["me", "mo", "ma", "me", "mi"]))
