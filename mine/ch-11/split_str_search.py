from math import ceil


def halve_str(string: str):
    splitted_str = string.split(" ")
    if len(splitted_str) > 1:
        half = ceil(len(splitted_str) / 2)

        return [" ".join(splitted_str[:half]), " ".join(splitted_str[half:])]

    return [string]


def halve_str_arr(str_arr: list):
    halved_str_arr = [halve_str(string) for string in str_arr]

    flatten = []
    for arr in halved_str_arr:
        if isinstance(arr, list):
            for string in arr:
                flatten.append(string)

    is_changed = False
    i = 0
    for changed_string in flatten:
        if changed_string != str_arr[i]:
            is_changed = True
            break
        i += 1

    return flatten if is_changed else False


def split_str_search(string: str, q: str):
    seperated_str = string if isinstance(string, list) else string.split(" ")

    if len(seperated_str) == 0:
        return 0

    match_count = 0
    halved_q = [q]
    while halved_q:
        for query in halved_q:
            if query.lower() in seperated_str[0].lower():
                match_count += 1

        halved_q = halve_str_arr(halved_q)

    # Return the current match_count PLUS the match count of seperated_str except for the first item
    return match_count + split_str_search(seperated_str[1:], q)


print(split_str_search("The hours beach house bloom",
      "Beach The Bloom Hours House"))  # 8
print(split_str_search("The golden hours of Carcosa",
      "Beach The Bloom Hours House"))  # 3
print(split_str_search("The hours the", "the")) # 2

