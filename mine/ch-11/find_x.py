def find_x(string):
    """
    A function that accepts a string and returns the
    first index that contains the character “x”
    """
    # More readable ver.
    # if string[0].lower() == "x":
    #     return 0

    # if len(string) > 1:
    #     return 1 + find_x(string[1:])

    # More concise ver.
    return 0 if string[0].lower() == "x" else (1 + find_x(string[1:])) if len(string) > 1 else 0


print(find_x("adcdefghijklmnopqrstuvwxyz"))
print("abcdefghijklmnopqrstuvwxyz"[23])
