let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO=true;//playerX , playerO
const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");

    if (turnO) {
      box.innerText = "O";
      box.classList.add("o-style"); // add red style
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("x-style"); // add green style
      turnO = true;
    }

    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const showWinner=(winner)=>{
    msg.innerText=`congratulations🎉, winner is ${winner}✨`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("winner", pos1val);
        showWinner(pos1val);
        return; // ✅ Stop further checking if winner found
      }
    }
  }

  // ✅ If no winner found, check for draw
  checkDraw();
};

    // Enable all boxes and clear them
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
      box.classList.remove("o-style", "x-style");
  }
};

// Reset game state
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Event listeners for buttons
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const checkDraw = () => {
  let isDraw = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }
  if (isDraw) {
    msg.innerText = "It's a Draw! 🤝";
    msgContainer.classList.remove("hide");
  }
};
