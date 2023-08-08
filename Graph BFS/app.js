//const inputNode = document.getElementById("input-node");
const addNodeBtn = document.getElementById("add-node-button");
const bfsBtn = document.getElementById("bfs-button");
const addEdgeBtn = document.getElementById("add-edge-button");
const firstNode = document.getElementById("first-node");
const secondNode = document.getElementById("second-node");
const startnode = document.getElementById("start-node");

let graph = [];
//let stack = [];
let queue = [];
let coloredEdge;
let nodeCount = 0;
let addNewNode = false;
let visited;
let queueXPos = 300;
let queueYPos = 660;
let backgroundColor = '#dcdcdc';
let lineColor = '#000000';
let lineChangeColor = '#FF0000';
let textColor = '#000000';
let nodeFillColor = '#FFFFFF';
let nodeStrokeColor = '#000000';
//---------------------------------------------CONSTANTS-----------------------------------------------------------

//---------------------------------------------ADD ELEMENT-------------------------------------------------------------------

function addNode()
{
    
    if(addNodeBtn.textContent == "Add Nodes")
    {
        addNewNode = true;
        addNodeBtn.textContent = "Stop Adding";
    }
    else
    {
        addNewNode = false;
        addNodeBtn.textContent = "Add Nodes";
    }
}

function addEdge()
{
    let firstNodeVal = +firstNode.value;
    let secondNodeVal = +secondNode.value;

    if((firstNodeVal >= nodeCount) || (secondNodeVal >= nodeCount)
    || (firstNodeVal < 0) || (secondNodeVal < 0))
    {
        alert("The entered node does not exist. Please enter valid node (andha hai kya?)");
        return;
    }
    if(graph[firstNodeVal].adj.includes(secondNodeVal))
    {
        return;
    }
    if(firstNodeVal === secondNodeVal)return;

    
    let n = graph.length;
    coloredEdge = new Array(n);
    for(let i=0;i<n;i++)
        coloredEdge[i] = new Array(n).fill(0);

    graph[firstNodeVal].adj.push(secondNodeVal);
    graph[secondNodeVal].adj.push(firstNodeVal);

    drawGraph();
}
//------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------DFS----------------------------------------------------------------------------

function initiateBfs()
{
    let startNode = +startnode.value;
    if((startNode >= nodeCount) || (startNode < 0))
    {
        alert("The enterd node does not exist.")
        return;
    }
    let n = graph.length;
    visited = new Array(n);
    for(let i=0;i<n;i++)visited[i] = 0;
    
    //Initialize the colored edge array here
    coloredEdge = new Array(n);
    for(let i=0;i<n;i++)
        coloredEdge[i] = new Array(n).fill(0);
    // graph[startNode].color = '#FFFFFF';
    // drawGraph();
    bfs(startNode);

    
}

async function bfs(nod)
{
    //let queue = [];
    //queue.push(nod);
    insertQueue(nod);
    graph[nod].color = '#FFFF00';
    drawGraph();
    console.log(nod,graph[nod].color);
    await sleep(500);
    graph[nod].color = '#FFFF00';//FIX THIS problem later
    while(queue.length != 0)
    {
        //let node = queue.shift();
        let node = removeQueue();
        visited[node] = 1;
        
        for(let i=0;i<graph[node].adj.length;i++)
        {
            let newNode = graph[node].adj[i];
            if(visited[newNode] === 0)
            {
                coloredEdge[node][newNode] = 1;
                coloredEdge[newNode][node] = 1;
                drawGraph();
                await sleep(500);
                graph[newNode].color = '#FFFF00';
                drawGraph();
                insertQueue(newNode);
                await sleep(500);
                //queue.push(newNode);
                
            }
        }
    }

    for(let i=0;i<graph.length;i++)
    {
        graph[i].color = '#FFFFFF';
        for(let j=0;j<graph.length;j++)
        {
            coloredEdge[i][j] = 0;
        }
    }
    drawGraph();
}

function insertQueue(value)
{
    queue.push(value);
    makeQueue();
}

function removeQueue()
{
    let value = queue.shift();
    makeQueue();
    return value;
}

async function sleep(ms) 
{
    await new Promise((resolve) => 
    {
        setTimeout(resolve, ms);
    });
}

//------------------------------------------------------------------------------------------------------------------------------

//----------------------------EVENT LISTNERS----------------------------------------------------------------------------------
addNodeBtn.addEventListener('click',addNode);
addEdgeBtn.addEventListener('click',addEdge);
bfsBtn.addEventListener('click',initiateBfs);