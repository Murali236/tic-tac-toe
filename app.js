let player_1 = document.querySelector(`.player_1`);
let player_2 = document.querySelector(`.player_2`);
let selector = 0;
let gameOver=0;

let buttons = document.querySelectorAll('.button');

let size = Math.sqrt(buttons.length);

for(let i =0;i<size;i++){
    for(let j=0;j<size;j++){
        let index = i*size+j;
        buttons[index].value = `${i},${j}`;
        console.log(buttons[index].value);
    }
}

console.log(size);


function game_click(event){
    if(gameOver){
        return;
    }
    let btn=event.target;
    if(btn.innerText === ""){
        btn.innerText = btn_text();
        if(btn.innerText == "X"){
            btn.style.color = "red";
        }
        else{
            btn.style.color = "blue";
        }
        btn.setAttribute('disabled', 'true');
    }
    game_checker(btn);
}

function btn_text(){
    if(selector==0){
        selector = 1;
        player_2.style.backgroundColor = "yellow";
        player_1.style.backgroundColor = "greenyellow";
        return 'X';
    }
    else{
        player_1.style.backgroundColor = "yellow";
        player_2.style.backgroundColor = "greenyellow";
        selector = 0;
        return 'O';
    }
}

function game_checker(btn){
    let [row, col] = btn.value.split(",").map(Number);
    let count_dia = 0;
    let count_col = 0;
    let count_row = 0;
    let count_anti_dia = 0;
    if(row === col){
        for(let i=0;i<size;i++){
            if(btn.innerText===buttons[i*size+i].innerText && btn.innerText!=""){
                count_dia++;
            }
        }
    }
        for(let i=0;i<size;i++){
            if(btn.innerText===buttons[i*size+col].innerText&& btn.innerText!=""){
                count_col++;
            }
        }
        for(let j=0;j<size;j++){
            if(btn.innerText===buttons[row*size+j].innerText&& btn.innerText!=""){
                count_row++;
            }
        }
    if (row + col === size - 1) {
            for (let i = 0; i < size; i++) {
                if (btn.innerText === buttons[i * size + (size - 1 - i)].innerText && btn.innerText !== "") {
                    count_anti_dia++;
                }
            }
        }
    if(count_col==size||count_row==size||count_dia==size||count_anti_dia==size){
        display_winner(btn);
        gameOver = 1;
    }
}

function display_winner(btn){
    if(btn.innerText==='X'){
        setTimeout(()=>alert('Player-1 is the winner'), 1000);
        player_1.innerText = "Player-1 is the winner";
        player_1.style.width = '200px';
        player_1.style.height = "100px";
    }
    if(btn.innerText==='O'){
        setTimeout(()=>alert('Player-2 is the winner'), 1000);
        player_2.innerText = "Player-2 is the winner";
        player_2.style.width = '200px';
        player_2.style.height = "100px";
    }
    else{
        setTimeout(()=>alert('Draw'), 1000);
        player_2.innerText = "Draw";
        player_1.innerText = "Draw";
    }
    buttons.forEach(button=>{
        button.setAttribute('disabled', 'true');
    })
}

buttons.forEach(button=>{
    button.addEventListener('click',game_click);
})


