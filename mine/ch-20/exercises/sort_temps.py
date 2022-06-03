def sort_temps(temps: list[int]):
    temps_table = {}

    for temp in temps:
        if temps_table.get(temp):
            temps_table[temp] += 1
        else:
            temps_table[temp] = 1

    sorted_temps = []

    index = 970
    while index <= 990:
        if temps_table.get(index/10):
            sorted_temps.extend([index/10 for temp in range(temps_table[index/10])])

        index += 1

    return sorted_temps


temps = [98.6, 98.0, 97.1, 99.0, 98.9, 97.8, 98.5, 98.2, 98.0, 97.1]
print(sort_temps(temps))
