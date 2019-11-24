
class Player {
    constructor(i,j, maze, coins){
        this.i = i;
        this.j = j;
        this.width = windowWidth/80;
        this.height = this.width;
        this.timer = 0;
        this.maze = maze;
        this.coins = coins;
    }

    takeCoin(){
        for (let c = 0; c < this.coins.length; c++){
            if (this.j === this.coins[c].j && this.i === this.coins[c].i){
                this.coins.splice(c,1);
                addCoins(this.coins);
                this.timer = 200;
                frameRate(60);
                return true;
            }
        }
    }

    should_not_collide(dir){
        if (dir === 1){
            if (this.maze[this.j-1][this.i].collision){
                return false;
            } else {return true};
        }
        if (dir === 2){
            if (this.maze[this.j][this.i+1].collision){
                return false;
            } else {return true};
        }
        if (dir === 3){
            if (this.maze[this.j+1][this.i].collision){
                return false;
            } else {return true};
        }
        if (dir === 4){
            if (this.maze[this.j][this.i-1].collision){
                return false;
            } else {return true};
        }
    }

    moveto(dir){
       
            if (dir === 1 && this.should_not_collide(1)){
                this.j-= 1;
            }
            else if (dir === 2 && this.should_not_collide(2)) {
                this.i+= 1;
            }
            else if (dir === 3 && this.should_not_collide(3)) {
                this.j+= 1;
            }
            else if (dir === 4 && this.should_not_collide(4)) {
                this.i-= 1;
            }

            this.takeCoin();
    }

    move(arraydir){
        if (arraydir[0]){
            this.moveto(1)
        }
        if (arraydir[1]){
            this.moveto(2)
        }
        if (arraydir[2]){
            this.moveto(3)
        }
        if (arraydir[3]){
            this.moveto(4)
        }
        
    }

    update(){
        if (this.timer > 0){
           this.timer--; 
        }
        else {
            frameRate(20);
        }
        
    }
    show(){
        fill('yellow');
        rect(this.i*this.width,this.j*this.height,this.width,this.height);
    }

}