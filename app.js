var game;
let coinimg;
let start_x, start_y;
let high_score = 0;
let moleimg = [];
let groundimg = [];


function preload(){
    coinimg = loadImage('img/coin.png');
    groundimg = loadImage('img/ground.jpg');
    moleimg[0] = loadImage('img/mole2.png');
    moleimg[1] = loadImage('img/mole1.png');
    for (let i = 0; i < 18;i++){
        groundimg[i] = loadImage('img/ground'+i+'.png');
    }
}

function setup() {
    holdgame =  new Game(0,0,true,true);
    game =  new Game(0,0,false,false);
    mazecanvas = createCanvas((cols*3)*20,(rows*3)*20);
    mazecanvas.parent('sketch');
    score = createP();
    score.parent('score');
    highscore = createP();
    highscore.parent('score');
    show_score = createP();
    show_score.parent('show_score');
    frameRate(20);

}


function draw(){
background('rgba(0,0,0,0.5)');
   
if (game.running){
        game.draw();
        game.run();
        show_score.html("Score : " +game.score); 

        
} else {
    holdgame.draw();
}

high_score = Highscored(game.score,high_score);
score.html("Your score is : " + game.score);
highscore.html("Your highscore is : " + high_score);

   
}



function LaunchGame(){
    start_x = floor(random(0,rows));
    start_y = floor(random(0,cols));
    game = new Game(start_x,start_y,true);
    $('#newgame').hide();
    $('.light').hide();
    $('#bgimg').hide();
    $('#show_score').show();
    // $('#body').css('background','#693b2a');

}



function Highscored(act_score,act_highscore){
    if (act_score > act_highscore){
        return act_score;
    } else {
        return act_highscore;
    }
}