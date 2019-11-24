
var game;
function setup() {

    mazecanvas = createCanvas(windowWidth,windowHeight);

    game = new Game();
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
