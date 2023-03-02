var columns, rows;
var cellSize = 10;
var cells = [];
var current;
var stack = [];

function setup() {
  createCanvas(400, 400);
  columns = width/cellSize;
  rows = height/cellSize;
  frameRate(100);


  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      var cell = new Cell(x,y);
      cells.push(cell);
    }
  }

  current = cells[0];
}

function draw() {
  background(60);
  for (let i = 0; i < cells.length; i++) {
    cells[i].show();
  }
  current.visited = true;
  var nextNeighbor = current.checkNeighbors();
  if(nextNeighbor){
      nextNeighbor.visited = true;
      stack.push(current);
      removeWalls(current, nextNeighbor);
      current = nextNeighbor;
  }else if (stack.length > 0){
    current = stack.pop();
  }
}

function index(x,y){
  if(x < 0 || y < 0 || x > columns-1 || y > rows - 1){
    return -1;
  }
  return x + (y * columns);
}

function Cell(x,y){
  this.x = x;
  this.y = y;
  this.walls = [true,true,true,true];
  this.visited = false;

  this.checkNeighbors = function(){
    var neighbors = [];
    
    var top = cells[index(x, y+1)];
    var right = cells[index(x+1, y)];
    var bottom = cells[index(x, y - 1)];
    var left = cells[index(x-1, y)];

    if(top && !top.visited){
      neighbors.push(top);
    }
    if(right &&!right.visited){
      neighbors.push(right);
    }

    if(bottom &&!bottom.visited){
      neighbors.push(bottom);
    }

    if(left && !left.visited){
      neighbors.push(left);
    }

    if(neighbors.length > 0){
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    }else{
      return undefined;
    }


  }


  this.show = function(){
    var x = this.x*cellSize;
    var y = this.y*cellSize;
    stroke(255);
    if(this.walls[0]){
      line(x,y,x+cellSize,y);
    }
    if(this.walls[1]){
      line(x+cellSize,y,x+cellSize, y+cellSize);
    } 
    if(this.walls[2]){
      line(x+cellSize, y+cellSize, x, y + cellSize);
    }
    if(this.walls[3]){
      line(x, y+cellSize, x, y); 
    }
    if(this.visited){
      noStroke();
      fill(0,255,0, 100);
      rect(x,y,cellSize,cellSize);
    } 
  }
  
}

function removeWalls(a, b){
  var x = a.x - b.x;
  if(x == 1){
    a.walls[3] = false;
    b.walls[1] = false;
  } else if(x == -1){
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.y - b.y;
  if(y == 1){
    a.walls[0] = false;
    b.walls[2] = false;
  } else if(y == -1){
    a.walls[2] = false;
    b.walls[0] = false;
  }
}