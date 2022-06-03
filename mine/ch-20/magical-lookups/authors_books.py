from functools import reduce


authors = [
    {"author_id": 1, "name": "Virginia Woolf"},
    {"author_id": 2, "name": "Leo Tolstoy"},
    {"author_id": 3, "name": "Dr. Seuss"},
    {"author_id": 4, "name": "J. K. Rowling"},
    {"author_id": 5, "name": "Mark Twain"}
]

books = [
    {"author_id": 3, "title": "Hop on Pop"},
    {"author_id": 1, "title": "Mrs. Dalloway"},
    {"author_id": 4, "title": "Harry Potter and the Sorcerer's Stone"},
    {"author_id": 1, "title": "To the Lighthouse"},
    {"author_id": 2, "title": "Anna Karenina"},
    {"author_id": 5, "title": "The Adventures of Tom Sawyer"},
    {"author_id": 3, "title": "The Cat in the Hat"},
    {"author_id": 2, "title": "War and Peace"},
    {"author_id": 3, "title": "Green Eggs and Ham"},
    {"author_id": 5, "title": "The Adventures of Huckleberry Finn"}
]


def compile_books_w_authors_solution_1(authors, books):
    """
    # O(N * M)
    # space O(N)
    """
    compilation = []
    for book in books:
        for author in authors:
            if author["author_id"] == book["author_id"]:
                compilation.append(
                    {"title": book["title"], "author": author["name"]})
                break

    return compilation


def compile_books_w_authors_solution_2(authors, books) -> list:
    """
    # O(N + M) => O(N)
    # space O(N + M)
    """
    def reduce_authors(table, author):
        table[author["author_id"]] = author["name"]
        return table

    authors = reduce(reduce_authors, authors, {})

    return list(map(lambda book: {"title": book["title"], "author": authors[book["author_id"]]}, books))


print("Sol 1")
authors_w_books_1 = compile_books_w_authors_solution_1(authors, books)
print(authors_w_books_1)

print("Sol 2")
authors_w_books_2 = compile_books_w_authors_solution_2(authors, books)
print(authors_w_books_2)

# def create_reducer(key_1, key_2):
#     def reducer(hash_table: dict, obj):
#         key = obj[key_1]
#         val = obj[key_2]

#         if hash_table.get(key):
#             cur_key = [hash_table[key]] if isinstance(
#                 hash_table[key], str) else hash_table[key]
#             hash_table[key] = [*cur_key, val]
#         else:
#             hash_table[key] = val

#         return hash_table

#     return reducer


# authors = reduce(create_reducer("name", "author_id"), authors, {})
# books = reduce(create_reducer("author_id", "title"), books, {})
# books = reduce(create_reducer("title", "author_id"), books, {})


# def compile_books()

# print(authors)
# print(books)
