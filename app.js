const gamesboardContainer = document.querySelector("#gamesboard-container");
const optionsContainer = document.querySelector(".options-container");
const flipButton = document.querySelector("#flip-button");

// options choosing
let angle = 0;
function flipShips() {
  const optionShips = Array.from(optionsContainer.children);
  angle = angle === 0 ? 90 : 0;
  optionShips.forEach(
    (optionShip) => (optionShip.style.transform = `rotate(${angle}deg)`)
  );
}

flipButton.addEventListener("click", flipShips);

// creating game board
let width = 10;
function createGameBoard(color, user) {
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.classList.add("game-board");
  gamesboardContainer.style.backgroundColor = color;
  gameBoardContainer.id = user;

  for (let i = 0; i < width * width; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.id = i;
    gameBoardContainer.append(block);
  }

  gamesboardContainer.append(gameBoardContainer);
}

createGameBoard("red", "player");
createGameBoard("blue", "computer");

// creating ships
class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}

const destroyer = new Ship("destroyer", 2);
const submarine = new Ship("submarine", 3);
const cruiser = new Ship("cruiser", 3);
const battleship = new Ship("battleship", 4);
const carrier = new Ship("carrier", 5);

const ships = [destroyer, submarine, cruiser, battleship, carrier];

function addShipPiece(ship) {
  const allBoardBlocks = document.querySelectorAll("#computer div");
  let isHorizontal = Math.random() < 0.5; // randomly choose horizontal or vertical
  const randomStartIndex = Math.floor(Math.random() * width * width); // random starting index

  const shipLength = ship.length;

  let validStartIndex;
  if (isHorizontal) {
    const startIndexBtwWidth = randomStartIndex % width;
    validStartIndex =
      startIndexBtwWidth + shipLength < width
        ? randomStartIndex
        : randomStartIndex - (width - (startIndexBtwWidth + shipLength));
  } else {
    validStartIndex =
      randomStartIndex + shipLength * width < width * width
        ? randomStartIndex
        : randomStartIndex - (width * width - shipLength * width);
  }

  let shipBlocks = [];

  for (let i = 0; i < ship.length; i++) {
    if (isHorizontal) {
      shipBlocks.push(allBoardBlocks[Number(validStartIndex) + i]);
    } else {
      shipBlocks.push(allBoardBlocks[Number(validStartIndex) + i * width]);
    }
  }

  if (shipBlocks.some((block) => block.classList.contains("taken"))) {
    return addShipPiece(ship);
  }

  shipBlocks.forEach((shipBlock) => {
    shipBlock.classList.add(ship.name);
    shipBlock.classList.add("taken");
  });
}

ships.forEach((ship) => addShipPiece(ship));
