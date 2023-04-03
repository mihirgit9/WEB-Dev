const gameInfo=document.querySelector(".gameInfo");
const boxes=document.querySelectorAll(".box");
const newGame=document.querySelector(".btn");

let currentPlayer;
const gameGrid=["", "", "", "", "", "", "", "", ""];
const winningPos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


function gameInit(){
    currentPlayer="X";
    gameInfo.innerHTML="Current Player- "+ currentPlayer;
    boxes.forEach((box, index)=>{
        box.innerHTML="";
        box.classList.remove("win");
        gameGrid[index]="";
        box.style.pointerEvents="all";
    });
    newGame.classList.remove("active");
}
gameInit();

boxes.forEach((box, index)=>{
    box.addEventListener("click", ()=>{
        if(!box.innerHTML){
            handleBoxClick(index);
        }
    })
});

function handleBoxClick(index){
    boxes[index].innerHTML=currentPlayer;
    boxes[index].style.pointerEvents="none";
    gameGrid[index]=currentPlayer;
    switchPlayer();
    checkGameOver();
}

function switchPlayer(){
    if(currentPlayer==="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerHTML="Current Player- " + currentPlayer;
}

function checkGameOver(){
    // Either Win

    winningPos.forEach(position=>{
        let winner="";
        if((gameGrid[position[0]]!="" && gameGrid[position[1]]!="" && gameGrid[position[2]]!="") &&
        (gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])){
            if(gameGrid[position[0]]==="X"){
                winner="X";
            }
            else{
                winner="0";
            }
            gameInfo.innerHTML=`Winner- ${winner}`;
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            boxes.forEach(box=>{
                box.style.pointerEvents="none";
            })
            newGame.classList.add("active");
            return;
        }
    });

    // Or Tie

    checkTie();
}

function checkTie(){
   let i=0;
   while(i<gameGrid.length){
    if(!gameGrid[i]){
        return;
    }
    if(i==8){
        gameInfo.innerHTML="Match Tie";
        newGame.classList.add("active");
    }
    i++;
   }
}

newGame.addEventListener("click", gameInit);