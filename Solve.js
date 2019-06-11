var done;

// when no one remains unvisited : call solve

function Solve(i,j) {
	
	this.i = i;
	this.j = j;

	if(this.done){
		noStroke();
		fill(50, 199, 90, 0); //green
		rect(x,y,w,w);
	}

	current.done = true;

		if(top && !top.done){
			neighbors.push(top);
		}

		if(right && !right.done){
			neighbors.push(right);
		}

		if(bottom && !bottom.done){
			neighbors.push(bottom);
		}

		if(left && !left.done){
			neighbors.push(left);
		}



}