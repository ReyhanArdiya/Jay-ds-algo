def check_palindrome(string: str):
    return string == "".join(string.split().reverse())


# print(check_palindrome("racecar"))
