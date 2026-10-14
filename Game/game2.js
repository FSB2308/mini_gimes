//<!-- الكود الثاني محسن -->
const cells = document.querySelectorAll('.cell')
const titleHeader = document.querySelector('#titleHeader')
const xPlayerDisplay = document.querySelector('#xPlayerDisplay')
const oPlayerDisplay = document.querySelector('#oPlayerDisplay')
const restartBtn = document.querySelector('#restartBtn')
const teamBtn = document.querySelector('#team')

// Initialize variables for the game
let player = 'X'
let isPauseGame = false
let isGameStart = false
let isVsComputer = true;

// Array of win conditions
const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '']

// Array of win conditions
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
]

// Add click event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index))
})

teamBtn.addEventListener('click', toggleGameMode);

function toggleGameMode() {
    isVsComputer = !isVsComputer; // تبديل الوضع
    teamBtn.textContent = isVsComputer ? 'Play vs Computer' : 'Play vs Human'; // تعديل النص في الزر
    resetGame();
}

function tapCell(cell, index) {
    // Ensure cell is empty and game isn't paused
    if (cell.textContent === '' && !isPauseGame) {
        isGameStart = true;
        updateCell(cell, index);

        // إذا لم يكن هناك فائز، تابع اللعبة
        if (!checkWinner()) {
            changePlayer();

            if (isVsComputer && player === 'O') {
                randomPick(); // إذا كان اللعب ضد الحاسوب
            }
        }
    }
}

function updateCell(cell, index) {
    cell.textContent = player
    inputCells[index] = player
    cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X'
}

function randomPick() {
    // Pause the game to allow Computer to pick
    isPauseGame = true

    setTimeout(() => {
        let randomIndex
        do {
            // Pick a random index
            randomIndex = Math.floor(Math.random() * inputCells.length)
        } while (
            // Ensure the chosen cell is empty
            inputCells[randomIndex] != ''
        )

        // Update the cell with Computer move
        updateCell(cells[randomIndex], randomIndex, player)
        // Check if Computer not won
        if (!checkWinner()) {
            changePlayer()
            // Swith back to Human player
            isPauseGame = false
            return
        }
        player = (player == 'X') ? 'O' : 'X'
    }, 1000) // Delay Computer move by 1 second
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
        // Check each winning condition
        if (inputCells[a] == player &&
            inputCells[b] == player &&
            inputCells[c] == player
        ) {
            declareWinner([a, b, c])
            return true
        }
    }
    
    // Check for a draw (if all cells are filled)
    if (inputCells.every(cell => cell != '')) {
        declareDraw()
        return true
    }
    return false;
}

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} Win`
    isPauseGame = true

    // Highlight winning cells
    winningIndices.forEach((index) =>
        cells[index].style.background = '#2A2343'
    )

    restartBtn.style.visibility = 'visible'
}

function declareDraw() {
    titleHeader.textContent = 'Draw!'
    isPauseGame = true
    restartBtn.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer) {
    // Ensure the game hasn't started
    if (!isGameStart) {
        // Override the selected player value
        player = selectedPlayer
        if (player == 'X') {
            // Hightlight X display
            xPlayerDisplay.classList.add('player-active')
            oPlayerDisplay.classList.remove('player-active')
        } else {
            // Hightlight O display
            xPlayerDisplay.classList.remove('player-active')
            oPlayerDisplay.classList.add('player-active')
        }
    }
}

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })
    isPauseGame = false
    isGameStart = false
    titleHeader.textContent = 'Choose'
})



// <!-- الكود الاول تنافس بشري -->
/*
let title = document.querySelector('.title');
let turn = "x";
let square = [];

function end(num1,num2,num3){
    title.innerHTML = `${square[num1]} winner`;
    document.getElementById('item'+num1).style.background = '#f72e5d';
    document.getElementById('item'+num2).style.background = '#f72e5d';
    document.getElementById('item'+num3).style.background = '#f72e5d';

    setInterval(function(){title.innerHTML +='.'},1000);
    setTimeout(function(){location.reload()},4000)

}

function winner(){
    for(let i = 1; i<10;i++){
        square[i] = document.getElementById('item' + i).innerHTML;
    }
     if (square[1] == square[2] && square[2] == square[3] && square[1] != '' ){
         end(1,2,3);
     } 
     else if (square[4]== square[5] && square[5]== square[6] && square[4] !=''){
        end(4,5,6);
     } 
     else if (square[7]== square[8] && square[8]== square[9] && square[7] !=''){
        end(7,8,9);
     } 


     else if (square[1]== square[4] && square[4]== square[7] && square[4] !=''){
        end(1,4,7);
     } 
     else if (square[2]== square[5] && square[5]== square[8] && square[2] !=''){
        end(2,5,8);
     } 
     else if (square[3]== square[6] && square[6]== square[9] && square[3] !=''){
        end(3,6,9);
     } 


     else if (square[1]== square[5] && square[5]== square[9] && square[1] !=''){
        end(1,5,9);
     } 
     else if (square[3]== square[5] && square[5]== square[7] && square[5] !=''){
        end(3,5,7);
     } 
}


function game(id){
 
    let element = document.getElementById(id);
    if(turn === 'x' && element.innerHTML==''){
        element.innerHTML= 'x';
        turn ='o';
        title.innerHTML = 'o';
    }
    else if (turn==='o' && element.innerHTML==''){
        element.innerHTML= 'o';
        turn ='x';
        title.innerHTML = 'x';
    } 
    
    winner();
    }
*/