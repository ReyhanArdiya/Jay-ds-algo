import math


def stock_positive_trend_v1(stocks: list[int]):
    """
    time O(N * M)
    space O(+- N)
     """
    stop = len(stocks)
    for i in range(stop - 2):
        stock_collection = [stocks[i]]

        for j in range(i + 1, stop):
            if stocks[j] > stock_collection[-1]:
                stock_collection.append(stocks[j])

        if len(stock_collection) >= 3:
            return True

    return False


def stock_positive_trend_linear(stocks: list[int]):
    lowest_price = stocks[0]
    middle_price = float("inf")

    for stock in stocks:
        if stock < lowest_price:
            lowest_price = stock
        elif stock > lowest_price and stock < middle_price:
            middle_price = stock
        elif stock > middle_price:
            return True

    return False


stocks_1 = [22, 25, 21, 18, 19.6, 17, 16, 20.5]
stocks_2 = [50, 51.25, 48.4, 49, 47.2, 48, 46.9]

print(stock_positive_trend_linear(stocks_1))
print(stock_positive_trend_linear(stocks_2))
