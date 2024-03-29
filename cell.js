function Cell(i,j){
  this.i=i;
  this.j=j;
	this.walls=[true,true,true,true];
	this.visited=false;      //top right bottom left

	this.highlight=function(){
		var x=this.i*w;
    var y=this.j*w;

    noStroke();
    fill(100,152,244,100);
		rect(x,y,w,w);

	}




	this.checkNeighbors = function(){
		var neighbors=[];

		var top    = grid[index(i,j-1)];
		var right  = grid[index(i+1,j)];
		var bottom = grid[index(i,j+1)];
		var left   = grid[index(i-1,j)];

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

		if(neighbors.length>0){
			var r= floor(random(0,neighbors.length));
			return neighbors[r];
		}
		else{
			return undefined;
		}

	}


  this.show=function(){
    var x=this.i*w;
    var y=this.j*w;
    stroke(255);
    noFill();
		if(this.walls[0]){                     //top
		line(x,y,x+w,y);}
		if(this.walls[1]){                     //right
		line(x+w,y,x+w,y+w);}
		if(this.walls[2]){                     //bottom
		line(x+w,y+w,x,y+w);}
		if(this.walls[3]){                     //left
		line(x,y+w,x,y);}
		if(this.visited){
			noStroke();
			fill(255,0,255,100);
			rect(x,y,w,w);
		}
  }
}
