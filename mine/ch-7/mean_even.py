from functools import reduce


def average_of_even_numbers(arr: list):
    evens = [num for num in arr if not (num % 2)]

    return reduce(lambda a, b: a + b, evens) / len(evens)


print(average_of_even_numbers([2, 4, 1, 6, 8]))
