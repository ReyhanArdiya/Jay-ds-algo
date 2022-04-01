def fib_loop(n):
    res = 0 if n != 1 else 1

    prev_num_one = 0
    prev_num_two = 1

    for _i in range(n - 1):
        res = prev_num_one + prev_num_two
        prev_num_one = prev_num_two
        prev_num_two = res

    return res


print(fib_loop(0))  # 0
print(fib_loop(1))  # 1
print(fib_loop(2))  # 1
print(fib_loop(3))  # 2
print(fib_loop(4))  # 3
print(fib_loop(5))  # 5
print(fib_loop(6))  # 8
print(fib_loop(7))  # 13
print(fib_loop(8))  # 21
print(fib_loop(9))  # 34
print(fib_loop(10))  # 55
print(fib_loop(11))  # 89
