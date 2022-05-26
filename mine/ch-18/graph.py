"""
Personal graph materials
"""

friends = {
    "Alice": ["Bob", "Diana", "Fred"],
    "Bob": ["Alice", "Cynthia", "Diana"],
    "Cynthia": ["Bob"],
    "Diana": ["Alice", "Bob", "Fred"],
    "Elise": ["Fred"],
    "Fred": ["Alice", "Diana", "Elise"]
}

non_mutual = {
    "Alice": ["Cynthia", "Bob"],
    "Bob": ["Cytnhia"],
    "Cynthia": ["Bob"],
}


class Vertex:
    def __init__(self, value) -> None:
        self.value = value
        self.adjacent_vertices = []

    def add_adjacent_vertex(self, vertex):
        """
        docstring
        """
        # Prevent dups
        if vertex in self.adjacent_vertices:
            return

        self.adjacent_vertices.append(vertex)

        # Mutualize
        vertex.add_adjacent_vertex(self)

    def add_adjacent_vertices(self, *vertices):
        """
        docstring
        """
        self.adjacent_vertices.extend(vertices)


alice = Vertex("alice")
bob = Vertex("bob")
cynthia = Vertex("cynthia")

# alice.add_adjacent_vertices(bob, cynthia)
# bob.add_adjacent_vertex(cynthia)
# cynthia.add_adjacent_vertex(bob)

alice.add_adjacent_vertex(bob)
alice.add_adjacent_vertex(bob)

print(alice.adjacent_vertices)
print(bob.adjacent_vertices)

obj = {}
obj_2 = {
    obj : True
}

print(obj_2[obj])