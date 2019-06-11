var col,rows;
//var width,height;;
var w=20;
var grid=[];

var button=[];
var bi;
var bj;

var current;
var stack =[];

var sNext;

//variables for solving
var manualplay;                       //for manual solving

var currentAuto;                     //for automated solving
var autoStack=[];
var start=0;
//var s=0;
var finish;

//var song;

function preload(){
ball=loadImage('ball1.png');
//song = loadSound('song1.mp3');

}

function setup(){

  var cnv = createCanvas(600, 600);
  var x = (windowWidth - width) -50;
  var y = (windowHeight - height)-50;
  cnv.position(x, y);

// createCanvas(600,600);
col = floor(width/w);
rows= floor(height/w);
frameRate(100);

button[5]=createButton("create maze");
button[0]=createButton("left");
button[1]=createButton("right");
button[2]=createButton("up");
button[3]=createButton("down");
button[4]=createButton("Show me the right path, lord!");








for(var j=0;j<rows;j++){
  for(var i=0;i<col;i++){
    var cell=new Cell(i,j);
    grid.push(cell);
  }
}
 finish=grid.length-1;

current=grid[0];
manualplay=grid[0];
currentAuto=grid[0];

 button[5].mousePressed(createMaze);
 button[0].mousePressed(left);
 button[1].mousePressed(right);
 button[2].mousePressed(up);
 button[3].mousePressed(down);
 button[4].mousePressed(autosolve);






}

//setup function completes

function draw(){


//  song.play();

background(51,95);
for(var i=0;i<grid.length;i++){
  grid[i].show();
}

if(start==1){
current.visited=true;
current.highlight();

coordiantes(manualplay);
image(ball,bi,bj,w/2,w/2);



//STEP 1
var next=current.checkNeighbors();
 // console.log(next.walls[1]);

if(next){
	next.visited=true;
//step 2

stack.push(current);     //backtracking

//STEP 3
removeWall(current,next);    //removeWall

	//STEP 4
	current=next;
}else if (stack.length>0) {
	current=stack.pop();
}

}


image(ball,bi,bj,w/2,w/2);

//Auto solve ka code krnaa haii yaahaaaa

if(start==2){

  currentAuto.solvisited=true;
  currentAuto.highlight();

  //image(ball,bi,bj,w/2,w/2);


  currentAuto.check_stop();
  //STEP 1
  var Anext=currentAuto.checkWalls();
  //console.log(Anext.walls[1]);

  if(Anext){
  	Anext.solvisited=true;
  //step 2
  console.log(Anext.i);

  autoStack.push(currentAuto);
  coordiantes(currentAuto);    //backtracking

  //STEP 3
  //removeWall(current,next);    //removeWall

  	//STEP 4
  	currentAuto=Anext;
  }else if (autoStack.length>0) {
  	currentAuto=autoStack.pop();
  }




 }

 if(start==2 || start==3){
   for(var hh=0;hh<autoStack.length;hh++){
     autoStack[hh].highlight();
   }
 }


}

//draw function completes
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    left();
  } else if (keyCode === RIGHT_ARROW) {
    right();
  }else if (keyCode== UP_ARROW) {
    up();
  }else if (keyCode== DOWN_ARROW) {
    down();
  }
}


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



  function coordiantes(a){
    bi=(w/4)+(a.i)*w;
    bj=(w/4)+(a.j)*w;
  }



	function left(){
  //  console.log("bottom left " + manualplay.walls[3]);
    if(manualplay.walls[3]==false){
      var ti=manualplay.i-1;
      var tj=manualplay.j;
      var g=index(ti,tj);
      manualplay=grid[g];
    }

	}
  function right(){
  //  console.log("bottom right " + manualplay.walls[1]);

    if(manualplay.walls[1]==false){
      var ti=manualplay.i+1;
      var tj=manualplay.j;
      var g=index(ti,tj);
      manualplay=grid[g];
    }

  }
  function up(){
  //  console.log("button up" + manualplay.walls[0]);

    if(manualplay.walls[0]==false){
      var ti=manualplay.i;
      var tj=manualplay.j-1;
      var g=index(ti,tj);
      manualplay=grid[g];
    }

	}
  function down(){


    if(manualplay.walls[2]==false){
      var ti=manualplay.i;
      var tj=manualplay.j+1;
      var g=index(ti,tj);
      manualplay=grid[g];
    }

	}
  function autosolve(){
    start=2;

  }
  function createMaze(){
    start=1;

  }
