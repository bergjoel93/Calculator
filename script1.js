let firstValue = 0;
let operator = '';
let secondValue = '';
let operatorChosen = false;
let numButtonClicked = false;

display(firstValue);
getFirstValue();
getOperator();
// I want to base everything off the getOperator. if operator button is clicked then we will immedietly wait for an assignment for the second value. If the operator is clicked again then we will re-assign the operator. 
if(operatorChosen == true){
    getSecondValue();
}

function getSecondValue() {
    getValue();
    console.log("second value chose: "+secondValue);
}

function getOperator() {
    let operators = document.querySelectorAll(".operator")
    operators.forEach(op => {
        op.addEventListener('click', () => {
            if(operatorChosen==true){
                resetOperatorsClass();
            }
            operator = op.value;
            console.log("operator: " + operator);
            operatorChosen = true;
            op.classList.add('active');
        });
    });
}


let clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', clear);

/**
 * This function reads the first buttons pushed. If the user pushes a number button it will display. If a user pushes another number, it will be displayed after the first number. This will create a firstValue string that is returned. 
 */
function getFirstValue() {
    let buttons = document.querySelectorAll("button.num");
    //keep track if a num button is clicked. 
    //Iterate over each button and add a click event listener. 
    buttons.forEach(btn => {
        btn.addEventListener('click', () =>{
            // check to see if numButton is clicked for first time. 
            if(numButtonClicked == false){
                firstValue = btn.value;
                numButtonClicked = true;
            }
            else{ 
                firstValue += btn.value; 
            }
            console.log("first value chose: "+firstValue);
            display(firstValue);  
        });
    });
}

function getValue() {
    let buttons = document.querySelectorAll("button.num");
    let value = '';
    //Iterate over each button and add a click event listener. 
    buttons.forEach(btn => {
        btn.addEventListener('click', () =>{
            //check to see if firstValue has been populated yet
            if(value === ''){
                value = btn.value;
            }
            else{ 
                value += btn.value; 
            } 
        });
    });
    return value;
}


function display(displaid) {
    let display = document.querySelector('.display');
    display.textContent = displaid;
   
}

function isIntegerOrDecimal(str) {
    // Regular expression for matching integers or decimal numbers
    const regExp = /^-?\d+(\.\d+)?$/;

    return regExp.test(str);
}

function clear() {
    resetOperatorsClass();
    numButtonClicked = false;
    firstValue = 0;
    secondValue='';
    operator = '';
    operatorChosen = false;
    display('');
    console.log("calculator cleared");
    
}

function resetOperatorsClass(){
    let actives = document.querySelectorAll('.active');
    actives.forEach(active =>{
        active.classList.remove('active');
    });
}

/**
 * Logic: 
 * Num button logic:
 * if user hits a number button check:
 * if ((firstNumberActive )){
 *  firstNumberActive = true;
 *  firstNumber = value input; 
 * } 
 * else if(operatorButtonClicked == true && fisrtNumber == true && equalsButtonClicked == false){
 *  firstNumberActive = false;
 *  secondNumberActive = true;
 *  secondNumber = value input;
 * }
 * else if(equalsButtonClicked == true && firstNumberActive == true){
 *  equalsButtonClicked = false; 
 *  firstNumber = value input; 
 * }
 * 
 * 
 * Operator button logic:
 * if user hits operator button {
 *  if(operatorButtonClicked == false){ // check if operator button has been clicked. 
 *  operator = value input;
 *  operatorButtonClicked = true;
 *  }
 * }
 * 
 * 
 * equals button logic:
 * if user hits equals button
 * if(equalsButtonClicked == false && secondNumber != '' && operator != ''){
 *  equalsButtonClicked = true;
 *  solution = operate();
 *  clear(); // resets everything
 *  firstNumber = solution;
 *  updateDisplay(firstNumber);
 *  firstNumberActive = true;
 * }
 * 
 * 
 * if you do 3 + 3 = 6 and you press number directly after, then everything is cleared and firstNumber is input. 
 * if you do 3 + 3 = 6 and then press operator, then solution becomes first number
 * 
 * if you do 3 + 3  = 6 then press operator and press operator again 
 * 
 * 
 * 
 * 
 */