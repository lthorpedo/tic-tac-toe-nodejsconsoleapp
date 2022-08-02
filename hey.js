
const readline = require('readline-sync');


let totalTurn = 0;
let win = false;
let gameState = ['-','-','-','-','-','-','-','-','-'];
let computerTurn = false;


let firstInput = readline.question(`who should go first? 1 for computer, 2 for user: \n`);
if(firstInput == '1'){
    computerTurn = true;
} else {
    computerTurn = false;
}

while (totalTurn < 9 && win == false) {

    printGameState(gameState);

    if (computerTurn == false) {
        gameState = getUserInput(gameState);
    }
    else {
        gameState = getComputerInput(gameState);
    }
    
    win = checkForWin(gameState);
    computerTurn = !computerTurn;
    totalTurn++;
}





function checkForWin(input){
    let xarray = [];
    let oarray = [];
    for(let i = 0; i < input.length; i++){
        if(input[i] == 'X'){
            xarray.push(i);
        } else if(input[i] == 'O'){
            oarray.push(i);
        }
    }
        let winarrays = [[0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]]
        for(let j = 0; j < winarrays.length; j++){
            if(winarrays[j].every(r => xarray.includes(r))){
                return true;
            }
            if(winarrays[j].every(r => oarray.includes(r))){
                return true;
            }
        }
        return false;
}

function checkForComputerWin(inputArray, whichTurn) {
    return -1; // todo implement it
}

function checkForTwo(inputArray, whichTurn){ //whichTurn is 'X' or 'O'
    let array = [];
    let array2 = [];
    for(let i = 0; i < inputArray.length; i++){
        if(inputArray[i] == whichTurn){
            array.push(i);
        } else if(inputArray[i] != whichTurn && inputArray[i] != '-'){
            array2.push(i);
        }
    }
        let winarrays = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let j = 0; j < winarrays.length; j++){
            let twoInARow = a1(array, winarrays[j]);
            if(twoInARow.length == 2){
                let checkPossible = winarrays[j].filter(x => !twoInARow.includes(x))[0];
                if(array2.contains(checkPossible)){
                    continue;
                }
                return winarrays[j].filter(x => !twoInARow.includes(x))
            }
        }
        return -1;
}
function a1(ar,ar1){
    x = new Set(ar)
    y = new Set(ar1)
    var result = [] 
    for (let i of x){
        if (y.has(i)){
            result.push(i)
        }
    }
    if (result){return result}
    else{ return 0}
}

function getComputerInput(gameState) {
    let turn = (totalTurn % 2 == 0) ? 'X' : 'O';
    let playerTurn = turn == 'X' ? 'O' : 'X';

    let canWin = checkForComputerWin(gameState, turn); // index where we can win
    if (canWin > -1) {
        gameState[canWin] = turn; 
        return gameState;
    }

    let playerCanWin = checkForComputerWin(gameState, playerTurn); // index to block where player can win
    if (playerCanWin > -1) {
        gameState[playerCanWin] = turn;
        return gameState;
    }

    let guessIndex = checkForTwo(gameState, turn);

    if (guessIndex > -1) {
        gameState[guessIndex] = turn; 
        return gameState;
    }

    // if we can't get two in a row then choose the middle, otherwise choose at random
    // TODO
    return gameState;
}

function getUserInput(gameState) {
    let validInput = false;

    while (validInput == false) {
        input = readline.question(`Input Your move (eg. A1, B2, etc) \n`);
        input = input.toLocaleUpperCase();

        let val = -1;
        if(input == 'A1'){
            val = 0;
        } else if(input == 'A2'){
            val = 3;
        } else if(input == 'A3'){
            val = 6;
        } else if(input == 'B1'){
            val = 1;
        } else if(input == 'B2'){
            val = 4;
        } else if(input == 'B3'){
            val = 7;
        } else if(input == 'C1'){
            val = 2;
        } else if(input == 'C2'){
            val = 5;
        } else if(input == 'C3'){
            val = 8;
        } else {
            console.log('idiot')
        }
        
        if (val > -1) {
            gameState[val] = (totalTurn % 2 == 0) ? 'X' : 'O';
            validInput = true;
        }
    }
    return gameState;
}

function printGameState(gameState) {
    console.log(`
    ${gameState[0]}|${gameState[1]}|${gameState[2]}
    ______
    ${gameState[3]}|${gameState[4]}|${gameState[5]}
    ______
    ${gameState[6]}|${gameState[7]}|${gameState[8]}\n
    ______________
    `);
}
