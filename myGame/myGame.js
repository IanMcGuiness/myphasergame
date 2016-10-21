/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
//All my global variables
var platforms;
var player;
var cursors;
var stars;
var deaths = 0;
var scoreText;
var timing = 4000;
var diamond;
var diamondTiming = 7000;
var collector;
var items = 0;
var itemText;
var deposit;
var score = 0;
var house;
var location;
var hp = 3;
var hpText;
var hpTime = 500;
var music;
var start;
var loop;
var hit;
var whenHit;
var death;
var gameOver;
var reload;
var jump;
var timer;
var loops;
var crate;
function preload() {
    game.load.image('sky', 'assets/darksky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/acid.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('collector', 'assets/Chest.png');
    game.load.image('deposit', 'assets/portal.png');
    game.load.image('house', 'assets/House.png');
    game.load.audio('music', 'assets/music.ogg');
    game.load.audio('hit', 'assets/hitSound.ogg')
    game.load.image('coodude', 'assets/deposit.png')
    game.load.audio('death', 'assets/death.ogg')
    game.load.audio('jump', 'assets/jump.ogg')
    game.load.image('crate', 'assets/crate.png')
}

function create() {
crate = game.add.group();    
    var myCrate = new Object();
    
    myCrate.create = game.add.sprite(500, 500, 'crate')
    
    
    
    
    
    
    
    
    
    jump = game.add.audio('jump')
    //Music loop
    death = game.add.audio('death');
    hit = game.add.audio('hit');
    music = game.add.audio('music');
    
    //Music decode
    music.play();
    music.volume = 1;
    //Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //The sky
    game.add.sprite(0, 0, 'sky');
    
    //the platforms group contains everything our character walks on
    platforms = game.add.group();

    //Enable physics for the platforms
    platforms.enableBody = true;


    var ledge = platforms.create(-125, 300, 'ground');
    ledge.body.immovable = true;
    

    //Create the ground
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    //Make it the correct size
    ground.scale.setTo(2, 2);

    //Make the ground's phyisics

    ground.body.immovable = true;


    deposit = game.add.sprite(650, game.world.height - 260, 'deposit');
    //house
     house = game.add.sprite(0, game.world.height - 640, 'house');
    //Deposit
     //Collector
     collector = game.add.sprite(10, game.world.height - 103, 'collector');
    
    crate = game.add.sprite(-300, 300, 'crate')
    //The player arrives :)
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    
        //player physics
    game.physics.arcade.enable(player);
    //Players physics settings
    player.body.bounce.y = 0.15;
    player.body.gravity.y = 125;
    player.body.collideWorldBounds = true;
    //Player animations
    player.animations.add('left', [0, 1, 2, 3], 5 + score * 0.001, true);
    player.animations.add('right', [5, 6, 7, 8], 5 + score * 0.001, true);
    stars = game.add.group();
    stars.enableBody = true;

    // Here we create 12 evenly spaced apart stars
    for (var i = 0; i < 12; i++) {
        // Create stars in the stars group
        var star = stars.create(i * 70, 0, 'star');
        //Star gravity
        star.body.gravity.y = 5;

        //Give the stars random bounce values
        star.body.bounce.y = 10 * Math.random(5) + 1;

    }
    scoreText = game.add.text(16, 16, "Score:" + deaths, {
        fontSize: '32px',
        fill: '#908585'
    });

    itemText = game.add.text(600, 16, "Score:" + deaths, {
        fontSize: '32px',
        fill: '#908585'
    });
    //enemies?
    
    
    //hp
    hpText = game.add.text(300, 16, "Health:" + hp, {
        fontSize: '32px',
        fill: '#908585'
    });



    //here we create the original diamonds
    for (var e = 0; e < 12; e++) {
        //create diamonds inside of diamonds group
        var diamond = diamond.create(e * 70, 0, 'diamond');
        diamond.body.gravity.y = 7;
        //give diamonds random bounce value
        diamond.body.bounce = 0.7 * Math.random() * 0.2;
    }

    

}

function update() {
    
    //hp
    hpTime += 1;
    
   
    
    if (hp < 1) {player.kill()}
    
    
    
    
    
    
    game.physics.arcade.collide(diamond, platforms)




    {
        diamondTiming = diamondTiming + 1
    }



    // Here we create 12 evenly spaced apart stars

    for (var i = 0; i < 18; i++) {
        if (timing > 750 - score/10) {
            // Create stars in the stars group
            var star = stars.create(i * 50, 0, 'star');
            //Star gravity
            star.body.gravity.y = 10 * Math.random();

            //Give the stars random bounce values
            star.body.bounce.y = 10 * Math.random() + 2;
            timing = 0;
            loops += 1;
        } {
            timing = timing + 1
        }

        if (timing > 3999) {
            stars.kill
        }
        //First attempt of enemies





    }



    //Player collision
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    //Inputs
    cursors = game.input.keyboard.createCursorKeys();
    
    //Reset the players velocity
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //Move to the left
        player.body.velocity.x = -100 - score * 0.01;

        player.animations.play('left');

    }
    else if (cursors.right.isDown) {
        //Move to the right
        player.body.velocity.x = 100 + score * 0.01;

        player.animations.play('right');

    }
    
    else if (cursors.down.isDown) {if (player.overlap(collector)) {}}
    else {
        //standing still
        player.animations.stop();
        player.frame = 4;
    }
    // Allowing the player to jump while touching the ground
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -75; jump.play();
    }

    //Dont mind me. Just star physics
    game.physics.arcade.collide(stars, platforms);

    //Colecting stars
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    scoreText.text = "Score: " + score;

    itemText.text = "Food: " + items;
    
    hpText.text = "HP: " + hp;

    if (items > 99) {
        items = 100;
    }

    if (player.overlap(collector)) {
        items += 0.25;
    }

    if (items > 0) {
        if (player.overlap(deposit)) {
            score += 1, items -= 1;
        }

    }
    loop += 1;
    while (gameOver == true) {reload += 1}
    if (reload == 500) {location.reload}
}

function collectStar(player, star) {
     if (hpTime > 100) {
    //Removes the star from the screen
    hp -= 1;
    hpTime = 0;
    whenHit = 1;
    if (hp > 0) {
    hit.play();
    }
    else if (hp == 0) {death.play()
; music.pause();}     }
if (loops == 432) {music.play()}
}

if (score > 10000) {hp += 3}


    music.loop();


