// Wait for the DOM to finish loading before running the game
// get button elements and add event listners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }

        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */

function runGame(gameType) {

    document.getElementById('answer-box').value = "";
    document.getElementById('answer-box').focus();


    let num1 = Math.ceil(Math.random() * 25);
    let num2 = Math.ceil(Math.random() * 25);

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtraction") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "multiplication") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Uknown game type: ${gameType}. Aborting`
    }

}

/**
 * Checks the answer against the first element in 
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Incorrect answer, you answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subraction"];
    } else if (operator === "*") {
        return [operand1 * operand2, "multiplication"];
    } else if (operator === "/") {
        return [operand1 / operand2, "divivsion"];
    } else {
        alert(`Unimplimented operator ${operator}`);
        throw `Unimplimented operator ${operator}. Aborting`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {

    let score = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').textContent = ++score;
}

/**
 * Gets the current incorrect score from the DOM and increments it by 1
 */
function incrementWrongAnswer() {

    let incorrect = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').textContent = ++incorrect;
}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {

    if (operand1 > operand2) {
        document.getElementById('operand1').textContent = operand1
        document.getElementById('operand2').textContent = operand2;
        document.getElementById('operator').textContent = "-";
    } else {
        document.getElementById('operand1').textContent = operand2;
        document.getElementById('operand2').textContent = operand1;
        document.getElementById('operator').textContent = "-";
    }
}

function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "*";
}

function displayDivisionQuestion(operand1, operand2) {

    if (operand1 % operand2 === 0 && operand2 > 1 && operand1 !== operand2) {
        document.getElementById('operand1').textContent = operand1;
        document.getElementById('operand2').textContent = operand2;
        document.getElementById('operator').textContent = "/";
    } else {
        runGame("division");
    }
}