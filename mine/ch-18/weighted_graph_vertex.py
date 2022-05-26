

class WeightedGraphVertex:
    def __init__(self, value) -> None:
        self.value = value
        self.adjacent_vertices = {}
        self.__shortest_paths_table = {}
        self.__shortest_previous_stopover_vertex_table = {}

    def add_adjacent_vertices(self, vertex, weight):
        self.adjacent_vertices[vertex] = weight

    # CMT I made this by myself but ofc I probably forgot how it works :D
    def search_shortest_paths(self, vertex=None, visited=None):
        """
            This uses dijkstra's algorithm
        """
        visited = visited or {}
        current_vertex = vertex or self
        next_vertex = None

        if visited.get(current_vertex):
            return

        if current_vertex == self:
            self.__shortest_paths_table[current_vertex] = 0

        visited[current_vertex] = True

        for [adj_vertex, weight] in current_vertex.adjacent_vertices.items():
            old_weight_to_adj = self.__shortest_paths_table.get(adj_vertex)
            weight_from_start_to_current = self.__shortest_paths_table.get(
                current_vertex)
            new_weight_to_adj = weight if weight_from_start_to_current is None else weight + \
                weight_from_start_to_current

            if not old_weight_to_adj or new_weight_to_adj < old_weight_to_adj:
                self.__shortest_paths_table[adj_vertex] = new_weight_to_adj
                self.__shortest_previous_stopover_vertex_table[adj_vertex] = current_vertex

            if (next_vertex is None) or (adj_vertex not in visited and self.__shortest_paths_table.get(adj_vertex) < self.__shortest_paths_table.get(next_vertex)):
                next_vertex = adj_vertex

        self.search_shortest_paths(next_vertex, visited)

    def find_shortest_path_to(self, vertex, paths=None, total=None, initial=True):
        if initial:
            self.search_shortest_paths()

        paths = paths or []
        total = total or self.__shortest_paths_table.get(vertex)

        paths.append(vertex)

        if vertex == self:
            paths.reverse()
            return {"paths": paths, "total": total}

        prev_vertex = self.__shortest_previous_stopover_vertex_table[vertex]

        return self.find_shortest_path_to(
            vertex=prev_vertex,
            paths=paths,
            total=total,
            initial=False
        )


class City(WeightedGraphVertex):
    def __repr__(self):
        return self.value

    def search_cheapest_prices(self):
        return self.search_shortest_paths()

    def find_cheapest_path_to(self, vertex):
        return self.find_shortest_path_to(vertex)


atlanta = City("atlanta")
boston = City("boston")
chicago = City("chicago")
denver = City("denver")
el_paso = City("el paso")

atlanta.add_adjacent_vertices(boston, 100)
atlanta.add_adjacent_vertices(denver, 160)

boston.add_adjacent_vertices(chicago, 120)
boston.add_adjacent_vertices(denver, 180)

chicago.add_adjacent_vertices(el_paso, 80)

denver.add_adjacent_vertices(chicago, 40)
denver.add_adjacent_vertices(el_paso, 140)


print(atlanta.find_shortest_path_to(atlanta))
print(atlanta.find_shortest_path_to(boston))
print(atlanta.find_shortest_path_to(chicago))
print(atlanta.find_shortest_path_to(denver))
print(atlanta.find_shortest_path_to(el_paso))

# CMT We cant find atlanta because my implementation never visit atlanta in the first place
# to be able to visit it, we need to iterate over EVERY adjacent vertices.
# # But that would render step no. 4 kinda useless right? Gotta see jay's answer for this
# florida = City("florida")
# el_paso.add_adjacent_vertices(florida, 300)
# florida.add_adjacent_vertices(atlanta, 700)
# print(el_paso.find_cheapest_path_to(atlanta))
