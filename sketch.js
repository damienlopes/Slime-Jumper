var eye, slime, player, ground, ground2, ground3;
var eyeimg, slimeimg, playerimg;
var jumpmp3, diemp3;
var slimes, eyes;
var game = "play";
var score = 0;
function preload() {
  eyeimg = loadImage("eye.png");
  slimeimg = loadImage("sslime.png");
  playerimg = loadImage("Kplayer.png");
  jumpmp3 = loadSound("jump.mp3");
  diemp3 = loadSound ("die.mp3")
}

function setup() {
  createCanvas(500, 500);
  ground = createSprite(300, 498, 600, 10);
  ground.shapeColor = "grey";
  ground2 = createSprite(499, 300, 10, 600);
  ground2.shapeColor = "grey";
  ground3 = createSprite(1, 300, 10, 600);
  ground3.shapeColor = "grey";

  player = createSprite(250, 250, 20, 50);
  player.addImage("running", playerimg);
  player.scale = 0.1;
  slimes = createGroup();
  eyes = createGroup();
}

function draw() {
  background("black");
  text("score: " + Math.round(score), 435, 15);
  

  if (game == "play") {
    if (keyDown("RIGHT_ARROW")) {
      player.x = player.x + 3;
    }

    if (keyDown("LEFT_ARROW")) {
      player.x = player.x - 3;
    }

    if (keyDown("space") && player.y > 429) {
      player.velocityY = -10;
      jumpmp3.play();
    }

    eyemake()
    slimemake()
    player.velocityY = player.velocityY + 0.3;
    if (player.isTouching(eyes)) {
      game = "end";
      diemp3.play()
    }
    if (player.isTouching(slimes)) {
      game = "end";
      diemp3.play()
    }

  }

  if (game == "end") {
    player.destroy()
    
  }
  
  player.collide(ground);
  player.collide(ground2);
  player.collide(ground3);
  drawSprites();

  
}

function eyemake() {
  if (frameCount % 75 == 0) {
    score = score + 1
    eye = createSprite (-20,33,333,333)
    eye.velocityX = 10;
    eye.addImage("eyeee", eyeimg);
    eye.scale = 0.1
    eye.lifetime = 130;
    eye.y = Math.round(random(150, 300));
    eyes.add(eye);
  }
  
  
}

function slimemake() {
  if (frameCount % 105 == 0) {
    score = score + 1
   slime = createSprite (-20,475,333,333)
    slime.addImage("slime", slimeimg);
    slime.scale = 0.05
    slime.lifetime = 400;
    slime.velocityX = Math.round(random(2, 7));
    slimes.add(slime);
  }
}