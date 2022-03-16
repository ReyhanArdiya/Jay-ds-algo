def countdown(num):
    print(num)
    if num:
        countdown(num - 1)


countdown(10)
