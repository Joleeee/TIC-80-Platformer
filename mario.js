// title:  Mario CLone
// author: Jonas Hole (yes thats my name)
// desc:   short description
// script: js

var t=0
var x=96
var y=24
var lastY = 24
var yVel=0

var WIDTH = 240
var HEIGHT = 136

var spritePos = 256

var t = 0

var jumping = false

var totalTime=0 
var deltaTime=0

var mapX = 0
function TIC()
{
	deltaTime = time()-totalTime
	totalTime = time()

	//#region COLLISION and VELOCITY
	y += yVel
	if(getBlock((x+16-4),(y+16)) == 0 && getBlock((x+4),(y+16)) == 0)
	{
		yVel += 9.81*deltaTime/1000
	}else{
		//y = Math.round(y);
		while(!(getBlock((x+16-4),(y+16)) == 0 && getBlock((x+4),(y+16)) == 0))
		{
			y--;
		}
		y++;
		yVel = 0
		jumping = false
	}
	//#endregion
	
	//#region Movement
	if(btn(0) && !jumping)
	{
		yVel = -2.2
		//y--;
		jumping = true
	}
	
	if(btn(2))
	{
		x--
		spritePos = 258
	}
	if(btn(3))
	{
		x++
		spritePos = 256
	}
	//#endregion

	//#region MAP
	if(x > WIDTH - 12)
	{
		mapX += 30;
		x = 0
	}
	if(x < 0-4){
		mapX -= 30;
		x = WIDTH-16+4;
	}

	while (mapX < 0)
	{
		mapX += 30*8
	}
	while (mapX > 30*7)
	{
		mapX -= 30*8
	}
	//#endregion
	
	
	cls(13)
	spr(spritePos,x,y,0,1,0,0,2,2)
	map(mapX,0,30,17,0,0,0,1)
	print(getBlock((x+4), y+16)+".."+getBlock((x+16-4), y+16))
	print(mapX,0,20)
	
	lastY = y
}

function getBlock(x, y)
{
	return mget(x/8+mapX, y/8);
}

function Slime(position)
{
	this.position = position;
	this.Update()
}

function Vector(x, y)
{
	this.x = x
	this.y = y
}