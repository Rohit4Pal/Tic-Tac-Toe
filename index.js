let gameOver = false;
let winner = -1;
let turn = 1;
let n = 3;
let gameIsOn = false;

//create a n*n matrix
let matrix = new Array(n);
for (let i = 0; i < n; i++) {
  matrix[i] = new Array(n);
  for (let j = 0; j < n; j++) {
    matrix[i][j] = "";
  }
}

const startGame = () => {
  //only one time
  if (!gameIsOn) gameIsOn = true;
  else return;

  createBoard();

  /*  if (gameOver) {
    if (winner === 1) console.log(`${player1} wins`);
    else if (winner === 2) console.log(`${player2} wins`);
    else console.log("Match Draw");
}*/
};

function createBoard() {
  let board = document.querySelector(".game-container");

  for (let i = 0; i < n; i++) {
    let row = document.createElement("div");
    board.appendChild(row);
    row.classList.add("row");
    for (let j = 0; j < n; j++) {
      let col = document.createElement("div");
      col.classList.add("col");
      row.appendChild(col);
      //addStyle();
    }
  }
  //console.log(board);
  addStyle();
  //board.style.backgroundColor="yellow";
}

const addStyle = () => {
  let rows = document.querySelectorAll(".row");
  for (let i = 0; i < rows.length; i++) {
    rows[i].style.flexDirection = "row";
    rows[i].style.display = "flex";
  }

  let cols = document.querySelectorAll(".col");
  for (let i = 0; i < cols.length; i++) {
    cols[i].style.width = "50px";
    cols[i].style.height = "50px";
    cols[i].style.border = "1px solid black";
    cols[i].style.borderRadius = "5px";
    cols[i].style.backgroundColor = "pink";
  }

  let k = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let index = i + "" + j;
      cols[k].classList.add(`${index}`);
      cols[k].addEventListener("click", doWork);
      k++;
    }
  }
};

//players.push(player1.value);
//players.push(player2.value);
function doWork() {
  //once game is over no clicking should work
  if (gameOver) return;

  if (this.innerHTML === "") {
    if ((turn & 1) === 1) this.innerHTML = "X";
    else this.innerHTML = "O";
    turn++;
  }
  //console.log(e.classList.value);

  let i = this.classList.value.slice(4, 5);
  let j = this.classList.value.slice(5);

  matrix[i][j] = this.innerHTML;
  //console.log(matrix);
  checkWinner();

  let player1 = document.getElementById("p1").value;
  let player2 = document.getElementById("p2").value;
  let players = [player1, player2];
  //console.log(player1);

  if (gameOver === true && winner > 0) {
    let p = players[winner - 1];
    document.getElementById("output").innerHTML = `${p} wins`;
  }
}

const checkWinner = () => {
  //left diagonal
  leftDiagonal();

  if (gameOver === true) return;
  //right diagonal
  rightDiagonal();

  if (gameOver === true) return;
  //row wise checking
  rowCheck();

  if (gameOver === true) return;
  //col wise checking
  colCheck();

  //check for draw
  if (gameOver === false) {
    gmaeDraw();
  }
};
function rowCheck() {
  //console.log("checking row");
  //gameOver = true;
  let flag = 0;
  for (let i = 0; i < n; i++) {
    flag = 0;
    let val = matrix[i][0];

    if (val === "X") winner = 1;
    else if (val === "O") winner = 2;
    else continue;

    for (let j = 0; j < n; j++) {
      if (matrix[i][j] !== val || matrix[i][i] === "") {
        flag = 1;
        break;
      }
    }

    if (flag === 0) {
      gameOver = true;
      return;
    }
  }
}
function colCheck() {
  //console.log("checking col");
  //gameOver = true;
  let flag = 0;
  for (let i = 0; i < n; i++) {
    flag = 0;
    let val = matrix[0][i];

    if (val === "X") winner = 1;
    else if (val === "O") winner = 2;
    else continue;

    for (let j = 0; j < n; j++) {
      if (matrix[j][i] !== val || matrix[i][i] === "") {
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      gameOver = true;
      return;
    }
  }
}
function rightDiagonal() {
  //console.log("checking right diagonal");
  //gameOver = true;
  let val = matrix[n - 1][0];

  if (val === "X") winner = 1;
  else if (val === "O") winner = 2;
  else return;

  let j = 1;
  for (let i = n - 2; i >= 0; i--, j++) {
    if (matrix[i][j] !== val || matrix[i][j] === "") {
      return;
    }
  }

  gameOver = true;
}
function leftDiagonal() {
  //console.log("checking left diagonal");
  //gameOver = true;
  let val = matrix[0][0];

  if (val === "X") winner = 1;
  else if (val === "O") winner = 2;
  else return;

  for (let i = 1; i < n; i++) {
    if (matrix[i][i] !== val || matrix[i][i] === "") {
      return;
    }
  }

  gameOver = true;
}
function gmaeDraw() {
  //gameOver = true;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === "") {
        //continue gaming
        return;
      }
    }
  }
  gameIsOn = true;
}
