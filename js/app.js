// Enemies our player must avoid
var Enemy = function() {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';

	// Here the initial location variables for x and y coordinates
	// are defined. The x value is negative because the enemy is supposed
	// to be instantiated outside of the canvas and then be moved afterwards.
	this.x = -101;

	// The y value is a randomized multiple of 83, because it is supposed to
	// be rendered in the middle of the rows 2,3 or 4. For reference see:
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	this.y = (83 * (Math.floor(Math.random() * (4 - 1)) + 1)) - 30; //-30 is to set the enemies 30 pixels higher.

	// The speed is randomly created in the interval between 1 (included) and 4 (excluded)
	this.speed = Math.random() * (4 - 1) + 1;
};

// Update the enemy's position, required method for the game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// The movement is calculated as the travelled distance to the next column
	// by multiplying speed, pixel distance (101) and time delta between ticks
	this.x = this.x + (this.speed * 101 * dt);

	// With the following instructions every time an enemy passes the screen
	// it will be deleted from the array allEnemies and afterwards a new
	// enemy object is instantiated.
	if (this.x > 505) {
		var findIndex = allEnemies.indexOf(this);
		allEnemies.splice(findIndex, 1);
		allEnemies.push(new Enemy());
	}

	// Check for collision here. Distance between enemy.sprite
	// and player.sprite without collision is fixed due to image sizes
	// First calculate the distance between entities and store it in a variable.
	// Afterwards check if entities are on the same row and if their distance
	// falls in the collision interval. If so, reset the player.
	var entityDistance = this.x - player.x;
	if (this.y == player.y && entityDistance > -61 && entityDistance < 40) {
		player.reset();
	}
};

// Draw the enemy on the screen, required method for the game
Enemy.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
	// The image/sprite for our player
	this.sprite = 'images/char-boy.png';

	// Here the initial location variables for x and y coordinates
	// are defined. The multiplication syntax was kept in order to
	// symbolize the organisation in rows and columns of the game.
	this.x = 101 * 2;
	this.y = 83 * 5 - 30; //-30 is an offsett to put the player in the middle of the row
};

// Update the player's position, required method for the game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
	// When the player reaches the water, his position is reset to start anew
	if (this.y < 53) {
		this.reset();
	}
};

// Draw the player on the screen, required method for the game
Player.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
	// In the first condition check the pressed key
	// In the second condition check if the player would move out of bounds
	// There is no second condition for the first case since the player
	// is automatically reset to start when he reaches the water.
	if (keyCode == 'up') {
		this.y = this.y - 83;
	}
	else if (keyCode == 'down' && this.y < 83 * 5 - 30) {
		this.y = this.y + 83;
	}
	else if (keyCode == 'left' && this.x > 101 * 0) {
		this.x = this.x - 101;
	}
	else if (keyCode == 'right' && this.x < 101 * 4) {
		this.x = this.x + 101;
	}
};

// A simple helper procedure to reset the player to its initial location
// and to increase readability.
Player.prototype.reset = function() {
	this.x = 101 * 2;
	this.y = 83 * 5 - 30;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
nrOfEnemies = 3;
for (i = 0; i < nrOfEnemies; i++) {
		allEnemies.push(new Enemy());
}

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
