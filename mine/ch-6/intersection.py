def intersectionV1(arr1: list, arr2: list):
    return [i for i in arr1 if arr2.count(i)]


def intersectionV2(arr1: list, arr2: list):
    counter = 0
    arr = []
    for i in arr1:
        for j in arr2:
            if i == j:
                arr.append(i)
                counter += 1
                break
            counter += 1

    print(counter)
    return arr


# print(intersectionV1([1, 2, 3, 3], [2, 3, 3]))
print(intersectionV2([1, 2, 4, 3, 5], [1, 2, 4, 3, 5]))
