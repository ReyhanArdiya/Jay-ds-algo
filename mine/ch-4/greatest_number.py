import numpy as np

arr = list(np.random.randint(1, 50, 50))
# arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
print(arr)

# O(N2) ver


def greatestNumber(array):
    counter = 0
    for i in array:
        # counter += 1
        # Assume for now that i is the greatest:
        isIValTheGreatest = True
        for j in array:
            counter += 1
            # If we find another value that is greater than i,
            # i is not the greatest:
            if j > i:
                isIValTheGreatest = False
        # If, by the time we checked all the other numbers, i
        # is still the greatest, it means that i is the greatest number:
        if isIValTheGreatest:
            print(counter)
            return i


print(greatestNumber(arr))
#  O(N) ver


def greatest_number(arr):
    counter = 0
    highest = arr[0]
    for i in arr:
        counter += 1
        if i > highest:
            highest = i
    print(counter)
    return highest


print(greatest_number(arr))

counter = 0
const = 256
while const != 1:
    counter += 1
    const /= 2
print(counter)
