const timeToAnswer = 10000;
const timeToReveal = 3000;


$(document).ready(function() {


function TriviaQuestion(question,answerChoices,correctChoice){
	this.question = question;
	this.answerChoices = answerChoices;
	this.correctChoice = correctChoice;
	this.displayQuestion = function(){		
		$(".triviaChoice").show();
			$("#question").text(this.question);
			$("#choiceOne").text(this.answerChoices[0]);
			$("#choiceTwo").text(this.answerChoices[1]);
			if(this.answerChoices[2] !== ""){
				$("#choiceThree").text(this.answerChoices[2]);
			}else{
				$("#choiceThreeDiv").hide();
				// $("#choiceFourDiv").hide();
			}
			if(this.answerChoices[3] !== ""){
				$("#choiceFour").text(this.answerChoices[3]);
			}else{
				$("#choiceFourDiv").hide();
			}
	};
}

var TriviaArray = {
	array: [],
	qIndex: -1,
	numCorrect: 0,
	numIncorrect: 0,
	questionTimer:  setInterval(function(){TriviaArray.countdown();},100), 
	timeRemaining: timeToAnswer,
	numConsecutiveCountouts: 0,
	countdown: function(){
		this.timeRemaining-=100;
		this.displayTime();
		if(this.timeRemaining <= 4000){
			$("#timeRemaining").addClass("flashTimer");
		}else{
			$("#timeRemaining").removeClass("flashTimer");
		}
		if(this.timeRemaining === 0){
			this.outOfTime();
		}
	},
	playSound: function(source){
	var audio = new Audio(source);
	audio.play()
	},
	setUpMusic: function(){
		console.log("in music");
	var audioPlayer = document.getElementById("bgMusic");;
	console.log(audioPlayer);
	//player.volume = .2;
	audioPlayer.loop = true;
	audioPlayer.autoplay = true;
	}, 
	startTimer: function(){
		clearInterval(this.questionTimer);
		this.timeRemaining = timeToAnswer;
		this.questionTimer = setInterval(function(){TriviaArray.countdown();},100);
	},
	clearAnswerFields: function(){
		$("#choiceOne").text("");
		$("#choiceTwo").text("");
		$("#choiceThree").text("");
		$("#choiceFour").text("");
	},
	displayTime: function(){
		var seconds;
		var miliseconds;
		
		if(this.timeRemaining > 0){
			seconds = Math.floor(this.timeRemaining/1000);
			miliseconds = this.timeRemaining - seconds * 1000;
			miliseconds = miliseconds/100
			
		}else{
			seconds = "0";
			miliseconds = "000"
		}
			$("#timeRemaining").text(seconds+":"+miliseconds);
	},
	getQuestion: function(){
		$(".triviaChoice").removeClass("wrongAnswer");
		$(".triviaChoice").removeClass("correctAnswer");
		$("#questionDiv").removeClass("wrongAnswer");
		if(this.numConsecutiveCountouts === 3){
			alert("You have been inactive for too long, Game Timed Out")
			this.displayStartScreen();
		}else if(this.qIndex === this.array.length-1){
			this.displayScoreScreen();
		}else{
		this.qIndex++;		
		this.startTimer();
			console.log(this.array);
			//this.qIndex = randomInt(0,this.array.length);
			console.log(this.qIndex);
			console.log(this.array[this.qIndex].correctChoice);
			//console.log(this.trivia);
			this.clearAnswerFields();
				this.array[this.qIndex].displayQuestion();
			}
				
	},
	displayScoreScreen: function(){
			console.log("in dss");
		this.numConsecutiveCountouts = 0;
		clearInterval(this.questionTimer);
		// $("#content").css("display","none");
		$("body").css("background","rgba(0,0,0,0.8");
		$("#content").hide();
		$("#titleDiv").css("display","block");
		$("#startButton").css("display","block");
		$("#titleDiv").html("<h3>Wins: " + this.numCorrect +"<br> Losses: " + this.numIncorrect+"</h3>");
		$("#startButton").html("<h3>Play Again?</h3>");

	},
	displayStartScreen: function(){
		console.log("in dss");
		this.numConsecutiveCountouts = 0;
		clearInterval(this.questionTimer);
		// $("#content").css("display","none");
		$("body").css("background","rgba(0,0,0,0.8");
		$("#content").hide();
		$("#titleDiv").css("display","block");
		$("#titleDiv").html("<h3>Classic Movies<br> Trivia Game</h3>")
		$("#startButton").css("display","block");
		$("#startButton").html("<h3>Start Game</h3>");
		$("#startButton").on("click",function(){
			console.log("Start Click");
			this.numConsecutiveCountouts = 0;
		clearInterval(this.questionTimer);
			TriviaArray.qIndex = -1;
			// $("#content").css("display","block");
			$("#content").show();
			$("#titleDiv").css("display","none");
			$("#startButton").css("display","none");
			TriviaArray.getQuestion();
		});
	},
	correctAnswer: function(answerDiv){
		this.numConsecutiveCountouts = 0;
		//answerDiv.children().text("Correct");
		if(this.timeRemaining > 0){
		answerDiv.addClass("correctAnswer");
		this.numCorrect++;
		$("#wins").text(this.numCorrect);
		console.log("Correct");
		clearInterval(this.questionTimer);
		setTimeout(function(){TriviaArray.getQuestion();},timeToReveal);
			}
	},
	incorrectAnswer: function(answerDiv){
		this.numConsecutiveCountouts = 0;
		console.log("in Incorrect");
				answerDiv.children().text("Incorrect");
				answerDiv.addClass("wrongAnswer");
				var rightAnswer = this.getCorrectAnswer();
				console.log(rightAnswer);
				//$(rightAnswer).children().text("Correct");
				$(rightAnswer).addClass("correctAnswer");

			console.log("Incorrect");
			this.numIncorrect++;
			$("#losses").text(this.numIncorrect);
			clearInterval(this.questionTimer);
			setTimeout(function(){TriviaArray.getQuestion();},timeToReveal);
	},
	getCorrectAnswer: function(){
		
		//console.log("in correct");
		console.log(TriviaArray.array[TriviaArray.qIndex].correctChoice);
		switch(TriviaArray.array[TriviaArray.qIndex].correctChoice){
		case 1:  
		return "#choiceOneDiv";
		break;
		case 2:
		return "#choiceTwoDiv";
		break;
		case 3:
		return "#choiceThreeDiv";
		break;
		case 4:
		return "#choiceFourDiv";
		break;
	}
	},
	outOfTime(){
		this.numIncorrect++;
		$("#losses").text(this.numIncorrect);
		$("#questionDiv").addClass("wrongAnswer");
		$("#question").text("OUT OF TIME");
		this.numConsecutiveCountouts++;
		var rightAnswer = this.getCorrectAnswer();
				console.log(rightAnswer);
				//$(rightAnswer).children().text("Correct");
				$(rightAnswer).addClass("correctAnswer");
		setTimeout(function(){TriviaArray.getQuestion();},timeToReveal);
	}
}

TriviaArray.array.push(new TriviaQuestion("Who was the first female monster to appear in a movie",["Morticia", "Roseanne Barr", "Bride of Frankinstein", "Bride of the Mummy"],3));
TriviaArray.array.push(new TriviaQuestion("In \"The Godfather,\" who was murdered in the causeway?", ["Sonny", "Luca Brasi", "Moe Greene","Paulie"],1));
TriviaArray.array.push(new TriviaQuestion("Who was Scarlett O\'Hara\'s second husband?",["Rhett Butler","Frank Kennedy","Ashley Wilkes","Charles Hamilton"],2));
TriviaArray.array.push(new TriviaQuestion("In \"Shawshank Redemption,\" what does Andy request in his weekly letters to the state?",["A library in the prison", "Better medical care in the prison", "Better food in the prison","A workout facility in the prison"],1));
TriviaArray.array.push(new TriviaQuestion("Which of the following movies was NOT set during World War II?", ["Midway","Casablanca","Apocalypse Now","Patton"],3));
TriviaArray.array.push(new TriviaQuestion("In \"The Wizard of Oz,\" Tin Man wished for a brain.", ["True","False","",""],2));
TriviaArray.array.push(new TriviaQuestion("On what national memorial did Cary Grant end up in \"North by Northwest?\"", ["Washington Monument","Mount Rushmore","Grant\'s Tomb","Lincoln Memorial"],2));
TriviaArray.array.push(new TriviaQuestion("What are the names of the rival gangs in \"West Side Story?\"",["Sharks and Tigers","Jets and Tigers","Sharks and Jets","Lions and Panthers"],3));
TriviaArray.array.push(new TriviaQuestion("The line \"Snakes. Why\'d it have to be snakes?\" comes from which movie?", ["Raiders of the Lost Ark","Star Wars","Anaconda","Snakes on a Plane"],1));
TriviaArray.array.push(new TriviaQuestion("In which of the following films did Robert Duvall NOT appear?", ["To Kill a Mockingbird","The Godfather","Tender Mercies","One Flew Over the Cuckoo\'s Nest"],4));
TriviaArray.setUpMusic();
$(".triviaChoice").on("click", answerCheck);
TriviaArray.displayStartScreen();

function answerCheck(){
	console.log(parseInt($(this).attr("data-choice")));
		if(parseInt($(this).attr("data-choice")) === TriviaArray.array[TriviaArray.qIndex].correctChoice){
		
		TriviaArray.correctAnswer($(this));
		}else{
	TriviaArray.incorrectAnswer($(this));
	}
};
function randomInt(min,max){
	return Math.floor((Math.random() * max) + min);
}

});