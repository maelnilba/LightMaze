var game;
let coinimg, groundimg;
let start_x, start_y;


function preload(){
    coinimg = loadImage('img/coin.png');
    groundimg = loadImage('img/ground.jpg');
}

function setup() {
    start_x = floor(random(0,rows));
    start_y = floor(random(0,cols));

    mazecanvas = createCanvas((cols*3)*20,(rows*3)*20);
    mazecanvas.parent('sketch');

    game = new Game(start_x,start_y);
    frameRate(20);

}



function draw(){
background('rgba(0,0,0,0.5)');
   
if (game.running){
        game.draw();
        game.run();
}



   
}






// ------------------------------------------------



// ------------------------------------------------
