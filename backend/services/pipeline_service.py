from collections import defaultdict, deque
from typing import List, Dict

class PipelineService:
    @staticmethod
    def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
        """
        Calculates if the given graph is a Directed Acyclic Graph (DAG) 
        using Kahn's Algorithm (Topological Sort).
        Complexity: O(V + E)
        """
        node_ids = {n["id"] for n in nodes}
        adj = defaultdict(list)
        in_degree = defaultdict(int)

        # Initialize in-degrees
        for nid in node_ids:
            in_degree[nid] = 0

        # Build adjacency list and in-degree map
        for edge in edges:
            src = edge.get("source")
            tgt = edge.get("target")
            if src in node_ids and tgt in node_ids:
                adj[src].append(tgt)
                in_degree[tgt] += 1

        # Queue of nodes with no incoming edges
        queue = deque([n for n in node_ids if in_degree[n] == 0])
        visited_count = 0

        while queue:
            node = queue.popleft()
            visited_count += 1
            for neighbor in adj[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        # If visited all nodes, it's a DAG
        return visited_count == len(node_ids)
