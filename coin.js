
var avaibleground = [];

function createCoins(coins, maze){

    for (let j = 0; j < rows*3; j++){
        for (let i = 0; i < cols*3; i++){
            if (!maze[j][i].collision){
                avaibleground.push({j:j,i:i});
            }
        }
    }
    for (let c = 0; c < 10;c++){
        addCoins(coins);
    }

    return coins;
}


function addCoins(coins){
    let rdn = random(avaibleground);
    coins.push(new Coin(rdn.i,rdn.j));
}





class Coin{
    constructor(i,j){
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