const selectBox = document.querySelector(".select-box"),
  selectXBtn = selectBox.querySelector(".playerX"),
  selectOBtn = selectBox.querySelector(".playerO");
const playBoard = document.querySelector(".player-board");
const allBoxes = document.querySelectorAll("section span");
const playerTurn = document.querySelector(".players");
const resultBox = document.querySelector(".final-result"),
  wonText = resultBox.querySelector(".win-text"),
  replayBtn = resultBox.querySelector(".replay-btn");

window.onload = () => {
  for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].setAttribute("onclick", "clickedBox(this)");
  }
  selectXBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
  };
  selectOBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    playerTurn.setAttribute("class", "players active player");
  };
};

let playerXIcon = "fa-solid fa-xmark";
let playerOIcon = "fa-regular fa-circle";
let playerSign = "X";
let runBot = true;

function clickedBox(element) {
  if (playerTurn.classList.contains("player")) {
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    playerTurn.classList.add("active");
    playerSign = "O";
    element.setAttribute("id", playerSign);
  } else {
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    playerTurn.classList.add("active");
    playerSign = "X";
    element.setAttribute("id", playerSign);
  }
  selectWinner();
  playBoard.style.pointerEvents = "none";
  element.style.pointerEvents = "none";
  let randomDelayTime = (Math.random() * 1000 + 300).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, randomDelayTime);
}

function bot(runBot) {
  if (runBot) {
    playerSign = "O";
    let array = [];
    for (let i = 0; i < allBoxes.length; i++) {
      if (allBoxes[i].childElementCount == 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (playerTurn.classList.contains("player")) {
        allBoxes[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        playerTurn.classList.remove("active");
        playerSign = "X";
        allBoxes[randomBox].setAttribute("id", playerSign);
      } else {
        allBoxes[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        playerTurn.classList.remove("active");
        allBoxes[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
    }
    allBoxes[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
  }
}

function getClass(idname) {
  return document.querySelector(".box" + idname).id;
}

function checkClass(val1, val2, val3, sign) {
  if (
    getClass(val1) == sign &&
    getClass(val2) == sign &&
    getClass(val3) == sign
  ) {
    return true;
  }
}

function selectWinner() {
  if (
    checkClass(1, 2, 3, playerSign) ||
    checkClass(4, 5, 6, playerSign) ||
    checkClass(7, 8, 9, playerSign) ||
    checkClass(1, 4, 7, playerSign) ||
    checkClass(2, 5, 8, playerSign) ||
    checkClass(3, 6, 9, playerSign) ||
    checkClass(1, 5, 9, playerSign) ||
    checkClass(3, 5, 7, playerSign)
  ) {
    console.log(playerSign + " " + "is the winner");
    runBot = false;
    bot(runBot);
    setTimeout(() => {
      playBoard.classList.remove("show");
      resultBox.classList.add("show");
    }, 700);
    wonText.innerHTML = `Player <p>${playerSign}</p>won!!`;
  }
}
replayBtn.onclick = () => {
  window.location.reload();
};
