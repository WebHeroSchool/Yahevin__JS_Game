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
let multiplier = 1;

let emoji = document.createElement('span');
emoji.innerHTML = '🐭';
emoji.classList.add('emoji');
let failEmoji = document.createElement('span');
failEmoji.classList.add('failEmoji');

let animated = document.getElementById('star');

let timerOther;
let timerMouse;

function createFailImg () {
	var failEmojiImg = (Math.floor(Math.random() * 5) + 1);
	switch (failEmojiImg) {
		case 1:	
			failEmoji.innerHTML ='🐷';
			break;
		case 2:	
			failEmoji.innerHTML = '🐵';
			break;
		case 3:	
			failEmoji.innerHTML = '🐱';
			break;
		case 4:	
			failEmoji.innerHTML = '🐼';
			break;
		case 5:	
			failEmoji.innerHTML = '🦊';
			break;
	}
}
function startPlay () {
	if (PlayInfo.health > 0) {
		emojiGen ();
	}
	else {
		endGame ();
	}
	upHardness ();
}
function upHardness () {
		if (hardness === 5) {
		hardness = 0;
		multiplier += 1; 
		animated.innerHTML = multiplier;
		animated.classList.add('stats__starBar_animation');
		animated.addEventListener("animationend", listener, false);
		animated.addEventListener("animationstart", listener, false);
		function listener(animated) {
			let anim = document.getElementById('star');
			if (animated.type === "animationend") {
				anim.classList.remove('stats__starBar_animation');
			}
		}
	}
}
function failed () {
	healthId = document.getElementById('health' + PlayInfo.health);
	healthId.classList.remove('alive');
	healthId.classList.add('fired');
	PlayInfo.health -= 1;
	failEmoji.onclick = function() {};
	console.log('зря-зря-зря');
	endRound ();	
}
function catched () {
	PlayInfo.score += 10;
	score.innerHTML = PlayInfo.score;
	emoji.onclick = function() {};
	console.log('поймал мышь');
	hardness += 1;
	endRound ();
}
function emojiGen () {
	boxId = document.getElementById('box' + (Math.floor(Math.random() * 5) + 1));
	random = Math.random();
	if (random < 0.4) {
		timerOther = setTimeout(endRound,2000/(Math.pow(multiplier,0.5)));}
	else {
		timerMouse = setTimeout(failed,2000/(Math.pow(multiplier,0.5)));};
	
	if (random > 0.4) {
		boxId.appendChild(emoji);
		emoji.onclick = function() {
		clearTimeout (timerMouse);
	   	catched ();
	 	}
	} 
	else {
		createFailImg ()
		boxId.appendChild(failEmoji);
      	failEmoji.onclick = function() {
      	clearTimeout (timerOther);
	   	failed ();
	   	}
	}
}
function endRound () {
	(random > 0.4) ?
	boxId.removeChild(emoji) : boxId.removeChild(failEmoji);
	startPlay ();
}

let endBar__scoreId = document.getElementById('endBar__scoreId');
let endBar = document.getElementById('endBar');

function endGame () {
	endBar__scoreId.innerHTML = PlayInfo.score;
	endBar.classList.remove('info__hidden');
	startButton.onclick = function() {
		startPlay ();
		startButton.onclick = function() {};
	}
	PlayInfo.score = 0;
	score.innerHTML = '000';
	PlayInfo.health = 3;
	animated.innerHTML = '1';
	multiplier = 1;
	hardness = 0;
	for (i=1; i<4; ++i) {
		healthId = document.getElementById('health' + i);
		healthId.classList.remove('fired');
		healthId.classList.add('alive');
	}	
}	

let startButton = document.getElementById('start');
startButton.onclick = function() {
	startPlay ();
	startButton.onclick = function() {};
}
let infoBar = document.getElementById('info');
let rulesButton = document.getElementById('rules');
rulesButton.onclick = function() {
	infoBar.classList.remove('info__hidden');
	setTimeout(function() {
		infoBar.classList.add('info__hidden')},
		6000);
}
let okButton = document.getElementById('mainBar_ok');
okButton.onclick = function() {
	infoBar.classList.add('info__hidden');
}	
let endBarOkButton = document.getElementById('endBar_ok')
endBarOkButton.onclick = function() {
	endBar.classList.add('info__hidden');}