//const inputNode = document.getElementById("input-node");
const addNodeBtn = document.getElementById("add-node-button");
const dfsBtn = document.getElementById("dfs-button");
const addEdgeBtn = document.getElementById("add-edge-button");
const firstNode = document.getElementById("first-node");
const secondNode = document.getElementById("second-node");
const startnode = document.getElementById("start-node");

let graph = [];
let stack = [];
let coloredEdge;
let nodeCount = 0;
let addNewNode = false;
let visited;
let stackXPos = 1470;
let stackYPos = 628;
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
    
    // insertStack()   
}

function addEdge()
{
    let firstNodeVal = +firstNode.value;
    let secondNodeVal = +secondNode.value;
    //console.log(firstNodeVal,secondNodeVal);
    //console.log("Node count = ",nodeCount);
    if((firstNodeVal >= nodeCount) || (secondNodeVal >= nodeCount)
    || (firstNodeVal < 0) || (secondNodeVal < 0))
    {
        alert("The entered node does not exist. Please enter valid node (andha hai kya?)");
        return;
    }
    if(firstNodeVal === secondNodeVal)return;

    let n = graph.length;
    coloredEdge = new Array(n);
    for(let i=0;i<n;i++)
        coloredEdge[i] = new Array(n).fill(0);
    //console.log(typeof(graph[firstNodeVal].adj),typeof(graph[secondNodeVal].adj))
    graph[firstNodeVal].adj.push(secondNodeVal);
    graph[secondNodeVal].adj.push(firstNodeVal);
    //drawEdge(firstNodeVal,secondNodeVal);
    drawGraph();
}
//------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------DFS----------------------------------------------------------------------------

function initiateDfs()
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
    //insertStack(startNode);
    dfs(startNode);
    //removeStack();
    //console.log(coloredEdge);
    // for(let i=0;i<n;i++)
    // {
    //     for(let j = 0; j < graph[i].adj.length; j++)
    //     {
    //         coloredEdge[i][j] = 0;
    //     }
    // }
    //console.log(startNode);
}

// async function dfs(node)
// {
//     await sleep(500);
//     visited[node] = 1;
//     graph[node].color = '#FFFF00';
//     console.log(node);
//     drawGraph();
//     for(let i = 0; i < graph[node].adj.length; i++)
//     {
        
//         await sleep(500);
//         let newNode = graph[node].adj[i];
//         if(visited[newNode] === 0)
//         {
//             coloredEdge[node][newNode] = 1;
//             coloredEdge[newNode][node] = 1;
//             console.log("Made 1 ",node,newNode,coloredEdge[node][newNode],coloredEdge[newNode][node]);
//             graph[node].color = '#FFFF00';
//             drawGraph();
//             await dfs(newNode);
//             graph[node].color = '#FFFFFF';
//             coloredEdge[node][newNode] = 0;
//             coloredEdge[newNode][node] = 0;
//             drawGraph();
//         }
//     }
// }

async function dfs(node)
{
    
    visited[node] = 1;
    graph[node].color = '#FFFF00';
    drawGraph();
    insertStack(node);
    await sleep(500);
    //console.log(node);
    
    for(let i = 0; i < graph[node].adj.length; i++)
    {
        
        await sleep(500);
        let newNode = graph[node].adj[i];
        if(visited[newNode] === 0)
        {
            coloredEdge[node][newNode] = 1;
            coloredEdge[newNode][node] = 1;
            drawGraph();
            await sleep(500);
            //console.log("Made 1 ",node,newNode,coloredEdge[node][newNode],coloredEdge[newNode][node]);
            //graph[node].color = '#FFFF00';
            //insertStack(newNode);
            await dfs(newNode);
            //graph[node].color = '#FFFFFF';
            coloredEdge[node][newNode] = 0;
            coloredEdge[newNode][node] = 0;
            drawGraph();
            //removeStack();
            await sleep(500);
        }
    }

    graph[node].color = '#FFFFFF';
    drawGraph();
    removeStack();
    await sleep(500);
}

// function sleep(ms) 
// {
//     return new Promise((resolve) => 
//     {
//         setTimeout(resolve, ms);
//     });
// }

function insertStack(value)
{
    stack.push(new node(stackXPos, stackYPos, value));
    makeStack();
    //stackXPos += 60;
    stackYPos -= 63;
}

function removeStack()
{
    //stack.push(new node(stackXPos, stackYPos, value));
    stack.pop();
    makeStack();
    //stackXPos += 60;
    stackYPos += 63;
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
//console.log(addNodeBtn);
//console.log(addEdgeBtn);
//console.log(dfsBtn);
addNodeBtn.addEventListener('click',addNode);
addEdgeBtn.addEventListener('click',addEdge);
dfsBtn.addEventListener('click',initiateDfs);