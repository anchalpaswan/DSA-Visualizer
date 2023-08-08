const inputNumber = document.getElementById("input-element");
const addBtn = document.getElementById("add-button");
const sortBtn = document.getElementById("sort-button");

let arr = [];
let elementWidth = 50;
let elementAdded = false;
let elementColor = '#8D72E1';
let highlightElementColor = '#FFFF00';
let planeYCoorinate = 350;
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
    //let x = 40, y=350;
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
        //drawRoundedRect(arr[i].posX,arr[i].posY,arr[i].width,arr[i].height,8,arr[i].color);
        
        x = x + elementWidth;
    }
    elementAdded = true;

    line(40,350,1440,350);
    line(40,700,1440,700);
    //x y w h radius
    for(let i=0;i<arr.length;i++)
    {
        fill(arr[i].color);
        rect(arr[i].posX,arr[i].posY,arr[i].width,arr[i].height,8);//This rect takes the position of upper left corner
    }
    //moveRectToPosition(200, 200, 0.09, 0);
    //console.log(arr);
    //  arr[0].posX = 200;
    //  arr[0].posY = 200; 
    // moveRectToPosition(250, 200, 0.01, 1);
    //moveBlock(200,200,0.09,0,1);
    //console.log(JSON.stringify(arr));
}



//--------------------------------------------------------------------------------------------------------------



//------------------------------------------------MOVEMENT---------------------------------------------------------------------
async function moveBlock(targetX,targetY,speed,aray)
{
    //console.log("Here");
    
    //This is a temporary fix. Find a better solution later (Although knowing myself I wont find any solution once the project is over)   
    for(let i = 0; i<aray.length; i++)
    {
        //console.log(aray[i].posX,aray[i].posY,targetX,targetY);
        moveRectToPosition(targetX, targetY, speed, i, aray);
        await new Promise(resolve => setTimeout(resolve, 3300));
        targetX += elementWidth;
    }
}
//-----------------------------------------------------------------------------------------------------------------------



//-------------------------------------------------SORTING-------------------------------------------------------------

async function animateObjects(aray,targetX,targetY,speed,i) {
//   for (let i = 0; i < aray.length; i++) {
//     await moveRectToPosition(targetX, targetY, speed, i, aray, 1000); // Wait for 1 second between animations
//     targetX += elementWidth;
//   }
    speed = 0.15;
  if(i>=aray.length)return;
  await moveRectToPosition(targetX,targetY,speed,i,aray,1000);
  aray[i].posX = targetX;
  aray[i].posY = targetY;
  await animateObjects(aray,targetX+elementWidth,targetY,speed,i+1);
  //if()
}

function sortt()
{
    // animateObjects(arr,arr[0].posX,700,0.09,0).then(()=>{
    //     animateObjects(arr,arr[0].posX,350,0.09,0);
    // })
    
    // let targetY = 700;
    // let speed = 0.09;
    // for(let i=0;i<arr.length;i++)
    // {
    //     moveRectToPosition(arr[i].posX, targetY, speed, i, arr)
    //     .then(() => {
    //         // this code will run after the animation is complete
    //         // ...
    //     });
    // }
    
    // let temp = arr[2];
    // arr[2] = arr[0];
    // arr[0] = temp;
    // let aray = [];
    // for(let i=1;i<3;i++)aray.push(arr[i]);
    // console.log(JSON.stringify(aray));
    // await moveBlock(aray[0].posX,700,0.09,aray);
    // console.log(JSON.stringify(aray));
    // //console.log("Done");
    // let startPos = aray[0].posX;
    // let temp = aray[0];
    // aray[0] = aray[1];
    // aray[1] = temp;
    
    // console.log(JSON.stringify(aray));
    // await moveBlock(startPos,350,0.09,aray);

    // console.log(JSON.stringify(aray));
    mergeSort(arr).then((value)=>{
        arr = value;
    });
    // console.log("Final Answer",JSON.stringify(arr));
}

async function mergeSort(aray) {
    console.log("Full array ",JSON.stringify(aray));
    // Base case
    if (aray.length <= 1)
    {
        await animateObjects(aray, aray[0].posX, 700, 0.09, 0);
        await animateObjects(aray, aray[0].posX, 350, 0.09, 0);
        return aray;
    }
    let startPos = aray[0].posX;
    let mid = Math.floor(aray.length / 2)
    // Recursive calls
    let left = [];
    for(let i=0;i<mid;i++)
        left.push(aray[i]);
    //mergeSort(arr.slice(0, mid))
    let right = [];
    for(let i=mid;i<aray.length;i++)
        right.push(aray[i]);
    let l = await mergeSort(left);
    //console.log(l);
    // l.then((value)=>{
    //     left = value;
    // })
    let r = await mergeSort(right);
    // r.then((value)=>{
    //     right = value;
    // })
    aray = [...l,...r]
    await animateObjects(aray, aray[0].posX, 700, 0.09, 0);
    aray = await merge(l, r);
    console.log("Sorted array ",JSON.stringify(aray));
    // a.then((value)=>{
    //     aray = value;
    // })
    await animateObjects(aray, startPos, 350, 0.09, 0);
    return aray;
    // return animateObjects(aray, aray[0].posX, 700, 0.09).then(()=>{
        
    // })
    //     .then(() => {
    //         aray = merge(left, right);
    //         return animateObjects(aray, startPos, 350, 0.09); // return a new Promise for the second animation
    //     })
    //     .then(() => {
    //         console.log("Second animation complete");
    //         return aray; // return the sorted array
    //     });
}


// function mergeSort(aray) {
//     console.log("Full array ",JSON.stringify(aray));
//     // Base case
//     if (aray.length <= 1) return aray
//     let startPos = aray[0].posX;
//     let mid = Math.floor(aray.length / 2)
//     // Recursive calls
//     let left = [];
//     for(let i=0;i<mid;i++)
//         left.push(aray[i]);
//     //mergeSort(arr.slice(0, mid))
//     let right = [];
//     for(let i=mid;i<aray.length;i++)
//         right.push(aray[i]);
//     left = mergeSort(left);
//     right = mergeSort(right);
//     //console.log("Left and Right ",JSON.stringify(left),JSON.stringify(right));
//     //mergeSort(arr.slice(mid))
//     //moveBlock(aray[0].posX,700,0.09,aray);
//     // moveBlock(aray[0].posX,700,0.09,aray).then(()=>{
//     //     aray = merge(left, right);
//     // }).then(()=>{
//     //     moveBlock(startPos,350,0.09,aray);
//     // });
//     // animateObjects(aray,aray[0].posX,700,0.09)
//     // .then(()=>{
//     //     aray = merge(left,right);
//     // }).then(()=>{
//     //     animateObjects(aray,startPos,350,0.09);
//     // })
//     animateObjects(aray, aray[0].posX, 700, 0.09)
//     .then(() => {
//         aray = merge(left, right);
//         return animateObjects(aray, startPos, 350, 0.09); // return a new Promise for the second animation
//     })
//     .then(() => {
//         console.log("Second animation complete");
//     });

//     //moveBlock(startPos,350,0.09,aray);

//     return aray;
//   }

function sleep(ms) 
    {
        return new Promise((resolve) => 
        {
            setTimeout(resolve, ms);
        });
    }

async function merge(left, right) {
    let sortedArr = [] // the sorted items will go here
    while (left.length && right.length) {
      // Insert the smallest item into sortedArr
      if (left[0].value < right[0].value) {
        sortedArr.push(left.shift())
      } else {
        sortedArr.push(right.shift())
      }
    }

    //console.log(sortedArr,left,right);
    // Use spread operators to create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right]
    //return sortedArr;
  }

//----------------------------EVENT LISTNERS----------------------------------------------------------------------------------
//console.log(addBtn);
//console.log(sortBtn);
addBtn.addEventListener('click',addElement);
sortBtn.addEventListener('click',sortt);