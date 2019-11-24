var cols = 20, rows = 10;
var grid = [];
var current;
var stack = [];

var maze = [];
var avaibleground = [];
var player;
var keymove = [false,false,false,false];
var coins = [];

function removeWalls(a, b) {
    let x = a.i - b.i;
    if (x === 1) {
      a.walls[3] = false;
      b.walls[1] = false;
    } else if (x === -1) {
      a.walls[1] = false;
      b.walls[3] = false;
    }
    let y = a.j - b.j;
    if (y === 1) {
      a.walls[0] = false;
      b.walls[2] = false;
    } else if (y === -1) {
      a.walls[2] = false;
      b.walls[0] = false;
    }
}

function addCoins(){
    let rdn = random(avaibleground);
    coins.push(new Coin(rdn.i,rdn.j));
}

function setup() {

    mazecanvas = createCanvas(windowWidth,windowHeight);

    // SETUP THE GRID
    for (let j = 0; j < rows;j++){
        let row = [];
        for (let i = 0; i < cols; i++){
        row.push(new Cell(i,j));
        }
        grid.push(row);
    }

    // SETUP MAZE
    for (let j = 0; j < rows*3;j++){
        let row = [];
        for (let i = 0; i < cols*3; i++){
        row.push(new Ground(i,j));
        }
        maze.push(row);
    }
    

    current = grid[0][0];
    current.visited = true;
    
    let total_visited;
    while (true){
        let next = current.checkNeighbors();
        if (next) {
            next.visited = true;

            // STEP 2
            stack.push(current);

            // STEP 3
            removeWalls(current, next);

            // STEP 4
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();

            for (let j = 0; j < rows; j++){
                for (let i = 0; i < cols; i++){
                    if (grid[j][i].visited){
                        total_visited++;
                    }
                }
            }
            if (total_visited === cols*rows){
                break;
            } else {
                total_visited = 0;
            }
        }  
    }


    for (let j = 0; j < rows; j++){
        for (let i = 0; i < cols; i++){
            if (grid[j][i].walls[0]){
                for (let g = 0; g < 3; g++){
                    maze[j*3][i*3+g].collision = true;
                }
            }
            if (grid[j][i].walls[1]){
                for (let g = 0; g < 3; g++){
                    maze[j*3+g][i*3+2].collision = true;
                }
            }
            if (grid[j][i].walls[2]){
                for (let g = 0; g < 3; g++){
                    maze[j*3+2][i*3+g].collision = true;
                }
            }
            if (grid[j][i].walls[3]){
                for (let g = 0; g < 3; g++){
                    maze[j*3+g][i*3].collision = true;
                }
            }
        }
    }

    for (let j = 0; j < rows*3; j++){
        for (let i = 0; i < cols*3; i++){
            if (!maze[j][i].collision){
                avaibleground.push({j:j,i:i});
            }
        }
    }

    for (let c = 0; c < 10;c++){
        addCoins();
    }

    // ------------------------------------------------


    player = new Player(1,1);
    frameRate(20);

}



function draw(){
background('rgba(255,255,255,0.5)');
   for (let j = 0; j < rows * 3; j++){
       for (let i = 0; i < cols * 3; i++){
           maze[j][i].show();
       }
   }

   for (let c = 0; c < coins.length; c++){
       coins[c].show();
   }



   player.move(keymove);
   player.takeCoin();
   player.update();
   player.show();
   
   console.log(player.timer);
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


// ------------------------------------------------

class Cell {
    constructor(i,j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true];
        this.visited = false;
    }

    checkNeighbors() {

        let neighbors = [];
        let top;
        let right;
        let bottom;
        let left;


        if (this.j > 0){
            top = grid[this.j-1][this.i];
        } else { top = undefined; }
        
        if (this.i < cols-1){
            right = grid[this.j][this.i+1]; 
        } else { right = undefined; }


        if (this.j < rows-1) {
            bottom = grid[this.j+1][this.i];    
        } else { bottom = undefined; }
        



        if (this.i > 0){
            left = grid[this.j][this.i-1];
        } else { left = undefined; }



        if (top && !top.visited){
            neighbors.push(top);
        }

        if (right && !right.visited) {
            neighbors.push(right);
        }

        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }

        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            let r = floor(random(0, neighbors.length));
            return neighbors[r];
          } else {
            return undefined;
          }
    }


}


// ------------------------------------------------

class Ground {
    constructor(i,j){
        this.i = i;
        this.j = j;
        this.width = windowWidth/80;
        this.height = this.width;
        this.collision = false;
    }


    show(){
        if (this.collision){
            fill(51);
            rect(this.i*this.width,this.j*this.height,this.width,this.height);
        }

    }

}




class Player {
    constructor(i,j){
        this.i = i;
        this.j = j;
        this.width = windowWidth/80;
        this.height = this.width;
        this.timer = 0;
    }

    should_not_collide(dir){
        if (dir === 1){
            if (maze[this.j-1][this.i].collision){
                return false;
            } else {return true};
        }
        if (dir === 2){
            if (maze[this.j][this.i+1].collision){
                return false;
            } else {return true};
        }
        if (dir === 3){
            if (maze[this.j+1][this.i].collision){
                return false;
            } else {return true};
        }
        if (dir === 4){
            if (maze[this.j][this.i-1].collision){
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
    }

    move(arraydir){
        if (arraydir[0]){
            player.moveto(1)
        }
        if (arraydir[1]){
            player.moveto(2)
        }
        if (arraydir[2]){
            player.moveto(3)
        }
        if (arraydir[3]){
            player.moveto(4)
        }
        
    }

    takeCoin(){
        for (let c = 0; c < coins.length; c++){
            if (this.j === coins[c].j && this.i === coins[c].i){
                coins.splice(c,1);
                addCoins();
                this.timer = 200;
                frameRate(60);
                return true;
            }
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

class Coin{
    constructor(i,j,index){
        this.i = i;
        this.j = j;
        this.width = windowWidth/80;
        this.height = this.width;
    }

    show(){
        fill('blue');
        ellipseMode(CORNER);
        ellipse(this.i*this.width,this.j*this.height,this.width,this.height);
    }
}