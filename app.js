var game;
let coinimg, groundimg;
let start_x, start_y;


function preload(){
    coinimg = loadImage('img/coin.png');
    groundimg = loadImage('img/ground.jpg');
}

function setup() {
    game = new Game(0,0,false)
    mazecanvas = createCanvas((cols*3)*20,(rows*3)*20);
    mazecanvas.parent('sketch');
    frameRate(20);

}


function LaunchGame(){
    start_x = floor(random(0,rows));
    start_y = floor(random(0,cols));
    game = new Game(start_x,start_y,true);
    $('#newgame').hide();
    $('.light').hide();
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
