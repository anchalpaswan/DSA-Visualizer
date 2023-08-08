const inputNumber = document.getElementById("input-element");
const addBtn = document.getElementById("add-button");
const sortBtn = document.getElementById("sort-button");
// const removeBtn = document.getElementById("remove-button");
const canvas = document.querySelector('canvas');

let c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;// This is important line
// console.log(canvas.width,canvas.height);

const arrayWidth = 1456;
let elementWidth = 50;
const arrayVisualWidth = 0;
let numberArray = [];
let maxElement = -1;
let dx,dy;

//------------------------------------IMPORTANTS-------------------------

//-------------------------------BASE LINES--------------------------------

drawLineOne();
drawLineTwo();

function drawLineOne()
{
    c.beginPath();
    c.moveTo(40,350);//754 && 1536
    c.lineTo(1496,350);
    c.strokeStyle = "#FDFEFE";
    c.stroke();
}

function drawLineTwo()
{
    c.moveTo(40,725);
    c.lineTo(1496,725);
    c.strokeStyle = "#FDFEFE";
    c.stroke();
}
//-------------------------------------------------------------------------------------------------

//---------------------------------------ADD ELEMENT fUNCTIONALITY--------------------------------

function addElement()
{
    let number = inputNumber.value;
    let numbers = [];
    //numberArray.push(number.split(" "));
    numbers = number.split(" ");//Fix the problem it gives when an empty space is given at the end of array
    //console.log(numberArray);
    animateElement(numbers);
}

function animateElement(numbers)
{
    //console.log(numbers[0]);
    maxElement = numbers.reduce((a, b) => Math.max(a, b), - Infinity);
    let heightUnit = (340/maxElement);
    let x = 50, y=350;
    x = 1496/2 - (numbers.length / 2) * elementWidth;

    let colorArray = "#8D72E1";

    for(let i=0;i<numbers.length;i++)
    {
        const element = {
            value : numbers[i],
            height : heightUnit*numbers[i],
            width : elementWidth,
            posX : x,
            posY : y,
            color : "#8D72E1"
        }

        //let elementHeight = heightUnit*numberArray[i];
        numberArray.push(element);
        //draw(i,colorArray);Old function
        drawRoundedRect(numberArray[i].posX,numberArray[i].posY,numberArray[i].height,8,colorArray);//Add color
        // console.log(numberArray[0].posX);
        
        x = x + elementWidth;
    }
    
}
//---------------------------------------------------------------------------------------------

//------------------------------------MOVE TO POSITION------------------------------------------

function moveRoundedRect(x, y, width, height, radius, targetX, targetY, speed, color) {
    let currentX = x;
    let currentY = y;
  
    function animate() {
      c.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate the distance and direction to move
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const directionX = dx / distance;
      const directionY = dy / distance;
      
      // Move the rounded rectangle by a fraction of the distance
      currentX += directionX * speed;
      currentY += directionY * speed;
  
      // Draw the rounded rectangle at the new position
      drawRoundedRect(currentX, currentY, width, height, radius, color);
  
      // Check if the rounded rectangle has reached the target position
      if (distance <= speed) {
        // Draw the rounded rectangle at the exact target position
        drawRoundedRect(targetX, targetY, width, height, radius, color);
        return;
      }
      
      // Continue the animation loop
      requestAnimationFrame(animate);
    }
  
    animate();
  }
  

// function draw(index,colorArray)
// {
//     c.beginPath();
//     c.lineWidth = "1";
//     c.strokeStyle = "#1f2641";//"#321c5d";
//     c.roundRect(numberArray[index].posX, numberArray[index].posY, numberArray[index].width, -numberArray[index].height,8);//minus wala height bane ga || plus wala width 
//     //console.log(x,y,elementHeight,elementWidth);
//     c.stroke();
//     c.fillStyle = colorArray;
//     c.fill();
// }

function drawRoundedRect(x, y, width, height, radius, color) {
    const maxRadius = Math.min(width, height) / 2;
    radius = Math.min(maxRadius, radius);
    
    // Adjust y-coordinate based on height
    y -= height;
    
    c.beginPath();
    c.moveTo(x + radius, y);
    c.lineTo(x + width - radius, y);
    c.arcTo(x + width, y, x + width, y + radius, radius);
    c.lineTo(x + width, y + height - radius);
    c.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    c.lineTo(x + radius, y + height);
    c.arcTo(x, y + height, x, y + height - radius, radius);
    c.lineTo(x, y + radius);
    c.arcTo(x, y, x + radius, y, radius);
    c.closePath();
  
    c.fillStyle = color;
    c.fill();
    c.stroke();
  }

// function clearRoundRect( x, y, width, height, radius) {
//     c.save();
//     c.beginPath();
//     c.roundRect(c, x, y, width, height, radius, false, true);
//     c.clip();
//     c.clearRect(x, y, width, height);
//     c.restore();
//   }

function update(index)
{
    numberArray[index].posX += dx;
    numberArray[index].posY += dy;
    //console.log(numberArray[index].posX,numberArray[index].posY);
}

function animate(index,newX,newY,color)
{
    console.log(index);
    console.log(newX,newY);
    console.log(numberArray[index].posX,numberArray[index].posY);
    dx = (newX - numberArray[index].posX)/20;
    dy = (newY - numberArray[index].posY)/20;
    moveRoundedRect(numberArray[index].posX,numberArray[index].posY,numberArray[index].height,8,newX,newY,1,color);
}

//--------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------DIM EFFECT-------------------------------------------------------------

function dim(l,r,colorArray)
{
    for(let i = l;i<=r;i++)
    {
        numberArray[i].color = colorArray;
        drawRoundedRect(numberArray[i].posX,numberArray[i].posY,numberArray[i].height,8,colorArray);
    }
}

//-----------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------SORTING FUNCTION------------------------------------------------------

function sort()
{
    console.log(numberArray[0].posX,numberArray[0].posY);
    //dim(0,3,"#8D72E1")
    //dim(0,3,"#29B6F6");
    // for(let i=l;i<=r;i++)
    
    mergeSort(numberArray, 0, numberArray.length - 1);
    //animate(0,200,450);//Delta Calculator will call move to pos function
    // moveToPos(0,200,450);
}



// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function merge(numberArray, l, m, r)
{
	let n1 = m - l + 1;
	let n2 = r - m;

	// Create temp arrays
	// let L = new Array(n1);
	// let R = new Array(n2);
    let L = [];
    let R = [];

	// Copy data to temp arrays L[] and R[]
	for (let i = 0; i < n1; i++)
		{
            //L[i] = numberArray[l+i].value;
            L.push(numberArray[l+i]);
        }
	for (let j = 0; j < n2; j++)
		{
            //R[j] = numberArray[m + 1 + j].value;
            R.push(numberArray[m + 1 + j]);
        }

    let newX = L[0].posX;
    let newY = 350;
	// Merge the temp arrays back into arr[l..r]

	// Initial index of first subarray
	let i = 0;

	// Initial index of second subarray
	let j = 0;

	// Initial index of merged subarray
	let k = l;

	while (i < n1 && j < n2) {
		if (L[i].value <= R[j].value) {
			numberArray[k] = L[i];     
			i++;
		}
		else {
			numberArray[k] = R[j];
			j++;
		}
        animate(k,newX,newY,numberArray[k].color);
        newX = newX + elementWidth;
		k++;
	}

	// Copy the remaining elements of
	// L[], if there are any
	while (i < n1) {
		numberArray[k] = L[i];
        animate(k,newX,newY,numberArray[k].color);
        newX = newX + elementWidth;
		i++;
		k++;
	}

	// Copy the remaining elements of
	// R[], if there are any
	while (j < n2) {
		numberArray[k] = R[j];
        animate(k,newX,newY,numberArray[k].color);
        newX = newX + elementWidth;
		j++;
		k++;
	}
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergeSort(numberArray,l, r){
	if(l>=r){
		return;//returns recursively
	}
    let m =l+ parseInt((r-l)/2);
    dim(m+1,r,"#29B6F6");//Dim
	mergeSort(numberArray,l,m);
    dim(m+1,r,"#8D72E1");//Undim
    dim(l,m,"#29B6F6");//Dim
	mergeSort(numberArray,m+1,r);
    dim(l,m,"#8D72E1");//Undim
    //Here insert a function to bring the two arrays down that needed to be mergeSorted
    for(let i=l;i<=r;i++)
    {
        let pauseIndex = 5;
        for (let i = 0; i < 10; i++) {
            if (i < pauseIndex) {
                //console.log(i);
            } else {
                window.setTimeout(() => console.log(i), 5000);    
            }
        }
        animate(i,numberArray[i].posX,725,numberArray[i].color)
    }
    
 
    

	merge(numberArray,l,m,r);
}








//--------------------------------------------------------------------------------------------------------------------------



//----------------------------EVENT LISTNERS----------------------------------------------------------------------------------
addBtn.addEventListener('click',addElement);
sortBtn.addEventListener('click',sort);