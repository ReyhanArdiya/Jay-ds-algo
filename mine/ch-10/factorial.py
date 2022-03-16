def factorial(num):
    if num == 1:
        return 1
    else:
        return num * factorial(num - 1)

# Think like a stack
# 2 * fac 1 => return 2 * 1
# 3 * fac 2 => return 3 * 2
# 4 * fac 3 => return 4 * 6
# 5 * fac 4 => return 5 * 24


print(factorial(5))
