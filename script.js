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

let timerOther;
let timerMouse;
let infoBar;

function createFailImg () {
	var failEmojiImg = (Math.floor(Math.random() * 5) + 1);
	console.log(failEmojiImg);
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
	if (hardness === 5) {
		hardness = 0;
		multiplier += 1; 
	}
	if (PlayInfo.health > 0) {
		emojiGen ();
	}
}
function failed () {
	healthId = document.getElementById('health' + PlayInfo.health);
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
	if (random < 0.5) {
		timerOther = setTimeout(endRound,3000/multiplier);}
	else {
		timerMouse = setTimeout(failed,3000/multiplier);};
	
	if (random > 0.5) {
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
	(random > 0.5) ?
	boxId.removeChild(emoji) : boxId.removeChild(failEmoji);
	startPlay ();
}
let rulesButton = document.getElementById('rules');
rulesButton.onclick = function() {
	infoBar = document.getElementById('info');
	infoBar.classList.remove('button__hidden');
	setTimeout(function() {
		infoBar.classList.add('button__hidden')},
		6000);
}
let startButton = document.getElementById('start');
startButton.onclick = function() {
	if (infoBar) {
	infoBar.classList.add('button__hidden');}
	startPlay ();
}