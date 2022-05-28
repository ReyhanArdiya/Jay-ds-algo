def make_uppercase(str_array: list[str]):
    return list(map(lambda string: string.upper(), str_array))


def mutate_uppercase(str_array: list[str]):
    for i in range(len(str_array)):
        str_array[i] = str_array[i].upper()


strings = ["tuvi", "leah", "shaya", "rami"]
print(make_uppercase(strings))

print(strings)

mutate_uppercase(strings)

print(strings)
