//function onload() {
var vs_entity = '';
var game_start = false;
var AI_color = '';
var p1_color_value = '';
var p2_color_value = '';
var TERRARRAY = [];
window.onload = function () {
var BACKGROUND_COLOR = "#9FF781";
var myFPS = 120;
var AI_Enable = false;
// Map
var rows = 10;
var columns = 10;
var canvas = document.getElementById("canvas");

var TERR_WIDTH = 60;
var TERR_HEIGHT = 50;

var TERRARRAY = [];

// Colors
var TERR_COLOR = "rgb(102, 102, 51)";
var aiColor = "green";
var PLAYERARRAY = [];
var numPlayers = 2;
var playerNum = 0;
var once = true;
var firstTurn = true;
var p1_colorPicker = '';
var p2_colorPicker = '';
var color1 = '';
var color2 = '';

function setPlayerColor() {
	color1 = p1_color_value;
	if(vs_entity == 'solo'){
		color2 = AI_color;
	}
	else{
		color2 = p2_color_value;
	}

	for (var i = 0; i < numPlayers; i++) {
		var COLORARRAY = [color1, color2];
		switch (COLORARRAY[i]) {
			case 'r':
				PLAYERARRAY[i].color = "red";
				break;
			case 'b':
				PLAYERARRAY[i].color = "blue";
				break;
			case 'g':
				PLAYERARRAY[i].color = "green";
				break;
			case 'p':
				PLAYERARRAY[i].color = "pink";
				break;
			default:
				console.log('in default');
				PLAYERARRAY[i].color = "red";
		}
	}
}

function initPlayers() {
	for (var i = 0; i <= numPlayers; i++) {
		PLAYERARRAY.push({
			id: i,
			AP: 5,
			color: "red",
			terr: 0,
			poss: [],
			terrToWin: 75
		});
	}
}

function initGameObjects() {
	initPlayers();
	var terrNum = 0;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			terrNum = (10 * i + j);
			TERRARRAY.push({
				id: terrNum,
				xPos: 0 + 50 * i,
				yPos: 0 + 50 * j,
				xLen: TERR_WIDTH,
				yLen: TERR_HEIGHT,
				team: 0,
				color: TERR_COLOR
			});
		}
	}


	canvas.addEventListener('click', function (evt) {
		var mousePos = getMousePos(canvas, evt);
		var position = calc_position(mousePos);
		conquer(canvas, position);
	}, false);

	var turnButton = document.querySelector(".turn");
	turnButton.addEventListener("click", function (turnEnd) {
	console.log('switching turn');
		turn();
	});
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function updateScore(otherPlayer) {
	var p1_land_to_win, p2_land_to_win;
	if(game_start){
		if (playerNum == '0') {
			console.log(" player color is:" + PLAYERARRAY[playerNum].color + "   playerNum is:" + playerNum + "  player AP is:" + PLAYERARRAY[playerNum].AP);
			//console.log(document.getElementById("p1_AP").innerHTML);
			document.getElementById("p1_AP").innerHTML = "AP: " + PLAYERARRAY[playerNum].AP;
			document.getElementById("p2_AP").innerHTML = "AP: " + PLAYERARRAY[otherPlayer].AP;
			document.getElementById("p1_terr").innerHTML = "Land: " + PLAYERARRAY[playerNum].terr;
			document.getElementById("p2_terr").innerHTML = "Land: " + PLAYERARRAY[otherPlayer].terr;
			p1_land_to_win = 75 - PLAYERARRAY[playerNum].terr;
			p2_land_to_win = 75 - PLAYERARRAY[otherPlayer].terr;
			document.getElementById("p1_terrToWin").innerHTML = "To Win: " + p1_land_to_win;
			document.getElementById("p2_terrToWin").innerHTML = "To Win: " + p2_land_to_win;
		} 
		 if (playerNum == '1'){
			console.log(" player color is:" + PLAYERARRAY[playerNum].color + "  playerNum is:" + playerNum + "  player AP is:" + PLAYERARRAY[playerNum].AP);
			//console.log(document.getElementById("p2_AP").innerHTML);
			document.getElementById("p2_AP").innerHTML = "AP: " + PLAYERARRAY[playerNum].AP;
			document.getElementById("p1_AP").innerHTML = "AP: " + PLAYERARRAY[otherPlayer].AP;
			document.getElementById("p2_terr").innerHTML = "Land: " + PLAYERARRAY[playerNum].terr;
			document.getElementById("p1_terr").innerHTML = "Land: " + PLAYERARRAY[otherPlayer].terr;
			p2_land_to_win = 75 - PLAYERARRAY[playerNum].terr;
			p1_land_to_win = 75 - PLAYERARRAY[otherPlayer].terr;
			document.getElementById("p1_terrToWin").innerHTML = "To Win: " + p1_land_to_win;
			document.getElementById("p2_terrToWin").innerHTML = "To Win: " + p2_land_to_win;
		}
	}
}


function calc_position(mousePos){
	var index = 10 * (Math.ceil(mousePos.x / 50) - 1);
	index += (Math.ceil(mousePos.y / 50) - 1);
	return index;
}


function conquer(canvas, /*ctx,*/ mousePos) {

	PLAYERARRAY[playerNum].poss.push(mousePos);
	if (PLAYERARRAY[playerNum].AP > 0) {
	console.log('mouse Position is: ', mousePos);
		var otherPlayer = (playerNum * (-1)) + 1;

		if ((TERRARRAY[mousePos].color == PLAYERARRAY[otherPlayer].color) && PLAYERARRAY[playerNum].AP > 1) {
			TERRARRAY[mousePos].color = PLAYERARRAY[playerNum].color; //"red";
			if(AI_Enable == true){
				PLAYERARRAY[playerNum].AP -= 1;
			}
			else{
				PLAYERARRAY[playerNum].AP -= 2;
				}
			PLAYERARRAY[playerNum].terr += 1;
			PLAYERARRAY[otherPlayer].terr -= 1;
			updateScore(otherPlayer);
		} else {
			if (TERRARRAY[mousePos].color == TERR_COLOR) {
				TERRARRAY[mousePos].color = PLAYERARRAY[playerNum].color;
				PLAYERARRAY[playerNum].terr += 1;
				PLAYERARRAY[playerNum].AP -= 1;
			if(AI_Enable == true){
				PLAYERARRAY[playerNum].AP -= 1;
			}
			else{
				PLAYERARRAY[playerNum].AP -= 1;
			}
				updateScore(otherPlayer);
			}
		}

	}
	else
	{
		//console.log("AI");

	}
}

function NumberGen()
{
	
	var min = 0;
	var max = 99;
	return Math.floor(Math.random() * (max - min + 1)) + min;
	
}

function drawTerritories() {
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');

		for (var a = 0; a < rows; a++) {
			for (var b = 0; b < columns; b++) {
				var index = (10 * a + b);
				ctx.fillStyle = TERRARRAY[index].color;
				ctx.fillRect(TERRARRAY[index].xPos, TERRARRAY[index].yPos, TERRARRAY[index].xLen, TERRARRAY[index].yLen);
				ctx.beginPath();
				ctx.lineWidth = "2";
				ctx.strokeStyle = "rgb(51, 51, 0)";
				ctx.rect(TERRARRAY[index].xPos, TERRARRAY[index].yPos, TERRARRAY[index].xLen, TERRARRAY[index].yLen);
				ctx.stroke();
			}
		}

	} else {
		// Add code for browsers with no canvas support
	}
}

function getCursorPosition(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	console.log("x: " + x + " y: " + y);
}

function endTurn(value) {
	// if (once == true) {
	// playerAP = value;
	//aiAP = value;
	//} else {
	//}
}

function computerAI() {
	var num_Rounds = PLAYERARRAY[playerNum].AP;
	var conquer_land = false;
	var otherplayer_num= (playerNum * (-1)) + 1;
	console.log("AI position is: ", PLAYERARRAY[playerNum].poss);
	console.log("the length of AI position is: ", PLAYERARRAY[playerNum].poss.length);
	console.log("the other player position is: ", PLAYERARRAY[otherplayer_num].poss);
	console.log("the length of other player position is: ", PLAYERARRAY[otherplayer_num].poss.length);
	var len_array = PLAYERARRAY[playerNum].poss.length;
	var i = 0;
	var h = 0;
	//var start_from = NumberGen();
	var start_from = 0;
	// AP of player equal to yours go thru list and all consecutively
	// else if AP of other player is less then yours add (one) terr of other player
	
	//conquer(canvas, NumberGen())
	//for (i = 0; i <= num_Rounds; i++){
	do {
	//for (; conquer_land == num_Rounds;){
	/*
		This where the smarts should take place such as calculating 
		opponets locations and placing it in a pater like to win based
		on Players Moves. as of now i just have a random number genarator
	 */
		start_from = NumberGen();
		console.log("start from :", start_from);
		if(start_from > 99){
			start_from = 0;
		}
		for (h = 0; h <= len_array ; h++){
			if (PLAYERARRAY[playerNum].poss[h] != start_from){
				conquer_land = true; 
			}
			else{
				conquer_land = false;
			}
		}
		if(conquer_land){
			num_Rounds = num_Rounds - 1;
			conquer(canvas, start_from);
			//start_from = start_from + 1;
			
		}
	}while (num_Rounds >= 0);
	AI_Enable = false;
	turn();
}



function win(playerNum) {
	document.getElementById("winning").style.visibility = "hidden";
	document.getElementById("playAgainMesg").style.visibility = "hidden";

	for (var i = 0; i < numPlayers; i++) {

		if (PLAYERARRAY[i].terr >= 75) {
			document.getElementById("winning").style.visibility = "visible";
			document.getElementById("playAgainMesg").style.visibility = "visible";
			document.getElementById("yes").style.visibility = "visible";
			document.getElementById("no").style.visibility = "visible";
		}
	}
	return PLAYERARRAY[playerNum].terr;
}

function turn() {
	if(game_start){
		playerNum = (playerNum * (-1)) + 1;
		var otherPlayer = (playerNum * (-1)) + 1;
		if(vs_entity == 'solo' && playerNum == 1)
		{
			console.log("This is where AI does its turn");
			AI_Enable = true;
		}
		if(vs_entity == 'solo' && playerNum == 0)
		{
			AI_Enable = false;
		}
		
		console.log(document.getElementById("whoTurn_a").innerHTML);
		if (!playerNum) {
			document.getElementById("whoTurn_a").innerHTML = "Player 1's";
			document.getElementById("whoTurn_a").style.color = PLAYERARRAY[playerNum].color;
			document.getElementById("whoTurn_b").style.color = PLAYERARRAY[playerNum].color;
		} else {
			document.getElementById("whoTurn_a").innerHTML = "Player 2's";
			document.getElementById("whoTurn_a").style.color = PLAYERARRAY[playerNum].color;
			document.getElementById("whoTurn_b").style.color = PLAYERARRAY[playerNum].color;
		}

		var totalTerr = win(playerNum);

		var addAP = Math.ceil(totalTerr / 2);

		if (addAP < 3 && PLAYERARRAY[playerNum].AP < 3) {
			PLAYERARRAY[playerNum].AP = 3;

		} else {

			if (!firstTurn) {

				PLAYERARRAY[playerNum].AP += addAP;
			} else {
				firstTurn = false;
			}
		}
		updateScore(otherPlayer);
	}
}


function territoryGame() {

	if(game_start){
		drawTerritories();
		setPlayerColor();
		if(AI_Enable == true){
		computerAI();
		}
	}

}

initGameObjects();
window.setInterval(territoryGame, 1000 / myFPS); 
};

function startgame(){
	game_start = true;
}


function setcolor(){

p1_color_value = document.getElementById("p1_colorPicker").value;
p2_color_value = document.getElementById("p2_colorPicker").value;

if(vs_entity == 'solo'){
	if(p1_color_value != ''){
		document.getElementById("strtgmbtn").style.visibility="visible";
		document.getElementById("p1_colorPicker").disabled = true;
		document.getElementById("vsAI").disabled = true;
	}
}
else{
	if(p1_color_value != '' && p2_color_value != '' ){
	
		if (p1_color_value == p2_color_value) {
			console.log('same color');
			document.getElementById("sameColorMesg").style.display = "block";
			document.getElementById("sameColorMesg").style.visibility = "visible";
		}
		else{
			document.getElementById("strtgmbtn").style.visibility="visible";
			document.getElementById("p1_colorPicker").disabled = true;
			document.getElementById("p2_colorPicker").disabled = true;
			document.getElementById("vsAI").disabled = true;
			document.getElementById("sameColorMesg").style.visibility = "hidden";
		}
	}

}
}

function vsselect(){
vs_entity = document.getElementById("vsAI").value;

	if(vs_entity == 'solo')
	{
		document.getElementById("player_one").style.visibility="visible";
		AI_color = 'r';
	}
	else{
		console.log('displaying other players bars');
		document.getElementById("player_one").style.visibility="visible";
		document.getElementById("player_two").style.visibility="visible";
		document.getElementById("AIOption").style.visibility="hidden";
	}
}


