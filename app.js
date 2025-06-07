let boxes = document.querySelectorAll (".box");
let resetBtn = document.querySelector ("#reset-btn");

let newGameBtn = document.querySelector ("#new-btn");
let msgContainer = document.querySelector (".msg-container");
let msg = document.querySelector ("#msg");

let turnO = true;   // playerX , playerO  // player k clickable act - wheather X aaye || O aaye
let count = 0;  
//2-D array build for Winning-patterns implement  -- array m array--> [ [" "] , [" "] , [" "] , [" "] , [" "] ]

const winPatterns = [
   [ 0,1,2],
   [ 0,3,6],
   [ 0,4,8],
   [ 1,4,7],
   [ 2,5,8],
   [ 2,4,6],
   [ 3,4,5],
   [ 6,7,8],
];  

boxes.forEach( (box) => {
     box.addEventListener("click" , () => {
        // console.log ("box was clicked");
       
        if(turnO) {     //if, playerO turn
            box.innerText = "O";
            turnO = false;                                  //now, playerX turn comes,
        } else {       // if, playerX turn
            box.innerText = "X";
            turnO = true;                                  //now, playerO turn come
        }           
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }   

        // checkWinner();
     });

});


const gameDraw = () => {
    msg.innerText= `Game was a Draw. Try again!`;
    msgContainer.classList.remove ("hide");
    disabledBoxes();
};


const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};


const showWinner = (winner) => {
    msg.innerText = `Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide"); 

    disabledBoxes();     
};   

const checkWinner = () => {                                                   //giving LOOP to winPatters to check for all "8 patterns" with each "positions--pos1,pos2,pos3" if winning or not
      for (let pattern of winPatterns) {
        // console.log(pattern[0] , pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText ,
        //             boxes[pattern[1]].innerText ,
        //             boxes[pattern[2]].innerText );
                
                let pos1val =  boxes[pattern[0]].innerText;
                let pos2val =  boxes[pattern[1]].innerText;
                let pos3val =  boxes[pattern[2]].innerText;

                if ( pos1val != "" && pos2val != "" && pos3val != "") {
                    if (pos1val === pos2val && pos2val === pos3val) {
                    // console.log("Winner" , pos1val);

                    showWinner(pos1val);
                    }
                }
      }
};      


const enabledBoxes = () => {
    for (let box of boxes) {
        box.enabled = false;
        box.innerText="";
    }
};

const resetGame = () => {
    turnO = true;
    count=0;
    enabledBoxes();
    msgContainer.classList.add ("hide");
};  

newGameBtn.addEventListener ("click" , resetGame);
resetBtn.addEventListener ("click" , resetGame);
