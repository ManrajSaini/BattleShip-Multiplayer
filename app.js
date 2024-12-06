const gamesboardContainer = document.querySelector('#gamesboard-container');
const optionsContainer = document.querySelector('.options-container');
const flipButton = document.querySelector('#flip-button');

let angle = 0;
function flipShips() {
    const optionShips = Array.from(optionsContainer.children);
    angle  = angle === 0 ? 90 : 0;
    optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`);
}

let width = 10;
function createGameBoard(color, user) {
    const gameBoardContainer = document.createElement('div');
    gameBoardContainer.classList.add('game-board');
    gamesboardContainer.style.backgroundColor = color;
    gameBoardContainer.id = user;

    for(let i=0; i<width*width; i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.id = i;
        gameBoardContainer.append(block);
    }

    gamesboardContainer.append(gameBoardContainer);
}

createGameBoard('red', 'player');
createGameBoard('blue', 'computer');

flipButton.addEventListener('click', flipShips);