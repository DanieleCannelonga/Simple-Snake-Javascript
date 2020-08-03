const fir = document.getElementById("snake");
const sec = fir.getContext("2d");

// creo la box iniziale
const box = 32;

// creo le variabili dei file img
const sfondo = new Image();
const foodImg = new Image();

// associo alle variabili gli src dei file
sfondo.src = "img/sfondo.png";
foodImg.src = "img/mela.png";

// creo le variabili dei file audio
let muore = new Audio();
let mangia = new Audio();
let su = new Audio();
let giu = new Audio();
let destra = new Audio();
let sinistra = new Audio();

// associo alle variabili gli src dei file
muore.src = "audio/muore.mp3";
mangia.src = "audio/mangia.mp3";
su.src = "audio/su.mp3";
giu.src = "audio/giu.mp3";
destra.src = "audio/destra.mp3";
sinistra.src = "audio/sinistra.mp3";

// creo il serpente
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// creo il cibo e lo setto random
let mela = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// creo le variabili per il punteggio e per lo snake
let score = 0;
let d;

// rimango in ascolto dei tasti premuti per la direzione
document.addEventListener("keydown",direction);

// inizio la funzione per il controllo dello snake
function direction(event){
    let key = event.keyCode;
    // il pulsante 37 in ASCII corrisponde alla freccetta sinistra
    // inoltre controllo se lo snake è direzionato verso destra perchè non può andare nella direzione opposta
    if( key == 37 && d != "DESTRA"){
        sinistra.play();
        d = "SINISTRA";
        // il pulsante 38 in ASCII corrisponde alla freccetta su
        // inoltre controllo se lo snake è direzionato verso giu perchè non può andare nella direzione opposta
    }else if(key == 38 && d != "GIU"){
        d = "SU";
        su.play();
        // il pulsante 39 in ASCII corrisponde alla freccetta destra
        // inoltre controllo se lo snake è direzionato verso sinistra perchè non può andare nella direzione opposta
    }else if(key == 39 && d != "SINISTRA"){
        d = "DESTRA";
        destra.play();
        // il pulsante 40 in ASCII corrisponde alla freccetta giù
        // inoltre controllo se lo snake è direzionato verso su perchè non può andare nella direzione opposta
    }else if(key == 40 && d != "SU"){
        d = "GIU";
        giu.play();
    }
}

// controllo se il serpente sbatte
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// diamo lo stile allo snake
function draw(){
    sec.drawImage(sfondo,0,0);
    
    // testa e corpo dello snake
    for( let i = 0; i < snake.length ; i++){
        sec.fillStyle = ( i == 0 )? "grey" : "pink";
        sec.fillRect(snake[i].x,snake[i].y,box,box);

        // bordi dello snake (sia testa che corpo)
        sec.strokeStyle = "yellow";
        sec.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    sec.drawImage(foodImg, mela.x, mela.y);
    
    // posizione precedente
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // controlliamo il cambio posizione
    if( d == "SU") snakeY -= box;
    if( d == "GIU") snakeY += box;
    if( d == "DESTRA") snakeX += box;
    if( d == "SINISTRA") snakeX -= box;
    
    // quando lo snake mangia la mela
    if(snakeX == mela.x && snakeY == mela.y){
        score++;
        mangia.play();
        mela = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        snake.pop();
    }
    
    // creiamo la nuova posizione
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over quando lo snake colpisce i lati o se stesso
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        muore.play();
    }
    
    snake.unshift(newHead);
    sec.fillStyle = "white";
    sec.font = "45px Changa one";
    sec.fillText(score,2*box,1.6*box);
}

// chiamata a game ogni 100 ms
let game = setInterval(draw,100);