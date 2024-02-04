// Create a variable for the first number, the operator, and the second number. 

let firstNumber = 0;
let operator = '';
let previousOperator = '';
let secondNumber = '';
let solution = 0;


let operatorButtonClicked = false; // keep track if an operatorButton has been clicked. 
let firstNumberActive = true; // default state is true 
let secondNumberActive = false;
let equalsButtonClicked = false;

updateDisplay(firstNumber);


//////////////////Program Logic////////////////////////////

// Initialize state and bind event listeners for firstNumber and secondNumber
let numBtns = document.querySelectorAll("button.num");
numBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        //Situation: 1 + 2 = 3 => hit any number button => resets and firstNumber is btn.value
        if(equalsButtonClicked){
            clear();
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
            //equalsButtonClicked = false;
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
        equalsButtonClicked = false;
    });
});

// operate button
let operateButtons = document.querySelectorAll(".operator");
operateButtons.forEach(btn => {
    btn.addEventListener('click', ()=>{
        
        operator = btn.value;
        removeActive();
        btn.classList.add("active");
        console.log("operator: "+ operator);

        // default where equals button hasn't been clicked yet. 
        if(!equalsButtonClicked){
            if(firstNumberActive){
                toggleFirstSecond();
            }
            else if(secondNumberActive) {
                solution = operate(firstNumber, operator, secondNumber);
                firstNumber = solution;
                secondNumber = ''
            }
        }

        // Situation: if 1 + 2 = 3 then user pressed operator again.
        if(equalsButtonClicked) {
            firstNumber = solution;
            firstNumberActive = false;
            secondNumber = 0;
            secondNumberActive = true;
            equalsButtonClicked = false;
        }
        // situation: if firstNumber is assigned and second number is not assigned and operator button is pushed again
        if(operatorButtonClicked && secondNumber==''){
            if(operator == previousOperator){
                solution = operate(firstNumber,operator,firstNumber);
                firstNumber = solution;
            }
            else {
                solution = operate(firstNumber, previousOperator, secondNumber);
                firstNumber = solution;

            }
            
        }
        //Situation: if firstNum is assigned and secondNum assigned and operator pressed again instead of equals. 
        
        else if(operatorButtonClicked){
            solution = operate(firstNumber,operator,secondNumber);
            firstNumber = solution;
            secondNumber = '';
            secondNumberActive = true;
            firstNumberActive = false;
        }
        
        previousOperator = operator;
        equalsButtonClicked = false;
        operatorButtonClicked = true;
    });
});

// equals button
let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener('click', ()=> {
    console.log("equals button clicked")
    equalsButtonClicked = true;
    operatorButtonClicked = false; // falsify operator button clicked. 
    removeActive();
    if(secondNumber!=''){
        solution = operate(firstNumber,operator,secondNumber);
        secondNumber ='';
    }
    


    // if(operator !='' && secondNumber != ''){
    //     equalsButtonClicked=true;
    //     console.log("equalsButtonClicked: "+equalsButtonClicked);
    //     solution = operate(Number(firstNumber), operator, Number(secondNumber));
    //     console.log("Solution:" + solution);
    //     clear();
    //     updateDisplay(solution);
    // }
        
});

// clear button
let clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', () =>{
    clear();
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
    num1 = Number(num1);
    num2 = Number(num2);
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
                solution = "ERROR";
            }
            else{solution = num1 / num2;}
            break;
        default:
        updateDisplay('ERROR');
    }
    updateDisplay(solution);
    return solution;
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
    equalsButtonClicked = false;
    operatorButtonClicked = false; 
    updateDisplay("0");
    removeActive();
    console.log("Calculator cleared!");
}

function toggleFirstSecond(){
    if(firstNumberActive){
        firstNumberActive = false;
        secondNumberActive = true;
    }
    else{
        secondNumberActive = false;
        firstNumberActive = true;
    }
}