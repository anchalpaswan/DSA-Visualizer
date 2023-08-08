function setup() {
    createCanvas(windowWidth, windowHeight);
    console.log(windowWidth,windowHeight);
    background(220);
    smooth();
    makeStack();
  }
  
function draw() {
    
}

function drawGraph()
{
    // background(220);
    // strokeWeight(3);
    // line(graph[firstNode].x, graph[firstNode].y
    //     ,graph[secondNode].x, graph[secondNode].y);
    // strokeWeight(1);
    // graph[firstNode].create();
    // graph[secondNode].create();
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
                stroke('red');
            }
            else
                stroke('black');
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

//Fix the use case for opera by drawing the stack based on the width and heigth of screen and subtracting appropriate pixels from it
function makeStack()
{
    //rect(1450,0,80,720,10); 
    //Add a stack text here  
    fill('white');
    rect(1430,660,80,-730,10);  
    fill('black'); 
    //strokeWeight(3);
    textSize(20);
    textAlign(CENTER,CENTER);
    text('Stack',1470,675);

    for(let i=0;i<stack.length;i++)
    {
        stack[i].create();
    }
    // rect(0,0,50,50);
    // rect(30, 20, 55, 55, 20);
}

function node(x, y, value)
{
    this.x = x;
    this.y = y;
    this.s = 60;
    this.value = value;
    this.color = '#FFFFFF';
    this.adj = [];
    //console.log(x,y,this.s);
    this.create = function()
    {
        //console.log(x,y,s);
        stroke('black');
        fill(this.color);
        circle(this.x,this.y,this.s);
        fill("black");
        textSize(32);
        textAlign(CENTER,CENTER);
        text(this.value,this.x,this.y);
    }
    //this.create();
}

function mousePressed()
{
    if(addNewNode === false)return;
    // circle(mouseX,mouseY,60);
    // textSize(32);
    // textAlign(CENTER,CENTER);
    // text(nodeCount,mouseX,mouseY);
    //console.log(mouseX,mouseY);
    if((mouseX < 30) || (mouseY < 30))return;
    graph.push(new node(mouseX,mouseY,nodeCount))
    graph[nodeCount].create();
    //addNewNode = false;
    nodeCount++;
    //insertStack(nodeCount-1);
}