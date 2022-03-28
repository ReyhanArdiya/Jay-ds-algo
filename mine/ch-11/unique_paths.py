def unique_paths(rows, cols):
    return unique_paths(rows - 1, cols) + unique_paths(rows, cols - 1) if rows > 1 and cols > 1 else 1


print(unique_paths(3, 7))
