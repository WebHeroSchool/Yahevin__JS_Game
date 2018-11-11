let PlayInfo = {
	wePlaying: false,
	score: 0,
	health: 3
}
let random;
let chekClicked;
let boxId;
let healthId;
let hardness = 0;

let emoji = document.createElement('span');
emoji.innerHTML = '🐭';
emoji.classList.add('emoji');
let failEmoji = document.createElement('span');
failEmoji.innerHTML = '🐷';
failEmoji.classList.add('failEmoji');

class PlaySource {
	catched () {
		PlayInfo.score += 10;
		score.innerHTML = PlayInfo.score;
		emoji.onclick = function() {};
		chekClicked = true;
		console.log('поймал мышь');
		hardness += 1;
		}
	failed () {
		healthId = document.getElementById('health' + PlayInfo.health);
		healthId.classList.add('fired');
		PlayInfo.health -= 1;
		failEmoji.onclick = function() {}
		chekClicked = true;
		console.log('поймал свинью');
	}
	emojiGen () {
		boxId = document.getElementById('box' + (Math.floor(Math.random() * 5) + 1));			
		random = Math.random();
		if (random > 0.5) {
			boxId.appendChild(emoji);
			emoji.onclick = function() {
	      	newGame.catched ();
	      	}
		} 
		else {
			boxId.appendChild(failEmoji);
      		failEmoji.onclick = function() {
	      		newGame.failed ();
	      	}
		}
	}
}

let multiplier = 1;
function startPlay () {
	if (PlayInfo.health > 0) {
		startButton.onclick = function() {};
		chekClicked = 0;
		newGame.emojiGen ();
		if (hardness === 5) {
			hardness = 0;
			multiplier += 1; 
		}
		setTimeout(function() {

			(random > 0.5) ?
			boxId.removeChild(emoji) : boxId.removeChild(failEmoji);
			return startPlay ();	
		}, 3000/multiplier);
	}
	else {alert(PlayInfo.score)};
}
let newGame = new PlaySource();
let startButton = document.getElementById('start');
startButton.onclick = function() {
	startPlay ();
}
let rulesButton = document.getElementById('rules');

rulesButton.onclick = function() {
	let infoBar = document.getElementById('info');
	infoBar.classList.remove('header__hidden');
	setTimeout(function() {
		infoBar.classList.add('header__hidden')},
		3000);
}

