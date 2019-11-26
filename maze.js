var cols = 20, rows = 10;
var grid = [];
var current;
var stack = [];

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


function createMaze(maze,start_x,start_y){
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


    current = grid[start_x][start_y];
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
            maze[j][i].img = ChooseImg(i,j,maze);
        }
    }
    
    return maze;
}

function ChooseImg(i,j,maze){

    if (i === 0 && j === 0){
        return 15;
    }

    if (i === 0 && j === (rows*3)-1){
        return 14;
    }

    if (i === (cols*3)-1 && j === 0){
        return 16;
    }

    if (i === (cols*3)-1 && j === (rows*3)-1){
        return 13;
    }

    if (i > 0 && i < (cols*3)-1 && j > 0 && j < (rows*3)-1){  
        var lt = maze[j-1][i-1].collision;
        var ct = maze[j-1][i].collision;
        var rt = maze[j-1][i+1].collision;
        var lc = maze[j][i-1].collision;
        var rc = maze[j][i+1].collision;
        var lb = maze[j+1][i-1].collision;
        var cb = maze[j+1][i].collision;
        var rb = maze[j+1][i+1].collision;

        /*   [lt][ct][rt]
            [lc][cc][rc]
            [lb][cb][rb]
                       */

        if (lt & ct & rt & lc & rc & lb & cb & rb){ 
            return 0;
        } 
        if (lc & rc & cb && !ct ){
            return 1;
        }
        if (ct && cb && lc && !rc){
            return 2;
        }
        if (lc && rc && ct && !cb){
            return 3;
        }
        if (ct && rc && cb && !lc){
            return 4;
        }
        if (lc && cb && lc && !ct && !rc){
            return 9;
        }
         if (lt && ct && lc && !rc && !cb){
            return 10;
        }
         if (ct && rt && rc && !lc && !cb){
            return 11;
        }
         if (rc && cb && rb && !lc && !ct){
            return 12;    
        } else {
            return 0;
        }

    

        /*   [lt][ct][rt]
            [lc][cc][rc]
            [lb][cb][rb]
                       */
    } else if (i === 0) {
        var rc = maze[j][i+1].collision;
        if (rc){
            return 0;
        } else {
            return 2;
        }
    } else if (i === (cols*3)-1){
        var lc = maze[j][i-1].collision;
        if (lc){
            return 0;
        } else {
            return 4;
        }
    } else if (j === 0 ){
        var cb = maze[j+1][i].collision;
        if (cb){
            return 0;
        } else {
            return 3;
        }
    }  else if (j === (rows*3)-1){
        var ct = maze[j-1][i].collision;
        if (ct){
            return 0;
        } else {
            return 1;
        }
    }
}



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


class Ground {
    constructor(i,j){
        this.i = i;
        this.j = j;
        this.width = 20;
        this.height = this.width;
        this.collision = false;
        this.img = 0;
    }


    show(){
        if (this.collision){

            image(groundimg[this.img], this.i*this.width,this.j*this.height,this.width,this.height);
            strokeWeight(0);
        }

    }

}