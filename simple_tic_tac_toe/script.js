// const box = document.getElementsByClassName('box');
// console.log(box);  //HTMLCollection

//Converting HTMLCollection to Array
const boxes = Array.from(document.getElementsByClassName('box'))
const playText = document.getElementById('playText')
const restartBtn = document.getElementById('restartBtn')
let spaces = [];
// const spaces = [null, null, null, null, null, null,null, null, null]
const O_TEXT = "O"
const X_TEXT = "X"
let count = 0
let currentPlayer; 
// let currentPlayer = O_TEXT

console.log(boxes);


const drawBoard = ()=>{
    boxes.forEach((box,index)=>{
        let styleString = '';
        if(index < 3){
            styleString += `border-bottom: 3px solid var(--purple);`;
        }
        if(index%3===0){
            styleString += `border-right: 3px solid var(--purple);`;
        }
        if (index % 3 === 2) {
            styleString += `border-left: 3px solid var(--purple);`;
        }
        if (index > 5) {
            styleString += `border-top: 3px solid var(--purple);`;
        }
        box.style = styleString

        box.addEventListener('click',boxClicked)
    })
}

const boxClicked = (e)=>{
    // console.log('box clicked');
    const id = e.target.id;
    // console.log(id);
    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        count++;
        if(playerHasWon()){
            
            playText.innerText = `${currentPlayer} has Won!`
            return;
        }
        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT
        console.log(count);
        if(count === 9){
            playText.innerText = `Draw`
        }
        
    }
}

const  playerHasWon = ()=>{
    if(spaces[0] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
            console.log(`${currentPlayer} wins up top.`);
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins on left.`);
            return true;
        }
        if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally.`);
            return true;
        }
    }
    if (spaces[8] === currentPlayer) {
        if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins on the right.`);
            return true;
        }
        if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins on bottom.`);
            return true;
        }
        
    }
    if(spaces[4] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
            console.log(`${currentPlayer} wins vertically in middle`);
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins horizantally in middle`);
            return true;
        }
    }
    
}

// restartBtn.addEventListener('click', ()=>{
//     spaces.forEach((space,index)=>{
//         space[index] = null;
//     })
//     boxes.forEach(box=>{
//         box.innerText = '';
//     })
//     playText.innerText = `Let's Play!`
//     currentPlayer = O_TEXT
// })


const restart = ()=>{
    // spaces.forEach((space, index) => {
    //     spaces[index] = null;
    // })
    spaces = [];
    count = 0;
    boxes.forEach(box => {
        box.innerText = '';
    })
    playText.innerText = `Let's Play!`
    currentPlayer = O_TEXT
}
restartBtn.addEventListener('click',restart)
restart();
drawBoard();