var keymove = [false,false,false,false];

class Game{
    constructor(){
        this.maze = [];
        this.maze = createMaze(this.maze);
        this.coins = [];
        this.coins = createCoins(this.coins, this.maze);
        this.player = new Player(1,1, this.maze, this.coins);
        this.running = true;

        
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
        console.log("You Lose");
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

function keyReleased(){
    if (keyCode === UP_ARROW){
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