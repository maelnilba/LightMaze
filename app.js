
var game;
function setup() {

    mazecanvas = createCanvas(windowWidth,windowHeight);

    game = new Game();
    frameRate(20);

}



function draw(){
background('rgba(255,255,255,0.5)');
   game.run();
   game.draw();


   
}






// ------------------------------------------------



// ------------------------------------------------
