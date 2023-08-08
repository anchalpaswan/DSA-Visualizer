const inputNumber = document.getElementById("input-element");
const addBtn = document.getElementById("add-button");
const sortBtn = document.getElementById("sort-button");

let arr = [];
let elementWidth = 50;
let elementAdded = false;
let elementColor = '#8D72E1';
let highlightElementColor = '#FFFF00';
let planeYCoorinate = 400;
let planeXStartCoorinate = 40;
let planeXEndCoorinate = 1440;
//---------------------------------------------CONSTANTS-----------------------------------------------------------

//---------------------------------------------ADD ELEMENT-------------------------------------------------------------------

function addElement()
{
    if(elementAdded === true)
    {
        arr = [];
        drawObj();
    }
    let number = inputNumber.value;
    let numbers = [];
    numbers = number.split(" ");//Fix the problem it gives when an empty space is given at the end of array
    numbers = numbers.map(function(value) {
        return +value;
    });
    initiateArray(numbers);
}

function initiateArray(numbers)
{
    let maxElement = numbers.reduce((a, b) => Math.max(a, b), - Infinity);
    let heightUnit = (340/maxElement);
    let x = planeXStartCoorinate, y = planeYCoorinate;
    x += 1400/2 - (numbers.length / 2) * elementWidth;

    for(let i=0;i<numbers.length;i++)
    {
        const element = {
            value : numbers[i],
            height : -(heightUnit*numbers[i]),
            width : elementWidth,
            posX : x,
            posY : y,
            //color : '#8D72E1'
            color : elementColor
        }
        arr.push(element);
        
        x = x + elementWidth;
    }
    elementAdded = true;

    line(planeXStartCoorinate,planeYCoorinate,planeXEndCoorinate,planeYCoorinate);
    //line(40,700,1440,700);
    //x y w h radius
    for(let i=0;i<arr.length;i++)
    {
        fill(arr[i].color);
        rect(arr[i].posX,arr[i].posY,arr[i].width,arr[i].height,8);//This rect takes the position of upper left corner
    }

    console.log(JSON.stringify(arr));
}



//--------------------------------------------------------------------------------------------------------------



//------------------------------------------------MOVEMENT---------------------------------------------------------------------
async function animateObjects(aray,targetX,targetY,speed,i) 
{
    speed = 0.15;
    if(i>=aray.length)return;
    await moveRectToPosition(targetX,targetY,speed,i,aray,1000);
    aray[i].posX = targetX;
    aray[i].posY = targetY;
    await animateObjects(aray,targetX+elementWidth,targetY,speed,i+1);
}

async function swap(aray,xp, yp)
{
    let speed = 0.15;
    let targetY = aray[xp].posY;
    let temp1 = arr[xp].posX;
    let temp2 = arr[yp].posX;

    await Promise.all([moveRectToPosition(temp2,targetY,speed,xp,aray,1000)
    ,moveRectToPosition(temp1,targetY,speed,yp,aray,1000)])
    .then(()=>{
    let temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
    }); 
}    
//-----------------------------------------------------------------------------------------------------------------------



//-------------------------------------------------SORTING-------------------------------------------------------------
function sortt()
{
    if(elementAdded === false)
    {
        alert("Please enter the element first 😊")
    }
    
    selectionSort(arr,arr.length);
}
 
async function selectionSort(aray,  n)
{
    let i, j, min_idx;
 
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        aray[i].color = highlightElementColor;
        drawObj();
        min_idx = i;
        for (j = i + 1; j < n; j++)
        {   
            aray[j].color = highlightElementColor;
            drawObj();
            await sleep(600);
            if (aray[j].value < aray[min_idx].value)
            {
                min_idx = j;
            }
            aray[j].color = elementColor;
            drawObj();
        }
        await swap(aray,min_idx, i);
        aray[min_idx].color = elementColor;
        drawObj();
        // Swap the found minimum element with the first element
    }
}

function sleep(ms) 
{
    return new Promise((resolve) => 
    {
        setTimeout(resolve, ms);
    });
}

//----------------------------EVENT LISTNERS----------------------------------------------------------------------------------
console.log(addBtn);
console.log(sortBtn);
addBtn.addEventListener('click',addElement);
sortBtn.addEventListener('click',sortt);