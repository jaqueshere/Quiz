$(document).ready(function() {

	load();
	console.log(assess.submit)
	$('.pushbutton').click(function() {
		if (assess.submit) {
			/* trigger assessment */
			assess.check();
			assess.submit = false;
			$('.pushbutton').text("Next");
		}
		else {
			assess.progress();
			assess.submit = true;
			load();
		}
		
	});
});

var assess = {
	complete: 0,
	missed: [],
	correct: [],
	total: 0,
	submit: true,
	progress: function() { 
		this.complete = this.complete + 1;
	},
	check: function() {
		/*Need to compare question[x][2] to user's answer
		 *Then update missed or correct and total, and 
		 *display feedback
		 */
		 if ($('#quizoptions input[type="radio"]:checked').val() == questions[assess.complete][3]){
		 	this.total = this.total + 1;
		 	this.correct.push(assess.complete);
		 }
		 else {
		 	this.missed.push(assess.complete);
		 }
	},
};

var questions = [["There is a fork in the road. Down one path is the city of liars. Down the other is the city of truth tellers. An old man comes down one path. What question should you ask him to find out if he's a liar?",["Is Pepsi better than Coke?", "Where would someone from the other direction tell me he came from?", "Are you a tree frog?", "Any of the above"], 3],
	["If every dinosaur is an animal, and  every animal believes in causation: ",["The dinosaurs died out because of a meteor.", "The dinosaurs died out because of a volcano.", "The dinosaurs died out from smoking cigarettes.", "The dinosaurs could not have understood Bob Dylan."], 3],	
	["The purpose of socks is: ",["to keep feet warm.", "to make you taller.", "to give you something to fold at the laundromat.", "to entertain dogs."], 2],
	["If Sam can never find his keys after a night at Johny Brenda's wine bar, and on a Tuesday night Leslie finds Sam's keys:",["Leslie did not go to Johny Brenda's.", "Leslie kept the keys in her purse Tuesday.", "Leslie has studied quantum mechanics.", "Leslie knows Kung Fu."], 3],
	["If a girl asks a guy what his sign is, there is a 1/11 probability that his sign is Scorpio. If she tells him her sign is Scorpio and asks him what his sign is, the probability his sign is Scorpio is: ",["1/11", "1/12", "1/5", "1/3"], 3]];

function load() {
	$('#quizoptions input[type="radio"]').each(function() {
		this.checked=false;
	});
	$('.stem-text').text(questions[assess.complete][0]);
	$('#optionradio1').text(questions[assess.complete][1][0]);
	$('#optionradio2').text(questions[assess.complete][1][1]); 
	$('#optionradio3').text(questions[assess.complete][1][2]);
	$('#optionradio4').text(questions[assess.complete][1][3]);
	$('.pushbutton').text("Submit");
} 