let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function changePlayer(clickedCellIndex){
    if (gameBoard[clickedCellIndex] !== '' || !gameActive){
        return;
    }
    gameBoard[clickedCellIndex] = currentPlayer;
    checkScore();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', cellClicked, false);
});

function cellClicked(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', ''))-1;
    if (gameBoard[clickedCellIndex] !== '' || !gameActive){
        return;
    }
    changePlayer(clickedCellIndex);
    updateUI();
}

function updateUI(){
    for(let i = 0; i < cells.length; i++){
        cells[i].innerText = gameBoard[i];
    }
}

const winCondtions = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
]

function checkScore(){
    let roundWon = false;
    for(let i = 0; i < winCondtions.length; i++){
        const [a, b, c] = winCondtions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        announceWinner(currentPlayer);
        gameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw){
        announceDraw();
        gameActive = false;
        return;
    }
}

function announceWinner(player){
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Player ${player} Wins!`;
}

function announceDraw(player){
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = 'Game Draw!';
}


function resetGame(){
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
    });
    document.getElementById('gameMessage').innerText = '';
}

const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', resetGame, false);