# 1, 3, 6, 10, 15, 21
def triangular_numbers(n, counter=1):
    return counter + triangular_numbers(n, counter + 1) if n != counter else counter


# print(triangular_numbers(3))
# print(triangular_numbers(4))
print(triangular_numbers(7))
# print(triangular_numbers(8))
# print(triangular_numbers(9))
print(triangular_numbers(10))
print(triangular_numbers(11))


def triangle(n): return n + triangle(n - 1) if n != 1 else 1


print(triangle(7))
print(triangle(10))
print(triangle(11))
