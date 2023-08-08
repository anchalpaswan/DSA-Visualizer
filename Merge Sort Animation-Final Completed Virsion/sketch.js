function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);
  }
  
function draw() {
    
}

async function moveRectToPosition(targetX, targetY, speed, index, aray, delay) {
    //let r = {...aray[index]};
    let r = aray[index];
    //console.log(r[index]);
    let isAnimationRunning = true;
  
    function animate() {
      if (!isAnimationRunning) {
        return;
      }
  
      let distanceX = targetX - r.posX;
      let distanceY = targetY - r.posY;
      let distance = dist(r.posX, r.posY, targetX, targetY);
  
      if (distance <= 0.001) {
        r.posX = targetX;
        r.posY = targetY;
        isAnimationRunning = false;
        //resolve();
        return;
        //return Promise.resolve();//This was the orignal one, in case of an anamoly uncomment this return line
    
      }
  
      let moveX = distanceX * speed;
      let moveY = distanceY * speed;
  
      r.posX += moveX;
      r.posY += moveY;
  
      background(220);
      // Draw the rectangle
      drawObj();
    //   await new Promise(resolve => {
    //     requestAnimationFrame(resolve);
    // }).then(animate());
    return new Promise(requestAnimationFrame).then(animate);
    }
    await animate();
    // await new Promise(resolve => {
    //   animate();
    //   requestAnimationFrame(() => {
    //     resolve();
    //   });
    // });
  
    //await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the specified delay
  }
  
// function moveRectToPosition(targetX, targetY, speed, index, r) {
//     console.log(index,r[index].posX);
//     //let x = r[index].posX,y = r[index].posY;
//     let isAnimationRunning = true;
    
//     function animate() {
//       if (!isAnimationRunning) {
//         return;
//       }
  
//       let distanceX = targetX - r[index].posX;
//       let distanceY = targetY - r[index].posY;
      
//       let distance = dist(r[index].posX, r[index].posY, targetX, targetY);
  
//       if (distance <= 0.001) {
//         //console.log(targetY,r[index].posY);
//         r[index].posX = targetX;
//         r[index].posY = targetY;
//         //console.log("Finished");
//         isAnimationRunning = false;
//         return;
//       }
  
//       let moveX = distanceX * speed;
//       let moveY = distanceY * speed;
  
//       r[index].posX += moveX;
//       r[index].posY += moveY;
  
//       background(220);

//       drawObj();
//       requestAnimationFrame(animate);
//     }
  
//     animate();
//   }
  
function drawObj()
{
    
    line(40,350,1440,350);
    line(40,700,1440,700);
    for(let i=0;i<arr.length;i++)
    {
        fill(arr[i].color);
        rect(arr[i].posX,arr[i].posY,arr[i].width,arr[i].height,8);//This rect takes the position of upper left corner
    }
    //background(255);
}
