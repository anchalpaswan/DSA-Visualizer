// import{
//     arr
// } from './app.js';

let speed = 2;
let radius = 8;

const canvas = document.getElementById("canvasID");
export{ canvas };
const c = canvas.getContext("2d");

//resizeCanvas(canvas,1600,800);
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

console.log(canvas.width, canvas.height);

export function drawRoundedRect(x, y, width, height, radius, color) {
    const maxRadius = Math.min(width, height) / 2;
    radius = Math.min(maxRadius, radius);
    //width = width - 2;
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


export function moveRoundedRect(x, y, width, height, radius, targetX, targetY, speed, color) {
    let currentX = x;
    let currentY = y;
  
    function animate() {
      // Clear the area of the previous frame
      c.clearRect(currentX, currentY, width+3, height+1);
      
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
  
    // Draw the rounded rectangle at the starting position
    drawRoundedRect(currentX, currentY, width, height, radius, color);
  
    animate();
  }
  

export function drawLineOne()
{
    c.beginPath();
    c.moveTo(40,350);//754 && 1536
    c.lineTo(1440,350);
    c.strokeStyle = "#000000";
    c.stroke();
    console.log("Line One");
}

export function drawLineTwo()
{
    c.moveTo(40,700);
    c.lineTo(1440,700);
    c.strokeStyle = "#000000";
    c.stroke();
    console.log("Line Two");
}

export function resizeCanvas(canvas, newWidth, newHeight) {
    // Store the current canvas content in an image
    var img = new Image();
    img.src = canvas.toDataURL();
    canvas.width = newWidth;
    canvas.height = newHeight;
    // Wait for the image to load before resizing the canvas and redrawing the image
    img.onload = function() {  
      // Redraw the image on the canvas at the new size
      canvas.getContext("2d").drawImage(img, 0, 0, newWidth, newHeight);
      console.log("loaded");
    };
    
}

//If I get the targetx and targety of the first array element to move in the range of l to r then I can
//calculate the target position of other element in the range as well 
export async function move(l, r, targetX, targetY, color) {
    for (let i = l; i <= r; i++) {
      moveRoundedRect(arr[i].posX, arr[i].posY, arr[i].width, arr[i].height, radius, targetX, targetY, speed, color);
  
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      console.log(i);
  
      targetX += arr[i].width;
    }
  }
  

//----------------------------------------------------------------------------------------
// function move(l, r, targetX, targetY, color)
// {

//     for(let i=l;i<=r;i++)
//     {
//         // console.log(i);
//         moveRoundedRect(arr[i].posX, arr[i].posY, arr[i].width, arr[i].height, radius, targetX, targetY, speed, color);
//         setTimeout(function() {
//             console.log(i);
//         }, 9000);
//         targetX += arr[i].width;
//     }
// }

// function moveRoundedRect(x, y, width, height, radius, targetX, targetY, speed, color) {
//     let currentX = x;
//     let currentY = y;
  
//     function animate() {
//       c.clearRect(0, 0, canvas.width, canvas.height);
      
//       // Calculate the distance and direction to move
//       const dx = targetX - currentX;
//       const dy = targetY - currentY;
//       const distance = Math.sqrt(dx * dx + dy * dy);
//       const directionX = dx / distance;
//       const directionY = dy / distance;
      
//       // Move the rounded rectangle by a fraction of the distance
//       currentX += directionX * speed;
//       currentY += directionY * speed;
  
//       // Draw the rounded rectangle at the new position
//       drawRoundedRect(currentX, currentY, width, height, radius, color);
  
//       // Check if the rounded rectangle has reached the target position
//       if (distance <= speed) {
//         // Draw the rounded rectangle at the exact target position
//         drawRoundedRect(targetX, targetY, width, height, radius, color);
//         return;
//       }
      
//       // Continue the animation loop
//       requestAnimationFrame(animate);
//     }
  
//     animate();
//   }

// function moveRoundedRect(x, y, width, height, radius, targetX, targetY, speed, color) {
//     let currentX = x;
//     let currentY = y;
  
//     function animate() {
//       // Clear the area of the previous frame
//       c.clearRect(currentX - radius, currentY - radius, width + 2 * radius, height + 2 * radius);
      
//       // Calculate the distance and direction to move
//       const dx = targetX - currentX;
//       const dy = targetY - currentY;
//       const distance = Math.sqrt(dx * dx + dy * dy);
//       const directionX = dx / distance;
//       const directionY = dy / distance;
      
//       // Move the rounded rectangle by a fraction of the distance
//       currentX += directionX * speed;
//       currentY += directionY * speed;
  
//       // Draw the rounded rectangle at the new position
//       drawRoundedRect(currentX, currentY, width, height, radius, color);
  
//       // Check if the rounded rectangle has reached the target position
//       if (distance <= speed) {
//         // Draw the rounded rectangle at the exact target position
//         drawRoundedRect(targetX, targetY, width, height, radius, color);
//         return;
//       }
      
//       // Continue the animation loop
//       requestAnimationFrame(animate);
//     }
  
//     // Draw the rounded rectangle at the starting position
//     drawRoundedRect(currentX, currentY, width, height, radius, color);
  
//     animate();
//   }
// function drawRoundedRect(x, y, width, height, radius, color) {
//     const maxRadius = Math.min(width, height) / 2;
//     radius = Math.min(maxRadius, radius);
    
//     // Adjust y-coordinate based on height
//     y -= height;
    
//     c.beginPath();
//     c.moveTo(x + radius, y);
//     c.lineTo(x + width - radius, y);
//     c.arcTo(x + width, y, x + width, y + radius, radius);
//     c.lineTo(x + width, y + height - radius);
//     c.arcTo(x + width, y + height, x + width - radius, y + height, radius);
//     c.lineTo(x + radius, y + height);
//     c.arcTo(x, y + height, x, y + height - radius, radius);
//     c.lineTo(x, y + radius);
//     c.arcTo(x, y, x + radius, y, radius);
//     c.closePath();
  
//     c.fillStyle = color;
//     c.fill();
//     c.stroke();
//   }

// function drawRoundedRect(x, y, width, height, radius, color) {
//     const maxRadius = Math.min(width, height) / 2;
//     radius = Math.min(maxRadius, radius);
    
//     // Adjust x and y coordinates based on width, height, and border line
//     x += c.lineWidth / 2;
//     y -= height + c.lineWidth;

//     c.beginPath();
//     c.moveTo(x + radius, y);
//     c.lineTo(x + width - radius, y);
//     c.arcTo(x + width, y, x + width, y + radius, radius);
//     c.lineTo(x + width, y + height - radius);
//     c.arcTo(x + width, y + height, x + width - radius, y + height, radius);
//     c.lineTo(x + radius, y + height);
//     c.arcTo(x, y + height, x, y + height - radius, radius);
//     c.lineTo(x, y + radius);
//     c.arcTo(x, y, x + radius, y, radius);
//     c.closePath();
  
//     c.fillStyle = color;
//     c.fill();
//     c.stroke();
// }