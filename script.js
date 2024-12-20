const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function init(){
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box , index) =>{
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}



boxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    } )
});

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = 'X';
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    
}

function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" )
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

                if(gameGrid[position[0]] === "X")
                    answer = 'X';
                    
                else
                    answer = "O";
            

                boxes.forEach((box) =>{
                    box.style.pointerEvents = "none";
                })


                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    //we have a winner  
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        // console.log(answer);
        newGameBtn.classList.add("active");
        return;
    }

    //if match is tied
    let gridCount = 0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            gridCount++;
        }
    });

    if(gridCount === 9){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index] === "" ){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;   
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

newGameBtn.addEventListener("click", init)

init();