// enum
var eRock = 1;
var ePaper = 2;
var eScissors = 3;
// enum
var eWin = 1;
var eLose = 2;
var eDraw = 3;

var oPlayerChoice = new Object();
oPlayerChoice.Rock = 0;
oPlayerChoice.Paper = 0;
oPlayerChoice.Scissors = 0;
var oComputerChoice = new Object();
oComputerChoice.Rock = 0;
oComputerChoice.Paper = 0;
oComputerChoice.Scissors = 0;

var oLog = new Object();
oLog.wins = 0;
oLog.losses = 0;
oLog.draws = 0;
oLog.getStatistic = function() {
	return '' + oLog.wins + ((oLog.wins<=1)?' Win ':' Wins ') +
				oLog.losses + ((oLog.losses<=1)?' Loss ':' Losses ') +
				oLog.draws + ((oLog.draws<=1)?' Draw ':' Draws ');
}

function RPS(playerChoice, computerChoice){
	var result = eDraw;
	switch(playerChoice){
		case eRock:
			if(computerChoice == ePaper) 	result = eLose;
			if(computerChoice == eScissors) result = eWin;
			break;
		case ePaper:
			if(computerChoice == eRock) 	result = eWin;
			if(computerChoice == eScissors) result = eLose;
			break;
		case eScissors:
			if(computerChoice == ePaper) 	result = eWin;
			if(computerChoice == eRock) 	result = eLose;
			break;
	}
	return result;
}

function recordTheGame(playerChoice, computerChoice, gameResult){
	switch(playerChoice){
		case eRock:
			oPlayerChoice.Rock++;
			break;
		case ePaper:
			oPlayerChoice.Paper++;
			break;
		case eScissors:
			oPlayerChoice.Scissors++;
			break;
	}
	
	switch(computerChoice){
		case eRock:
			oComputerChoice.Rock++;
			break;
		case ePaper:
			oComputerChoice.Paper++;
			break;
		case eScissors:
			oComputerChoice.Scissors++;
			break;
	}

	switch(gameResult){
		case eWin:
			oLog.wins++;
			break;
		case eLose:
			oLog.losses++;
			break;
		case eDraw:
			oLog.draws++;
			break;
	}
}

function getChoiceName(id){
	switch(id){
		case eRock:
			return '<img class="imgRock"></img>';
		case ePaper:
			return '<img class="imgPaper"></img>';
		case eScissors:
			return '<img class="imgScissors"></img>';
	}
}

function getResultMsg(id){
	switch(id){
		case eWin:
			return 'You Win.';
		case eLose:
			return 'You Lose.';
		case eDraw:
			return 'The game ended in a draw.';
	}
}

function process(playerChoice){
	
	var computerChoice = Math.floor((Math.random()*3)+1);
	var gameResult = RPS(playerChoice, computerChoice);
	
	// recordTheGame
	recordTheGame(playerChoice, computerChoice, gameResult);
	
	// display the game result
	var result = 'You are <strong>' + getChoiceName(playerChoice) + '</strong>, ';
	result += 'Computer is <strong>' + getChoiceName(computerChoice) + '</strong>.';
	result += '<p> So <strong class="msg">' + getResultMsg(gameResult) + '</strong></p>';
	document.getElementById('outputArea').innerHTML = result;
	
	// display log
	var log = '' + oLog.getStatistic();
	document.getElementById('log').innerHTML = log + '<br>';
}