import Queue from "./queue.js";

class WeightedGraph {
    adjacenyList;
    constructor() {
      this.adjacenyList = {};
    }
  
    addVertex(vertex) {
        if (!this.adjacenyList[vertex]) {
            this.adjacenyList[vertex] = [];
        }
    }
  
    addEdge(vertex1, vertex2, weight) {
        this.adjacenyList[vertex1].push({ node: vertex2, weight: weight });
        this.adjacenyList[vertex2].push({ node: vertex1, weight: 1/weight });
    }

    // Prints the vertex and adjacency list
    printGraph() {
        const sources = Object.keys(this.adjacenyList);
        sources.forEach(key => {
            this.adjacenyList[key].forEach(child => {
                console.log(`${key} -- ${child.weight} --> ${child.node}`)
            }) 
        })
        
    }

    // function to performs BFS
    bfs(startingNode) {
    
        const visited = {};
    
        const q = new Queue();
    
        visited[startingNode] = {
            isVisited: true,
            distanceFromStart: 1
        }
        q.enqueue({
            node: startingNode,
            distanceFromStart: 1
        });
    
        while (!q.isEmpty()) {

            const getQueueElement = q.dequeue();
        
            const neighbours = this.adjacenyList[getQueueElement.node];
    
            neighbours.forEach(neighbour => {
                const neighbourNode =  neighbour.node;
                if (visited[neighbourNode]) {
                    return 
                }
                // console.log(`${getQueueElement.distanceFromStart}, ${neighbour.weight} ${neighbour.weight * getQueueElement.distanceFromStart}`)
                visited[neighbourNode] = {
                    isVisited: true,
                    distanceFromStart: neighbour.weight * getQueueElement.distanceFromStart
                }
                q.enqueue({
                    node: neighbourNode,
                    distanceFromStart: neighbour.weight * getQueueElement.distanceFromStart
                });
            })
        }
        return visited;
    }

    // Main DFS method
    dfs(startingNode) {
        const visited = { };
        this.DFSUtil(startingNode, visited);
    }
    
    // Recursive function which process and explore
    // all the adjacent vertex of the vertex with which it is called
    DFSUtil(vert, visited) {
        visited[vert] = true;
        console.log(vert);
        console.log(this.adjacenyList[vert])
        console.log(visited)
        this.adjacenyList[vert].forEach(neighbour => {
            const neighbourNode =  neighbour.node;
            console.log(`is ${neighbourNode} visited: ${visited[neighbourNode]}`)
            if (!visited[neighbourNode]) {
                this.DFSUtil(neighbourNode, visited);
            }
        })
    }
}
  

export default WeightedGraph