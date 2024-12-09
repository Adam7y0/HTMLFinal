
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)

function main()
{
    ctx.clearRect(0,0,c.width,c.height); 
    state()
}

//setup
var state;
var button = new GameObject();
var avatar = new GameObject();
var ground = new GameObject();
var platform = new GameObject();
var wall = new GameObject();
var level = new GameObject();
//added
var platform2 = new GameObject();
var platforms = []
var platform3 = new GameObject
var platform4 = new GameObject
var platform5 = new GameObject
var gameScenes = ["gameOver"]


function init()
{
    state = menu

    avatar.color = `green`;

    level.x = 0; 
    level.y = 0;

    ground.color = `brown`;
    ground.w = c.width;
    ground.h = c.height*.25;
    ground.y = c.height - ground.h/2;
    ground.world = level

    platform.w = 100;
    platform.h = 30;
    platform.color = `orange`
    platform.x = 300
    platform.world = level

    //Added
    platform2.w = 100;
    platform2.h = 30;
    platform2.color = "blue"
    platform2.x = 80;
    platform2.y = 100
    platform2.world = level

    platform3.w = 100;
    platform3.h = 30;
    platform3.color = "red"
    platform3.x = 300;
    platform3.y = -100
    platform3.world = level

    platform4.w = 100;
    platform4.h = 30;
    platform4.color = "red"
    platform4.x = 50;
    platform4.y = -400
    platform4.world = level

    platform5.w = 100;
    platform5.h = 30;
    platform5.color = "green"
    platform5.x = 200;
    platform5.y = -600
    platform5.world = level

    platforms[0] = platform;
    platforms[1] = platform2;
    platforms[2] = platform3;
    platforms[3] = platform4;
    platforms[4] = platform5;
    
   

    //Not added
    wall.h = 200;
    wall.w = 34;
    wall.color = `purple`
    wall.x = 10000;   //was 600 before
    wall.world = level

}

init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    if(clicked(button))
    {
        state = game;
    }
    button.render()
}

function win()
{

}
function lose()
{
    
}

function game()
{
    if(sp == true && avatar.canJump == true)
    {
        avatar.canJump = false;
        avatar.vy = -30;
    }

    if(a == true)
    {
        avatar.vx += -1;
    }
    if(d == true)
    {
        avatar.vx += 1;
    }

    //applies friction
    avatar.vx *= .85;
    //aplies gravity
    avatar.vy += 1;
    avatar.move();

    //used to move the level. 
    var offset = {x:avatar.vx, y:avatar.vy}

    while(ground.isOverPoint(avatar.bottom()))
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }

    while(wall.isOverPoint(avatar.right()) && avatar.vx >= 0)
    {
        avatar.vx = 0;
        avatar.x--;
        offset.x--;
    }
    while(wall.isOverPoint(avatar.left()) && avatar.vx <= 0)
        {
            avatar.vx = 0;
            avatar.x++;
            offset.x++;
        }
        //Added
    while(platform2.isOverPoint(avatar.bottom()) && avatar.vy >=0)
        {
            avatar.vy = 0;
            avatar.y--;
            offset.y--;
            avatar.canJump = true;
        }


    /*-------Level movement threshold----*/
    //if(avatar.x > 500 || avatar.x < 300)
    //{
        //Level movement code
        //level.x -= offset.x;
        //avatar.x -= offset.x;
        //level.y -= offset.y;
        //avatar.y -= offset.y;
    //}

    /*----- Camera Code -----------*/
        var dx = c.width/2 - avatar.x
        var dy = c.height/2 - avatar.y
        
        level.x += dx*.05; 
        avatar.x += dx*.05; 
        level.y += dy*.15; 
        avatar.y += dy*.15; 
    //----------------------------*/
    

    ground.render();
    for(var i = 0; i<platforms.length; i++){
        while(platforms[i].isOverPoint(avatar.bottom()) && avatar.vy >= 0)
            {
                avatar.vy = -29;
                avatar.y--;
                offset.y--;
                avatar.canJump = true;
            }
        platforms[i].render();
    }
    wall.render();
    avatar.render();
    
    
}



