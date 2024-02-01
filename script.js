// Create a variable for the first number, the operator, and the second number. 

let firstNumber = 0;
let operator = '';
let secondNumber = '';
let numButtonClicked = false; // keep track if a numButton has been clicked
let operatorButtonClicked = false; // keep track if an operatorButton has been clicked. 
updateDisplay("0");
//Program Logic
// Initialize state and bind event listeners. 
let numBtns = document.querySelectorAll("button.num");
numBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        //check if operator Button clicked
        if(operatorButtonClicked == false){
            // check if number button has been clicked yet
            if(numButtonClicked == false || firstNumber == 0){
                firstNumber = btn.value;
                updateDisplay(firstNumber);
                numButtonClicked = true;
                console.log("firstNumber: "+firstNumber);
            }
            else {
                firstNumber += btn.value;
                updateDisplay(firstNumber);
                console.log("firstNumber: "+firstNumber);
            }
        }
        else if(operatorButtonClicked == true) {
            //check to see if secondNumber is empty
            if(secondNumber == '' || secondNumber == 0){
                secondNumber = btn.value;
                updateDisplay(secondNumber);
                console.log("secondNumber: "+secondNumber);
            }
            else {
                secondNumber += btn.value;
                updateDisplay(secondNumber);
                console.log("secondNumber: "+secondNumber);
            }
        }
    });
});

// clear button
let clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', ()=>{
    firstNumber = 0;
    operator = '';
    secondNumber = '';
    numButtonClicked = false; 
    operatorButtonClicked = false; 
    updateDisplay("0");
    console.log("Calculator cleared!");
});

// operate button
let operateButtons = document.querySelectorAll(".operator");
operateButtons.forEach(btn => {
    btn.addEventListener('click', ()=>{
        operator = btn.value;
        operatorButtonClicked = true;
        console.log("operator: "+ operator);
    });
});

// equals button
let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener('click', ()=> {
    if(operator==''){
        updateDisplay(firstNumber);
    }
    operate(Number(firstNumber), operator, Number(secondNumber));
});


////////// FUNCTIONS ///////////

//Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
function operate(firstNumber, operator, secondNumber){
    switch(operator){
        case "add":
            updateDisplay(firstNumber + secondNumber);
            break;
        case "subtract":
            updateDisplay(firstNumber - secondNumber);
            break;
        case "mulitply":
            updateDisplay(firstNumber * secondNumber);
            break;
        case "divide":
            updateDisplay(firstNumber / secondNumber);
            break;
        default:
        updateDisplay(0);
    }
}

//whatever you want to be displayed will be an argument of updateDisplay
function updateDisplay(value) {
    const display = document.querySelector('.display');
    display.textContent = value;
}

