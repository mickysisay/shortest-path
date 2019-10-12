class Graph{
    constructor(){
        this.nodes=[];
        this.adjacenyList={};
    }
    addPlace(node){
        this.nodes.push(node);
        this.adjacenyList[node]=[];
    }
    addPath(node1,node2,weight){
        this.adjacenyList[node1].push({node:node2,weight:weight});
        this.adjacenyList[node2].push({node:node1,weight:weight});
    }
    findPathWithDijkstra(startNode, endNode) {
        let times = {};
        let backtrace = {};
        let pq = new PriorityQueue();
        times[startNode] = 0;
  
        this.nodes.forEach(node => {
            if (node !== startNode) {
            times[node] = Infinity
            }
        });
        pq.enqueue([startNode, 0]);
        while (!pq.isEmpty()) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];
            //console.log(pq.collection);
            this.adjacenyList[currentNode].forEach(
                neighbor => {
              let time = times[currentNode] + neighbor.weight;
              //console.log(times);
              //console.log(backtrace);
              
              if (time < times[neighbor.node]) {
                times[neighbor.node] = time;
                backtrace[neighbor.node] = currentNode;
                
                pq.enqueue([neighbor.node, time]);
              }
              //console.log(times);
            });
          }
          let path = [endNode];
          let lastStep = endNode;
          while(lastStep !== startNode) {
            path.unshift(backtrace[lastStep])
            lastStep = backtrace[lastStep]
          }
          return `Path is ${path} and time is ${times[endNode]}`;
    }
}
let map = new Graph();
map.addPlace("fullStack");
map.addPlace("starbucks");
map.addPlace("dig Inn");
map.addPlace("Dubliner");
map.addPlace("cafe grumpy");
map.addPlace("insomnia cookies");
map.addPath("fullStack","starbucks",6);
map.addPath("fullStack","dig Inn",7);
map.addPath("fullStack","Dubliner",2);
map.addPath("dig Inn","Dubliner",4);
map.addPath("starbucks","Dubliner",3);
map.addPath("starbucks","insomnia cookies",6);
map.addPath("Dubliner","insomnia cookies",7);
map.addPath("dig Inn","cafe grumpy",9);
map.addPath("insomnia cookies","cafe grumpy",6);

class PriorityQueue{
    constructor(){
        this.collection=[];
    }
    enqueue(element){
        
       console.log(element);
        if (this.isEmpty()){ 
          this.collection.push(element);
        } else {
          let added = false;
          for (let i = 1; i <= this.collection.length; i++){
            if (element[1] < this.collection[i-1][1]){ 
              this.collection.splice(i-1, 0, element);
              added = true;
              break;
            }
          }
          if (!added){
              this.collection.push(element);
          }
        }
        console.log(this.collection);
      };
      dequeue() {
        let value = this.collection.shift();
        return value;
      };
      isEmpty() {
        return (this.collection.length === 0) 
      };
    }

          
    console.log(map.findPathWithDijkstra("fullStack","cafe grumpy"));
