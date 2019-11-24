var keymove = [false,false,false,false];

class Game{
    constructor(start_x,start_y,running){
        this.maze = [];
        this.maze = createMaze(this.maze,start_x,start_y);
        this.coins = [];
        this.coins = createCoins(this.coins, this.maze);
        this.player = new Player(this.maze, this.coins);
        this.running = running;

        
    }


    run(){
        this.player.move(keymove);
        this.player.update();
        this.player.show();
        this.player.showlight();

        if (this.player.stroke > 2000){
            this.die();
        }
    }

    draw(){
        for (let j = 0; j < rows * 3; j++){
            for (let i = 0; i < cols * 3; i++){
                this.maze[j][i].show();
            }
        }
     
        for (let c = 0; c < this.coins.length; c++){
            this.coins[c].show();
        }
    }

    die(){
        this.running = false;
        $('#newgame').show();
        $('.light').show();
    }
}

function keyPressed(){
    if (keyCode === UP_ARROW) {
        keymove[0] = true;
    } 
    if (keyCode === RIGHT_ARROW) {
        keymove[1] = true;
    } 
    if (keyCode === DOWN_ARROW) {
        keymove[2] = true;
    } 
    if (keyCode === LEFT_ARROW) {
        keymove[3] = true;
    } 

}

function keyTyped(){
    if (key === 'A' || key ==='a'){
        keymove[0] = true;
    }
    if (key === 'D' || key ==='d'){
        keymove[0] = true;
    }
    if (key === 'S' || key ==='s'){
        keymove[0] = true;
    }
    if (key === 'Q' || key ==='q'){
        keymove[0] = true;
    }
}

function keyReleased(){
    if (keyCode === UP_ARROW ){
        keymove[0] = false;
    }
    if (keyCode === RIGHT_ARROW){
        keymove[1] = false;
    }
    if (keyCode === DOWN_ARROW){
        keymove[2] = false;
    }
    if (keyCode === LEFT_ARROW){
        keymove[3] = false;
    }
}