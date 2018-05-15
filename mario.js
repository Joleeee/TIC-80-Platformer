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
	cls(13)
	deltaTime = time()-totalTime
	totalTime = time()

	//#region COLLISION and VELOCITY
	y += yVel
	if(getBlock((x+16-4),(y+16)) == 0 && getBlock((x+4),(y+16)) == 0)
	{
		yVel += 9.81/60
	}else{
		//y = Math.round(y);
		/*while(!(getBlock((x+16-4),(y+16)) == 0 && getBlock((x+4),(y+16)) == 0))
		{
			y--;
		}
		y++;
		yVel = 0
		jumping = false*/
		var printed = false;
		for (ax = 0; ax < 30; ax++) {
			for (ay = 0; ay < 30; ay++) {
				if(getBlock(ax*8,ay*8)!= 0)
				{
					var bx = ax*8;
					var by = ay*8;
					
					/*if(!printed)
					print((y + 16 < by)+".."+(y > by -8)+".."+(x+4 > bx+8)+".."+(x+12 < bx),0,30)
					printed = true;*/
					//print("true",100,0)

					
					while((!(getBlock((x+16-4),(y+16)) == 0 && getBlock((x+4),(y+16)) == 0)) || (!(getBlock((x+4),(y)) == 0 && getBlock((x+4),(y+16)) == 0))){
						if(!(getBlock((x+16-4),(y+16)) == 0 && getBlock((x+4),(y+16)) == 0))
						{
								y--;
						}
							//y++;
							yVel = 0
							//y++;
							jumping = false
						
						//is there a block to the left?
						if(!(getBlock((x+4),(y)) == 0 && getBlock((x+4),(y+15)) == 0))
						{
							print(getBlock((x+4),(y))+".."+getBlock((x+4),(y+16)), 0,30)
							x--;
						}
					}

					
					
						
					/*if(x > bx && x-5 < bx && y+16 >= by+8)
						x-= 5;*/
				}
			}
		}
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

	while (x < 0)
	{
		x += 30*8*8
	}
	while (x > 30*8*8)
	{
		x -= 30*8*8
	}
	//#endregion

	//#region MAP
	mapX = Math.round(((x) / WIDTH)-0.5)*30;

	while (mapX < 0)
	{
		mapX += 30*8
	}
	while (mapX > 30*7)
	{
		mapX -= 30*8
	}
	//#endregion
	
	//#region SLIME

	/*slimes.forEach2(function(slime){
		slime.y += slime.yVel
		slime.yVel += 9.81*deltaTime/1000

		if(slime.x > x + 4)
			slime.x-= 1
		else if(slime.x < x + 4)
			slime.x += 1
		if((getBlock((slime.x),(slime.y+8)) == 0 && getBlock((slime.x+8),(slime.y+8)) == 0))
		{
			print("slime in da air",50,50)
		} else
		{
			print("slime in da graund",50,50)
			while(!(getBlock((slime.x),(slime.y+8)) == 0 && getBlock((slime.x+8),(slime.y+8)) == 0))
			{
				slime.y--;
			}
			slime.y++
			slime.yVel = 0
		}
	})*/
	

	
	//#endregion

	map(mapX,0,30,17,0,0,0,1)
	spr(spritePos, x - mapX * 8, y, 0, 1, 0, 0, 2, 2)

	slimes.forEach2(function(slime){
		spr(260, slime.x, slime.y, 0, 1, 0, 0, 1, 1)

	})

	print("block"+getBlock((x+4), y+16)+".."+getBlock((x+16-4), y+16))
	print("mapX"+mapX,0,10)
	print("x"+x,0,20)
	
	lastY = y
}

function tilesOnScreen()
{
	var tiles = new Array();
	for (x = 0; x < 30; x++) {
		for (y = 0; y < 30; y++) {
			if(getBlock(x,y)!= 0)
			{
				tiles[x,y] = true;
			}else
			{
				tiles[x,y] = false;
			}
		}
	}
	return tiles
}

function getBlock(x, y)
{
	return mget(x/8, y/8);
}

var slimes = new Array();
slimes[0] = new Slime(300, 50);
function Slime(x, y)
{
	this.x = x
	this.y = y
	this.yVel = 0
}

Array.prototype.forEach2=function(a){
    var l=this.length;
    for(var i=0;i<l;i++)a(this[i],i)
  }

function Vector(x, y)
{
	this.x = x
	this.y = y
}