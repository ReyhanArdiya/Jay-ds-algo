from weighted_graph_vertex import WeightedGraphVertex, atlanta, boston, chicago, denver, el_paso


def dijsktra_shortest_path(current_vertex: WeightedGraphVertex, final_vertex: WeightedGraphVertex):
    shortest_paths_table = {}
    shortest_previous_stopover_vertex_table = {}

    visited = {}

    shortest_paths_table[current_vertex] = 0

    while current_vertex:
        visited[current_vertex] = True
        next_vertex = None

        for [adj_vertex, weight] in current_vertex.adjacent_vertices.items():
            old_weight_to_adj = shortest_paths_table.get(adj_vertex)
            weight_from_start_to_current = shortest_paths_table.get(
                current_vertex)
            new_weight_to_adj = weight if weight_from_start_to_current is None else weight + \
                weight_from_start_to_current

            if not old_weight_to_adj or new_weight_to_adj < old_weight_to_adj:
                shortest_paths_table[adj_vertex] = new_weight_to_adj
                shortest_previous_stopover_vertex_table[adj_vertex] = current_vertex

            if (next_vertex is None) or (adj_vertex not in visited and shortest_paths_table.get(adj_vertex) < shortest_paths_table.get(next_vertex)):
                next_vertex = adj_vertex

        current_vertex = next_vertex

    paths = [final_vertex]

    prev_vertex = shortest_previous_stopover_vertex_table.get(final_vertex)

    while prev_vertex:
        paths.append(prev_vertex)
        prev_vertex = shortest_previous_stopover_vertex_table.get(prev_vertex)

    paths.reverse()

    return {"paths": paths, "total": shortest_paths_table.get(final_vertex)}


print("Own Function Version - They both work :D")
print(dijsktra_shortest_path(atlanta, atlanta))
print(dijsktra_shortest_path(atlanta, boston))
print(dijsktra_shortest_path(atlanta, chicago))
print(dijsktra_shortest_path(atlanta, denver))
print(dijsktra_shortest_path(atlanta, el_paso))
