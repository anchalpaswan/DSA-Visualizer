function setup() {
    createCanvas(windowWidth, windowHeight);
    console.log(windowWidth,windowHeight);
    background(220);
    smooth();
    //makeStack();
    //makeQueue();
    drawArray();
    updateTopBox();
    realStack();
  }
  
function draw() {
    
}

function drawArray()
{
    //let arraySize = 30;
    let rectStartPosX = 20; 
    let rectStartPosY = 200; 
    for(let i=0;i<10;i++)
    {
        //rect(rectStartPosX,rectStartPosY,50,50);
        arr.push(new arrElement(i,null,rectStartPosX,rectStartPosY));
        arr[i].create();
        rectStartPosX += 50;
    }
    rectStartPosY += 100;
    rectStartPosX = 20;
    for(let i=10;i<20;i++)
    {
        //rect(rectStartPosX,rectStartPosY,50,50);
        arr.push(new arrElement(i,null,rectStartPosX,rectStartPosY));
        arr[i].create();
        rectStartPosX += 50;
    }
}

function updateTopBox()
{
    stroke('black');
    textAlign(CENTER,CENTER);
    text('Top',20,125);
    stroke('black');
    rect(60,100,50,50);
    stroke('black');
    textAlign(CENTER,CENTER);
    text(topp,85,125);

    realStack();
}

function arrElement(index,value,x,y)
{
    this.index = index;
    this.value = value;
    this.x = x;
    this.y = y;
    this.borderColor = "#000000";
    
    this.create = function()
    {
        console.log("Called");
        stroke(this.borderColor);
        rect(this.x,this.y,50,50);
        stroke('black');
        textAlign(CENTER,CENTER);
        text(this.index,this.x+25,this.y+65);
        if(this.value !== null)
        {
            stroke('black');
            textAlign(CENTER,CENTER);
            text(this.value,this.x+25,this.y+25);
            console.log("Done");
        }
    }
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

function realStack()
{
    // textAlign(CENTER,CENTER);
    // text("Stack",682,525)
    rect(650,50,65,600,8);
    let startXPos = 682, startYPos = 625;
    for(let i = 0; i<arr.length; i++)
    {
        if(arr[i].value === null)break;
        circle(startXPos,startYPos,40);
        textAlign(CENTER,CENTER);
        text(arr[i].value,startXPos,startYPos);
        startYPos -= 41;
    }
}