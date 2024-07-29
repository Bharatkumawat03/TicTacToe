const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let curruntPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function initGame(){
    curruntPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove('win');
    });
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Currunt Player - ${curruntPlayer}`;
}

initGame();

function swapTurn(){
    if(curruntPlayer === 'X'){
        curruntPlayer = 'O';
    }
    else{
        curruntPlayer = "X";
    }
    gameInfo.innerText = `Currunt Player - ${curruntPlayer}`; 
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer !== ""){
        gameInfo.innerText = `Winner - ${answer}`;
        newGameBtn.classList.add("active");
        return ;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    })
    if(fillCount === 9){
        gameInfo.innerHTML ="Game Tied !!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = curruntPlayer;
        gameGrid[index] = curruntPlayer;
        boxes[index].style.pointerEvents = "none";

        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);
