function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);
  }
  
function draw() {
    
}

async function moveRectToPosition(targetX, targetY, speed, index, aray, delay) {
    let r = aray[index];
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
  
      // Draw the rectangles
      drawObj();
    return new Promise(requestAnimationFrame).then(animate);
    }
    await animate();
  }
  
function drawObj()
{
    background(220);
    line(planeXStartCoorinate,planeYCoorinate,planeXEndCoorinate,planeYCoorinate);
    //line(40,700,1440,700);
    for(let i=0;i<arr.length;i++)
    {
        fill(arr[i].color);
        rect(arr[i].posX,arr[i].posY,arr[i].width,arr[i].height,8);//This rect takes the position of upper left corner
    }
}
