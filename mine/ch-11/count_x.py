def count_x(string: str, counter=0):
    if counter > len(string):
        return counter
    return count_x(string[1:], counter + 1 if string[0].lower() == "x" else counter)


def count_xV2(string: str):
    is_x = 1 if string[0].lower() == "x" else 0
    if len(string) > 1:
        return is_x + count_xV2(string[1:])
    return is_x


print(count_xV2("axbxcxdx"))


def find_x(string: str):
    return 1 + find_x(string[1:]) if string[0].lower() != "x" else 0


print(find_x("ax"))
