def staircase(n):
    if n < 0:
        return 0
    if n == 1 or n == 0:
        return 1
    return staircase(n - 1) + staircase(n - 2) + staircase(n - 3)


print(staircase(3))
# return sc(2) + sc(1) + sc(0)
# sc(2):
# return 1 + 1 + 0
# return sc(1) + sc(0) + sc(-1) => 2
# return 2 + 1 + 1 => 4
