let boxes = document.querySelectorAll('.box')
const reset = document.querySelectorAll('.reset')[0]
const info = document.querySelectorAll('.info')[0]
const winGif = document.querySelector('.win-gif')
const clickAud = new Audio('./ting.mp3')
const music = new Audio('./music.mp3')
const gameOver = new Audio('./gameover.mp3')


// fucntions ====================================================================================================

// to reset the game
function resetGame () {
    for(let i = 0; i < boxes.length; i++) {
        clickAud.play()
        boxes[i].innerHTML = '';
        boxes[i].setAttribute('value', '');
        boxes[i].classList.remove('win-bar', 'box-disable')
        music.pause()
        winGif.style = `visibility: hidden`
        info.innerHTML = 'Turn of X'
        reset.style = `display: none;`
    }
}

// here is the code of wining contestent
let winArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
function winPosition() {
    for(let i = 0; i < winArray.length; i++) {

        // when 0 wins the game
        let zeroWin =  winArray[i].every(ele => boxes[ele].innerText == '0')
        if(zeroWin == true) {
            info.innerHTML = '0 Won The Game'
            boxes.forEach(ele => {
                ele.classList.add('box-disable')
            })
            boxes[lastPosition].classList.remove('last-position')
            winArray[i].forEach(ele => boxes[ele].classList.add('win-bar'))
            winGif.style = `visibility: visible`
            reset.style = `display: inline;`
            music.play()
        }

        // when X wins the game
        let xWin =  winArray[i].every(ele => boxes[ele].innerText == 'X')
        if(xWin == true) {
            info.innerHTML = 'X Won The Game'
            boxes.forEach(ele => {
                ele.classList.add('box-disable')
            })
            boxes[lastPosition].classList.remove('last-position')
            winArray[i].forEach(ele => boxes[ele].classList.add('win-bar'))
            winGif.style = `visibility: visible`
            reset.style = `display: inline;`
            music.play()
        }
    }
}
// ==============================================================================================================

let turn = 1;
let lastPosition;
for (let i = 0; i < boxes.length; i++) {

    // here is the code of playing game
    boxes[i].addEventListener('click', () => {
        if (turn == 1 && boxes[i].getAttribute('value') != 'filled') {
            clickAud.play()
            boxes[i].innerHTML = 'X'
            try {
                boxes[lastPosition].classList.remove('last-position')
            }catch (err) {
                console.log(err)
            }
            boxes[i].classList.add('last-position')
            boxes[i].setAttribute('value', 'filled')
            info.innerHTML = 'Turn of 0'
            lastPosition = i;
            turn = 0;
        } else if (turn == 0 && boxes[i].getAttribute('value') != 'filled') {
            clickAud.play()
            boxes[i].innerHTML = '0'
            try {
                boxes[lastPosition].classList.remove('last-position')
            }catch (err) {
                console.log(err)
            }
            boxes[i].classList.add('last-position')
            boxes[i].setAttribute('value', 'filled')
            info.innerHTML = 'Turn of X'
            lastPosition = i;
            turn = 1;
        }   

        // checking weather someone win or not
        winPosition();

        // if all positions are filled ()
        let arr = Array.from(boxes)
        let position = arr.every(ele => ele.getAttribute('value') == 'filled')
        if(position == true) {
            setTimeout(() => {
                gameOver.play()
            }, 300);
            reset.style = `display: inline;`
            info.innerHTML = 'Nobody won the game'
            boxes[lastPosition].classList.remove('last-position')
        }
    })
}

reset.addEventListener('click', () => {
    resetGame();
})

