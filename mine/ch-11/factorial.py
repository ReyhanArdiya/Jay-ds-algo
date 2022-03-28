def factorial(n, i=1, product=1):
    if i > n:
        return product
    return factorial(n, i + 1, product * i)


print(factorial(3))
# Like a stack
# return 6
# 3, 4, 2 * 3 = 6
# 3, 3, 1 * 2 = 2
# 3, 2, 1 * 1 = 1
#
