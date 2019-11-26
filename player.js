
class Player {
    
    constructor(maze, coins){
        this.rdn = random(avaibleground);
        this.i = this.rdn.i;
        this.j = this.rdn.j;
        this.img = 0;
        this.width = 20;
        this.height = this.width;
        this.maze = maze;
        this.coins = coins;
        this.stroke = 1100;
        this.coins_ate = 0;
    }

    takeCoin(){
        for (let c = 0; c < this.coins.length; c++){
            if (this.j === this.coins[c].j && this.i === this.coins[c].i){
                this.coins.splice(c,1);
                addCoins(this.coins);
                this.coins_ate++;
                this.stroke -= 150;
                if (this.stroke < 1100){
                    this.stroke = 1100;
                }
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
                this.img = 0;
            }
            else if (dir === 3 && this.should_not_collide(3)) {
                this.j+= 1;
            }
            else if (dir === 4 && this.should_not_collide(4)) {
                this.i-= 1;
                this.img = 1;
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
        this.stroke = this.stroke + (2 + (2 - this.stroke/1000));
    }
    show(){
        strokeWeight(1);
        image(moleimg[this.img],this.i*this.width,this.j*this.height,this.width,this.height);
    }

    showlight(){
        ellipseMode(CENTER);
        noFill();
        strokeWeight(this.stroke);
        ellipse(this.i*this.width+this.width/2,this.j*this.height+this.height/2,2000,2000);
    }

}