def double_arr(arr, i=0):
    if i < len(arr):
        arr[i] *= 2
        double_arr(arr, i + 1)
    else:
        return arr


array = [1, 2, 3, 4]
double_arr(array, 0)
print(array)
