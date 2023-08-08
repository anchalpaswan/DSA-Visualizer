function setup() {
    createCanvas(windowWidth, windowHeight);
    console.log(windowWidth,windowHeight);
    //background(220);
    background(backgroundColor);
    smooth();
    //makeStack();
    makeQueue();
  }
  
function draw() {
    
}

function drawGraph()
{
    for(let i=0;i<graph.length;i++)
    {
        for(let j=0;j<graph[i].adj.length;j++)
        {
            let k = graph[i].adj[j];
            strokeWeight(3);
            //console.log("Is it made 1",i,k,coloredEdge[i][k]);
            if(coloredEdge[i][k] == 1)
            {
                //console.log("Here");
                stroke(lineChangeColor);
            }
            else
            {
                //stroke('black');
                stroke(lineColor);
                //console.log("Color Here");
                //stroke('#a3a3a3');
            }
            smooth();
            line(graph[i].x,graph[i].y,graph[k].x,graph[k].y);
        }     
    }

    strokeWeight(1);
    for(let i=0;i<graph.length;i++)
    {
        smooth();
        graph[i].create();
    }
}

function makeQueue()
{
    //fill('white');
    fill(nodeFillColor);
    rectMode(RADIUS);
    rect(windowWidth/2,660,500,38);  
    //fill('black'); 
    fill(textColor);
    //strokeWeight(3);
    console.log(windowWidth/2);
    textSize(20);
    textAlign(CENTER,CENTER);
    text('QUEUE',(windowWidth/2),715);

    let tempXPos = queueXPos;
    for(let i=0;i<queue.length;i++)
    {
        let temp = new node(tempXPos,queueYPos,queue[i]);
        temp.create();
        tempXPos += 63;
    }
}

function node(x, y, value)
{
    this.x = x;
    this.y = y;
    this.s = 60;
    this.value = value;
    this.color = nodeFillColor;
    this.adj = [];
    //console.log(x,y,this.s);
    this.create = function()
    {
        //console.log(x,y,s);
        //stroke('black');
        stroke(nodeStrokeColor);
        fill(this.color);
        circle(this.x,this.y,this.s);
        //fill("black");
        fill(textColor);
        textSize(32);
        textAlign(CENTER,CENTER);
        text(this.value,this.x,this.y);
    }
    //this.create();
}

function mousePressed()
{
    if(addNewNode === false)return;

    if((mouseX < 30) || (mouseY < 30))return;
    graph.push(new node(mouseX,mouseY,nodeCount))
    graph[nodeCount].create();
    //addNewNode = false;
    nodeCount++;
}