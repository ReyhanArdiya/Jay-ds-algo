def print_nested_arrs(nestedArrs):
    for val in nestedArrs:
        if isinstance(val, list):
            print_nested_arrs(val)
        else:
            print(val)


print_nested_arrs([1,
                   2,
                   3,
                   [4, 5, 6],
                   7,
                   [8,
                    [9, 10, 11,
                     [12, 13, 14]
                     ]
                    ],
                   [15, 16, 17, 18, 19,
                       [20, 21, 22,
                        [23, 24, 25,
                         [26, 27, 29]
                         ], 30, 31
                        ], 32
                    ], 33
                   ]
                  )
