// const box = document.getElementsByClassName('box');
// console.log(box);  //HTMLCollection

// spaces is an array with separate instance using class based architeture

//Converting HTMLCollection to Array
const boxes = Array.from(document.getElementsByClassName('box'));
const boxes0 = Array.from(document.getElementsByClassName('box0'));
const boxes1 = Array.from(document.getElementsByClassName('box1'));
const boxes2 = Array.from(document.getElementsByClassName('box2'));
const boxes3 = Array.from(document.getElementsByClassName('box3'));
const boxes4 = Array.from(document.getElementsByClassName('box4'));
const boxes5 = Array.from(document.getElementsByClassName('box5'));
const boxes6 = Array.from(document.getElementsByClassName('box6'));
const boxes7 = Array.from(document.getElementsByClassName('box7'));
const boxes8 = Array.from(document.getElementsByClassName('box8'));


// const playText = document.getElementById('playText')
const restartBtn = document.getElementById('restartBtn')
let spaces = [[], [], [], [], [], [], [], [], []];
let winner = [];
// const spaces = [null, null, null, null, null, null,null, null, null]
const O_TEXT = "O"
const X_TEXT = "X"
let count = 0
let currentPlayer;
// let currentPlayer = O_TEXT

// console.log(boxes);


const drawBoard = (boxArray, isBigBox) => {
    boxArray.forEach((box, index) => {
        let styleString = '';
        if (index < 3) {
            isBigBox ? styleString += `border-bottom: 3px solid var(--purple);` : styleString += `border-bottom: 3px solid #fff;`;
        }
        if (index % 3 === 0) {
            isBigBox ? styleString += `border-right: 3px solid var(--purple);` : styleString += `border-right: 3px solid #fff;`;
        }
        if (index % 3 === 2) {
            isBigBox ? styleString += `border-left: 3px solid var(--purple);` : styleString += `border-left: 3px solid #fff;`;
        }
        if (index > 5) {
            isBigBox ? styleString += `border-top: 3px solid var(--purple);` : styleString += `border-top: 3px solid #fff;`;
        }
        box.style = styleString

        if (!isBigBox) box.addEventListener('click', boxClicked);
    })
}

const boxClicked = (e) => {
    // console.log('box clicked');
    const id = e.target.id.split(".")
    const bigBox = id[0];
    const smallBox = id[1];
    // console.log(id);
    if (!spaces[bigBox][smallBox]) {
        spaces[bigBox][smallBox] = currentPlayer
        e.target.innerText = currentPlayer;
        if (hasSpace(spaces[smallBox])) {
            blockFields(boxes, smallBox);
        }


        if (!winner[bigBox]) {


            if (playerHasWonBox(spaces[bigBox])) {
                winner[bigBox] = currentPlayer;
                count++;




                if (playerHasWonBox(winner)) {
                    playText.innerText = `${currentPlayer} has Won!`
                    return;
                }
                // console.log(count);
                // Logic for draw condition
                if (count === 9) {
                    playText.innerText = `Draw`
                }

            }
        }
        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    };
}
const hasSpace = (array) => {
    for (let i = 0; i < 9; i++) {
        if (array[i] !== 'X' && array[i] !== 'O') {
            return true;
        }
    }
}
const blockFields = (fields, notToBlock) => {
    fields.forEach((field, indx) => {

        if (indx == notToBlock) {
            field.classList.remove("disabled");
        } else {
            field.classList.add("disabled");
        };
    })


};

const playerHasWonBox = (box) => {
    if (box[0] === currentPlayer) {
        if (box[1] === currentPlayer && box[2] === currentPlayer) {
            console.log(`${currentPlayer} wins up top.`);
            return true;
        }
        if (box[3] === currentPlayer && box[6] === currentPlayer) {
            console.log(`${currentPlayer} wins on left.`);
            return true;
        }
        if (box[4] === currentPlayer && box[8] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally.`);
            return true;
        }
    }
    if (box[8] === currentPlayer) {
        if (box[2] === currentPlayer && box[5] === currentPlayer) {
            console.log(`${currentPlayer} wins on the right.`);
            return true;
        }
        if (box[6] === currentPlayer && box[7] === currentPlayer) {
            console.log(`${currentPlayer} wins on bottom.`);
            return true;
        }

    }
    if (box[4] === currentPlayer) {
        if (box[1] === currentPlayer && box[7] === currentPlayer) {
            console.log(`${currentPlayer} wins vertically in middle`);
            return true;
        }
        if (box[3] === currentPlayer && box[5] === currentPlayer) {
            console.log(`${currentPlayer} wins horizantally in middle`);
            return true;
        }
    }

}




const restart = () => {

    spaces = [[], [], [], [], [], [], [], [], []];
    count = 0;
    winner = [];
    boxes.forEach((box) => {
        box.classList.remove("disabled");
    })
    resetBoxes(boxes0);
    resetBoxes(boxes1);
    resetBoxes(boxes2);
    resetBoxes(boxes3);
    resetBoxes(boxes4);
    resetBoxes(boxes5);
    resetBoxes(boxes6);
    resetBoxes(boxes7);
    resetBoxes(boxes8);

    playText.innerText = `Let's Play!`
    currentPlayer = O_TEXT
}
restartBtn.addEventListener('click', restart);
const resetBoxes = (boxesToReset) => {
    boxesToReset.forEach(box => {
        box.innerText = '';
    })
}
restart();

// Drawing of board
drawBoard(boxes, true);
drawBoard(boxes0);
drawBoard(boxes1);
drawBoard(boxes2);
drawBoard(boxes3);
drawBoard(boxes4);
drawBoard(boxes5);
drawBoard(boxes6);
drawBoard(boxes7);
drawBoard(boxes8);
