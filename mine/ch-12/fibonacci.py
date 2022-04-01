def fib(n):
    # print("Fib 2n")
    # The base cases are the first two numbers in the series:
    if n == 0 or n == 1:
        return n
    # Return the sum of the previous two Fibonacci numbers:
    return fib(n - 2) + fib(n - 1)


# print(fib(4))
# print(fib(5))
# print(fib(6))


def fib_memo(n, _memo={}):
    print("Fib Memo")
    if n == 0 or n == 1:
        return n

    # Check the hash table (called memo) to see whether fib(n)
    # was already computed or not:
    if n not in _memo:
        # If n is NOT in memo, compute fib(n) with recursion
        # and then store the result in the hash table:
        _memo[n] = fib_memo(n - 1, _memo) + fib_memo(n - 2, _memo)

    # By now, fib(n)'s result is certainly in memo. (Perhaps
    # it was there before, or perhaps we just stored it there
    # in the previous line of code. But it's certainly there now.)
    # So let's return it:
    return _memo[n]


# print(fib(2))
# print(fib(100))
# print(fib_memo(2))
print(fib_memo(100))
