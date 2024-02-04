// Create a variable for the first number, the operator, and the second number. 

let firstNumber = 0;
let operator = '';
let secondNumber = '';
let solution = '';
//let numButtonClicked = false; // keep track if a numButton has been clicked
let operatorButtonClicked = false; // keep track if an operatorButton has been clicked. 
updateDisplay(firstNumber);
// keep track of whether first number or second number is active and being displayed. 
let firstNumberActive = true; // default state is true 
let secondNumberActive = false;
let equalsButtonClicked = false;


//////////////////Program Logic////////////////////////////

// Initialize state and bind event listeners for firstNumber and secondNumber
let numBtns = document.querySelectorAll("button.num");
numBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        //if(solution !='') firstNumber = 0;
        if(equalsButtonClicked && !operatorButtonClicked){
            clear();
            equalsButtonClicked == false;
            console.log("equalsButtonClicked: "+equalsButtonClicked);
        }

        if(firstNumberActive){
            if(firstNumber == 0){ 
                firstNumber = btn.value;
                updateDisplay(firstNumber);
                console.log("firstNumber: "+firstNumber);
            }
            else { //firstNumber is already active 
                firstNumber += btn.value;
                updateDisplay(firstNumber);
                console.log("firstNumber: "+firstNumber);
            }
        }

        if(secondNumberActive){
            if(secondNumber == 0 || secondNumber == ''){
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
clearBtn.addEventListener('click', () =>{
    clear();
    equalsButtonClicked = false;
});

// operate button
let operateButtons = document.querySelectorAll(".operator");
operateButtons.forEach(btn => {
    btn.addEventListener('click', ()=>{
        equalsButtonClicked = false;
        if(!operatorButtonClicked){
            operatorButtonClicked = true;
            operator = btn.value;
            btn.classList.add("active");
            firstNumberActive = false;
            secondNumberActive = true;
        }
        else if(operatorButtonClicked && secondNumber !=''){
           firstNumber = operate(Number(firstNumber), operator, Number(secondNumber));
           secondNumber = '';
           console.log("firstNumber: "+firstNumber);
           removeActive();
           operator = btn.value;
           btn.classList.add("active");
           updateDisplay(firstNumber);
           firstNumberActive = false;
           secondNumberActive = true;
        }
        else if(operatorButtonClicked && secondNumber ==''){
            firstNumber = operate(Number(firstNumber), operator, Number(firstNumber));
           secondNumber = '';
           console.log("firstNumber: "+firstNumber);
           removeActive();
           operator = btn.value;
           btn.classList.add("active");
           updateDisplay(firstNumber);
           firstNumberActive = false;
           secondNumberActive = true;
        }
        console.log("operator: "+ operator);
    });
});

// equals button
let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener('click', ()=> {
    if(!equalsButtonClicked && (operator == '' || secondNumber =='')){
        clear();
        equalsButtonClicked = false;
    }
    else if(!equalsButtonClicked){
        equalsButtonClicked=true;
        console.log("equalsButtonClicked: "+equalsButtonClicked);
        solution = operate(Number(firstNumber), operator, Number(secondNumber));
        clear();
        firstNumber = solution;
        console.log("firstNumber: "+firstNumber)
        updateDisplay(solution);
    }
        
});

let signButton = document.querySelector("#sign");
signButton.addEventListener('click', ()=>{
    if(firstNumberActive){
        let changedSign = Number(firstNumber) * -1;
        firstNumber = changedSign;
        updateDisplay(firstNumber);
    }
    if(secondNumberActive){
        let changedSign = Number(secondNumber) * -1;
        secondNumber = changedSign;
        updateDisplay(secondNumber);
    }
});

let percentButton = document.querySelector("#percent");
percentButton.addEventListener('click', ()=>{
    if(firstNumberActive){
        let percent = Number(firstNumber) / 100;
        firstNumber = percent;
        updateDisplay(firstNumber);
    }
    if(secondNumberActive){
        let percent = Number(secondNumber) / 100;
        secondNumber = percent;
        updateDisplay(secondNumber);
    }
});

let decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener('click', () =>{
    console.log("decimal");
    if(firstNumberActive){
        firstNumber = firstNumber.includes('.') ? firstNumber : firstNumber+".";
        updateDisplay(firstNumber);
    }
    if(secondNumberActive){
        secondNumber = secondNumber.includes('.')? secondNumber : secondNumber + ".";
        updateDisplay(secondNumber);

    }
});






////////// FUNCTIONS ///////////

//Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
function operate(num1, op, num2){
    let solution = '';
    switch(op){
        case "add":
            solution = num1 + num2;
            break;
        case "subtract":
            solution = num1 - num2;
            break;
        case "multiply":
            solution = num1 * num2;
            break;
        case "divide":
            if(num2 == 0){
                soluition = "ERROR";
            }
            else{solution = num1 / num2;}
            break;
        default:
        updateDisplay('ERROR');
    }
    return solution;
    // updateDisplay(solution);
    // operatorButtonClicked = false; //TODO possible bug might need to add conditional 
    // operator = '';
    // secondNumber = '';
    // firstNumber = solution;
    // console.log("First number updated: "+firstNumber);
}

//whatever you want to be displayed will be an argument of updateDisplay
function updateDisplay(value) {
    // let num = parseFloat(value);
    // let roundedNum = parseFloat(num.toFixed(7));
     const display = document.querySelector('.display');
    // display.textContent = roundedNum;
    display.textContent = value;
}

function removeActive(){
    const activeElement = document.querySelector(".active");
    if(activeElement) { // check if an element with the class 'active' exists. 
        activeElement.classList.remove("active");
    }
}

function clear(){ 
    firstNumber = 0;
    operator = '';
    secondNumber = '';
    firstNumberActive = true;
    secondNumberActive = false;
    //equalsButtonClicked = false;
    operatorButtonClicked = false; 
    updateDisplay("0");
    removeActive();
    console.log("Calculator cleared!");
}