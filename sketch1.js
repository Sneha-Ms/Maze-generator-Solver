var rows, cols;
var w = 20;
var grid = [];

var current;

var current1;

var stack = [];
var solve = [];
// var flag = 0;

function setup(){
	createCanvas(400,400); //width,height
	cols = floor(width/w);
	rows = floor(height/w);
	frameRate(50);

	for(var j = 0; j<rows; j++){ //j = rows, cols = i
		for(var i = 0 ; i<cols; i++){
				var cell = new Cell(i,j);
				grid.push(cell);
		}
	}

	current = grid[0];

	// for(var j=0; j<rows ; j++){
	// 	for(var i = 0; i<cols; i++){
	// 		var solve = new Solve(i,j);
	// 		grid.push(solve);
	// 	}
	// }
}

function draw() {
	background(51);

		for(var i =0; i < grid.length ; i++){
			grid[i].show();

		}

		current.visited = true;
		current.highlight();

		//step 1
		var next =  current.checkNeighbors();
		if(next){
			next.visited = true;

			//step 2
			stack.push(current); 


			//step 3
			removeWalls(current, next);

			//step 4
			current = next;
		}

		else if(stack.length >0){

			current = stack.pop();

		}

		for(var j=0 ; j<rows ; j++){
			for(var i=0 ; i<cols ; i++){

				var gr = index(i,j);
				if(gr.visited == true){
					//solve the maze 
					current1 = current[i];
					current1.visited = true;
					current1.highlightsolve();

					var next1 = current1.checkNeighbors1();

					if(next1){
						next1.visited = true;
						solve.push(current1);
						current1 = next1;
					}

					else if(solve.length > 0){

						current1 = solve.pop();

					}

				}
			}
		}

		// if(grid.length == 0){
		// 	flag = 1;
		// }
	
		// if(flag = 1){

		// 	current.visited = true;
		// 	var next1 = current.checkNeighbors1();

		// 	if(next1){



		// 	}
		// 	var t = this.i *w;
		// 	var h = this.j *w;

		// 	if(this.visited){
		// 		noStroke();
		// 		fill(50, 199, 90, 0); //green
		// 		rect(t,h,w,w);
		// 	}

		// }

}

function index(i,j){

	if(i<0 || j<0 || i>(cols-1)|| j>(rows-1)){
		return -1; 
	}
	
		return i+j*cols;
	
}

function Cell(i,j){
	this.i = i;
	this.j = j;
	this.walls = [true,true,true,true];
	this.visited = false;

	this.checkNeighbors = function(){
		var neighbors = []; //neighbors is an array

		// var index = i+(j-1)*cols;
		var top = grid[index(i,j-1)];
		var right = grid[index(i+1,j)];
		var bottom = grid[index(i,j+1)];
		var left = grid[index(i-1,j)];

		if(top && !top.visited){ //i.e. top is not a dead end
			neighbors.push(top); // i.e go and traverse it.
		}

		if(right && !right.visited){
			neighbors.push(right);
		}

		if(bottom && !bottom.visited){
			neighbors.push(bottom);
		}

		if(left && !left.visited){
			neighbors.push(left);
		}

		if(neighbors.length >0){
			var r = floor(random(0,neighbors.length));
			return neighbors[r];
		}

		else{
			return undefined;
		}

	}

	this.highlight = function(){

		var x = this.i*w;
		var y = this.j*w;
		noStroke();
		fill(0,0,255,100); // blue = 0,0,255,100
		rect(x,y,w,w);

	}

	this.highlightsolve = function(){
		var x = this.i*w;
		var y = this.j*w;
		noStroke();
		fill(50,199,90,0); // green = 50,199,90,0
		rect(x,y,w,w);
	}

	this.show = function(){
		var x = this.i*w;
		var y = this.j*w;
		stroke(255);

		if(this.walls[0]){
			line(x,y,x+w,y); //top
		} 
		if(this.walls[1]){
			line(x+w,y,x+w,y+w); //right
		}
		if(this.walls[2]){
			line(x,y+w,x+w,y+w); //bottom
		}
		if(this.walls[3]){
			line(x,y,x,y+w); //left
		}

		if(this.visited){
			noStroke();
			fill(255, 0, 255 , 100); //purple = 255, 0, 255, 100
			rect(x,y,w,w);
		}
		
	}

		nowall = function(){
			if(!this.walls[0]){
				current1 = next1;
				return 1;
			}

			if(!this.walls[1]){
				current1 = next1;
				return 1;
			}

			if(!this.walls[2]){
				current1 = next1;
				return 1;
			}

			if(!this.walls[3]){
				current1 = next1;
				return 1;
			}

			else{
				return 0;
			}
		}

		this.checkNeighbors1 = function(){
		var neighbors = [];

		// var index = i+(j-1)*cols;
		var top = grid[index(i,j-1)];
		var right = grid[index(i+1,j)];
		var bottom = grid[index(i,j+1)];
		var left = grid[index(i-1,j)];

		if(top && !top.visited){
			neighbors.push(top);
		}

		if(right && !right.visited){
			neighbors.push(right);
		}

		if(bottom && !bottom.visited){
			neighbors.push(bottom);
		}

		if(left && !left.visited){
			neighbors.push(left);
		}

		if(neighbors.length >0){
			var r = nowall();
			return neighbors[r];
		}

		else{
			return undefined;
		}

	}
}


function removeWalls(a,b){

	var x = a.i - b.i;
	// console.log(x);
	if(x === 1){
		a.walls[3] = false;
		b.walls[1] = false;
	}

	else if( x === -1 ){
		b.walls[3] = false;
		a.walls[1] = false;
	}

	var y = a.j - b.j;
	if(y === -1){
		a.walls[2] = false;
		b.walls[0] = false;
	}

	else if( y === 1){
		b.walls[2] = false;
		a.walls[0] = false;
	}

}

// function solve(){
	
// }