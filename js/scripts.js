$(document).ready(function() {
	newQuiz.start();
	$('.pushbutton').click(function() {
		if (newQuiz.submit) {
			/* triggers assessment and switches to 'next' button */
			newQuiz.next();
		}
		else {
			/* advances to next question.
			 * the variable 'submit' tracks whether 
			 * to the user is submitting or moving on*/
			newQuiz.progress();
			newQuiz.submit = true;
		}		
	});
});

var newQuiz = {
	/* 'complete' tracks the user's progress.
	 * 'missed' and 'correct' can be used to show the 
	 * user which items were missed and answered correctly
	 * at end of quiz */
	complete: 0,
	missed: [],
	correct: [],
	total: 0,
	submit: true,
	progress: function() { 
		this.complete = this.complete + 1;
		if (this.complete > 4) {
			this.end();
		}
		else {
			this.load();
		}
	},
	check: function() {
		/*Need to compare question[x][2] to user's answer
		 *Then update missed or correct and total, and 
		 *display feedback
		 */
		 if ($('#quizoptions input[type="radio"]:checked').val() == questions[this.complete][2]){
		 	this.total = this.total + 1;
		 	this.correct.push(this.complete);
		 	$('#quizoptions input[type="radio"]:checked').next().css("color", "green");
		 }
		 else {
		 	this.missed.push(this.complete);
		 	$('#quizoptions input[type="radio"]:checked').next().css("color", "red");
		 }
	},
	start: function() {
		$('.options-overlay').css("visibility", "hidden");
		$('.buttons').css("visibility", "hidden");
		$('#message').text('This is a brief quiz on some key points of early Andean art. The questions cover the Early Horizon to Late Horizon periods. Click anywhere to proceed.');
		$('.welcome').click(function() {
			$('.welcome').css("visibility", "hidden");
			$('.buttons').css("visibility", "visible");
			$('.options-overlay').css("visibility", "visible");
			newQuiz.load();
		});
	},
	load: function() {
		$('#quizoptions input[type="radio"]').each(function() {
			this.checked=false;
		});
		$('.optionradio').css("color", "white");
		$('.stem-text').text(questions[this.complete][0]);
		$('#optionradio1').text(questions[this.complete][1][0]);
		$('#optionradio2').text(questions[this.complete][1][1]); 
		$('#optionradio3').text(questions[this.complete][1][2]);
		$('#optionradio4').text(questions[this.complete][1][3]);
		$('.pushbutton').text("Submit");
		$('.pushbutton').css("color", "black");
	}, 
	next: function() {
		this.check();
		this.submit = false;
		$('.pushbutton').text("Next");
		$('.pushbutton').css("color","red");
	},
	end: function() {
		$('#message').text('You achieved a score of: ' + this.total);
		$('.welcome').css("visibility", "visible");
		$('.options-overlay').css("visibility", "hidden");
	}
};

var questions = [["Which of the following cultures was the earliest to export its religious imagery to neighboring cultures?",["Inca", "Chimu", "Tiwanaku", "Chavin"], 3],
	["Which period of Nasca ceramics is typified by naturalistic, three-dimensional figures?",["Early", "Middle", "Late", "Devonian"], 0],	
	["Which of these cultures is known for producing highly individualized portraiture in its ceramics?",["Paracas", "Nasca", "Moche", "Wari"], 2],
	["Which of these cultures deliberately introduced small irregularities in otherwise perfectly repeated textile patterns?",["Paracas", "Nasca", "Wari", "Inca"], 2],
	["Which culture's stonework did the Incas look to for inspiration?",["Nasca", "Wari", "Lambayeque", "Tiwanaku"], 3]];
