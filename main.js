const 
    keyboard = document.querySelector('.keyboard'),
    operators = document.querySelectorAll('.operators'),
    numbers = document.querySelectorAll('.numbers'),
    result = document.querySelector('.result'),
    clearButton = document.querySelector('.clearButton');
    clearKeyboard = () => keyboard.value = '';

let resultDisplayed = false;

for (let i=0; i < numbers.length; i++){
    numbers.item(i).onclick = (e) => {
        let numberValue = numbers.item(i).value,
        keyboardString = keyboard.value,
        lastStringOfKeyboard = keyboardString[keyboardString.length - 1];

        if(resultDisplayed){
            resultDisplayed = false;
            keyboard.value = numberValue;
        }else{
            keyboard.value += numberValue;
        }
    }
}

for(let i=0;i < operators.length;i++){
    operators.item(i).onclick = () => {
        let operatorValue = operators.item(i).value,
        keyboardString = keyboard.value,
        lastStringOfKeyboard = keyboardString[keyboardString.length - 1];

        if(keyboardString.length && lastStringOfKeyboard !== "÷" 
        && lastStringOfKeyboard !== "×" 
        && lastStringOfKeyboard !== "/" 
        && lastStringOfKeyboard !== "-"){
            keyboard.value += operatorValue;
        } else if (lastStringOfKeyboard === "÷" 
        || lastStringOfKeyboard === "×" 
        || lastStringOfKeyboard === "/" 
        || lastStringOfKeyboard === "-"){
            keyboard.value = keyboardString.replace(lastStringOfKeyboard,'') + operatorValue
        }
    }
}

result.onclick = () => {
    let keyboardString = keyboard.value,
    numbersInKeyboard = keyboardString.split(/\+|\-|\×|\÷/g);
    operatorsInKeyboard = keyboardString.replace(/[0-9]|\./g, "").split('');

    console.log(keyboardString, numbersInKeyboard, operatorsInKeyboard)

    let divOperatorPos = operatorsInKeyboard.indexOf("÷");
    while(divOperatorPos !== -1){
        numbersInKeyboard.splice(divOperatorPos, 2, numbersInKeyboard[divOperatorPos] / numbersInKeyboard[divOperatorPos+1]);
        operatorsInKeyboard.splice(divOperatorPos, 1);
        divOperatorPos = operatorsInKeyboard.indexOf("÷");
    }

    let multOperatorPos = operatorsInKeyboard.indexOf("×");
    while(multOperatorPos !== -1){
        numbersInKeyboard.splice(multOperatorPos, 2, numbersInKeyboard[multOperatorPos] * numbersInKeyboard[multOperatorPos+1]);
        operatorsInKeyboard.splice(multOperatorPos,1);
        multOperatorPos = operatorsInKeyboard.indexOf("×");
    }

    let subtrOperatorPos = operatorsInKeyboard.indexOf("-");
    while(subtrOperatorPos !== -1){
        numbersInKeyboard.splice(subtrOperatorPos, 2, numbersInKeyboard[subtrOperatorPos] - numbersInKeyboard[subtrOperatorPos+1]);
        operatorsInKeyboard.splice(subtrOperatorPos,1);
        subtrOperatorPos = operatorsInKeyboard.indexOf("-");
    }

    let plusOperatorPos = operatorsInKeyboard.indexOf("+");
    while(plusOperatorPos !== -1){
        numbersInKeyboard.splice(plusOperatorPos, 2, parseFloat(numbersInKeyboard[plusOperatorPos]) + parseFloat(numbersInKeyboard[plusOperatorPos+1]));
        operatorsInKeyboard.splice(plusOperatorPos,1);
        plusOperatorPos = operatorsInKeyboard.indexOf("+");
    }

    keyboard.value = numbersInKeyboard[0];
    resultDisplayed = true;
}


clearButton.onclick = clearKeyboard;
