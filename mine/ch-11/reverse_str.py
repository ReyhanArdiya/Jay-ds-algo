def reverse_str(string: str):
    """
    From back to front
    """
    if len(string) == 1:
        return string[0]
    return string[-1] + reverse_str(string[:-1])


def reverse_strV2(string: str):
    """
    From front to back
    """
    if len(string) == 1:
        return string[0]
    return reverse_str(string[1:]) + string[0]


print(reverse_str("abcde"))
# STACK
# BASE: return "a" => "a"
# return "b" + rev("a") => "b" + "a" => "ba"
# return "c" + rev("ab") => "c" + "ba" => "cba"
# return "d" + rev("abc") => "d" + "cba" => "dcba"
# return "e" + rev("abcd") => "e" + "dcba" => "edcba"

print(reverse_strV2("abcde"))
