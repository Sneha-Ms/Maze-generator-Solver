var col,rows;
//var width,height;;
var w=20;
var grid=[];
var bi=w/4;
var bj=w/4;

var current;
var stack =[];
var button=[];

function preload(){
ball=loadImage('ball1.png');
}

function setup(){
// width=createInput("enter width of maze");
// height=createInput("enter height of maze");
// w=createInput("enter width of grid");
createCanvas(600,600);
col = floor(width/w);
rows= floor(height/w);
frameRate(50);




button[0]=createButton("left");
button[1]=createButton("right");
button[2]=createButton("up");
button[3]=createButton("down");


 button[0].mousePressed(left);
 button[1].mousePressed(right);
 button[2].mousePressed(up);
 button[3].mousePressed(down);




for(var j=0;j<rows;j++){
  for(var i=0;i<col;i++){
    var cell=new Cell(i,j);
    grid.push(cell);
  }
}
current=grid[0];

}

//setup function completes

function draw(){

background(51);
for(var i=0;i<grid.length;i++){
  grid[i].show();
}
current.visited=true;
current.highlight();
image(ball,bi,bj,w/2,w/2);

//current.ballmarked();

//STEP 1
var next=current.checkNeighbors();
if(next){
	next.visited=true;
//step 2

stack.push(current);

//STEP 3
removeWall(current,next);

	//STEP 4
	current=next;
}else if (stack.length>0) {
	current=stack.pop();
}

}

//draw function completes

function index(i , j){
	if(i<0 || j<0 || i>(col-1) || j>(rows-1)){
		return -1;
	}

	return i + j*col;
}

//index function completes



//cell class completes

function removeWall(a,b){
		var x=a.i-b.i;
		if(x==1){
		a.walls[3]=false;
		b.walls[1]=false;}
		else	if(x==-1){
		a.walls[1]=false;
		b.walls[3]=false;}
		var y=a.j-b.j;
		if(y==1){
		a.walls[0]=false;
		b.walls[2]=false;}
		else if(y==-1){
		a.walls[2]=false;
		b.walls[0]=false;}

}







	function left(){
		bi=bi-w;
		//image(ball,bi,bj,w/2,w/2);
	}
	function right(){
		bi=bi+w;
	//	image(ball,bi,bj,w/2,w/2);
	}
	function up(){
		bj=bj-w;
	//	image(ball,bi,bj,w/2,w/2);
	}
	function down(){
		bj=bj+w;
		//image(ball,bi,bj,w/2,w/2);
	}





//removewall function completes
