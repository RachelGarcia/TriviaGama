var gameQuestions = [
	{question:'Who is the current Bachelor?', answer1:'Nick', answer2:'Ben', answer3:'Shawn', answer4:'Henry', correctAnswer:'Nick'},

	{question:'Which Bachelortte is going to win this season of the Bachelor?', answer1:'Rachel', answer2:'Whitney', answer3:'Liz', answer4:'Vanessa', correctAnswer:'Vanessa'},

	{question:'Who will be the next Bachelorette', answer1:'Crystal', answer2:'Rachel', answer3:'Vanessa', answer4:'Megan', correctAnswer:'Rachel'},

	{question:'Who is the Bachelor host? ', answer1:'Chris', answer2:'Anthony', answer3:'Nick', answer4:'Frank', correctAnswer:'Chris'},

	{question:'How many weeks does the Bachelor air on TV', answer1:'15', answer2:'13', answer3:'16', answer4:'8', correctAnswer:'8'},

]


var randomizer;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var newQandA;
var totalQuestions = 0;
var countdown;
var remainingTime = 10;

$(document).ready(function(){
		
	$('#startButton').on('click', function(){

		getQandA();

	})

	$('#answer1').on('click', function(){

		var answer = $(this).html();
		checkAnswer(answer);

	})

	$('#answer2').on('click', function(){

		var answer = $(this).html();
		checkAnswer(answer);

	})

	$('#answer3').on('click', function(){

		var answer = $(this).html();
		checkAnswer(answer);

	})

	$('#answer4').on('click', function(){

		var answer = $(this).html();
		checkAnswer(answer);

	})

})

function getQandA(){

	if (totalQuestions <= 3) {

		randomizer = gameQuestions[Math.floor(Math.random()*gameQuestions.length)];
		$('#startButton').hide();

		timer();
		$('#remainingTime').html('<h2> Remaining Time: ' + remainingTime + '</h2>');
		clearPrompt();
		$('#question').html(randomizer.question);
		$('#answer1').html(randomizer.answer1);
		$('#answer2').html(randomizer.answer2);
		$('#answer3').html(randomizer.answer3);
		$('#answer4').html(randomizer.answer4);
		clearInterval(newQandA);

	} else {

		$('#question').html('Here are your results');
		$('#prompt1').html('Incorrect Answers: ' + incorrectAnswers)
		$('#prompt2').html('Correct Answers: ' + correctAnswers)
		$('#prompt3').html('Unanswered: ' + unanswered)
		clearAnswer();	
		clearInterval(newQandA);
		createResetButton();

	}

}

function showNewQandA(){
	newQandA = setInterval(getQandA, 3000);
	remainingTime = 10;
}

function countdown(){

	if (remainingTime >= 0) {
		$('#remainingTime').html('<h2> Remaining Time: ' + remainingTime + '</h2>');
		remainingTime-= 1;

	} else {

	clearInterval(countdown);
	unanswered++;
	totalQuestions++;
	$('#prompt1').html('You are out of time');
	$('#prompt2').html('The correct answer is ' + randomizer.correctAnswer);
	clearAnswer();	
	showNewQandA();

	}	
}

function timer(){
	countdown = setInterval(countdown, 1000);
}

function resetGame(){

		correctAnswers = 0;
		incorrectAnswers = 0;
		unanswered = 0;
		totalQuestions = 0;
		getQandA();
		$('.resetButton').hide();
}

function createResetButton(){

	var x = $('<button>')
    x.addClass('resetButton');
    x.text('Start Over');
    $('#GameBoard').append(x);

}

function checkAnswer(answer) {

	if (answer == randomizer.correctAnswer) {

		clearInterval(countdown);
		correctAnswers++;
		totalQuestions++;
		console.log(totalQuestions);
		$('#prompt1').html('Correct');
		clearAnswer();	
		showNewQandA();

	} else {

		clearInterval(countdownTime);
		incorrectAnswers++;
		totalQuestions++;
		console.log(totalQuestions);
		$('#prompt1').html('Incorrect');
		$('#prompt2').html('The correct answer is ' + randomizer.correctAnswer);
		clearAnswer();			
		showNewQandA();

	}
}

function clearAnswer(){

	$('#answer1').empty();
	$('#answer2').empty();			
	$('#answer3').empty();
	$('#answer4').empty();

}

function clearPrompt(){

	$('#prompt1').empty();
	$('#prompt2').empty();			
	$('#prompt3').empty();

}

$(document).on('click', '.resetButton', resetGame);



