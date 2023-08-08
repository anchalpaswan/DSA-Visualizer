const elementVal = document.getElementById("element");
const popBtn = document.getElementById("pop-button");
const pushBtn = document.getElementById("push-button");

let topp = 0;
let arr = [];
let topBox;
//---------------------------------------------CONSTANTS-----------------------------------------------------------

//---------------------------------------------ADD ELEMENT-------------------------------------------------------------------

async function pushElement()
{
    if(topp === 20)
    {
        alert("Stack Overflow!!!");
        return;
    }
    let elementValue = elementVal.value;
    arr[topp].value = elementValue;
    arr[topp].create();
    topp++;
    updateTopBox();
}

async function popElement()
{
    if(topp === 0)
    {
        alert("Stack Underflow!!!");
        return;
    }
    topp--;
    
    arr[topp].value = null;
    arr[topp].create();
    updateTopBox();
}
//------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------DFS----------------------------------------------------------------------------


async function sleep(ms) 
{
    await new Promise((resolve) => 
    {
        setTimeout(resolve, ms);
    });
}

//------------------------------------------------------------------------------------------------------------------------------

//----------------------------EVENT LISTNERS----------------------------------------------------------------------------------
popBtn.addEventListener('click',popElement);
pushBtn.addEventListener('click',pushElement);