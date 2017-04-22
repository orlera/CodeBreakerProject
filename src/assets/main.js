Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');

    if (validateInput(input.value)) {
		if (answer.value == '' && attempt.value == '') { 
		    setHiddenFields();
		}
		attempt.value = parseInt(attempt.value) + 1;
		if (getResults(input.value)) {
			setMessage("You Win! :)");
			showAnswer(true);
			showReplay();
		}
		else {
			if (parseInt(attempt.value) >= 10) {
				setMessage("You Lose! :(");
				showAnswer(false);
				showReplay();
			}
			else {
				setMessage("Incorrect, try again.");
			}

		}
	}
	else {
		return false;
	}
}

function setHiddenFields() {
	let guess = Math.floor(Math.random() * 10000);
	answer.value = guess.pad(4);
	attempt.value = 0;
}

function setMessage(message) {
	let messageLabel = document.getElementById('message');
	messageLabel.innerHTML = message;
}

function validateInput(input) {
	if (String(input).length == 4) {
		setMessage('');
		return true;
	}
	else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(input) {
	let result = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
	let char_res = '';
	let ans = answer.value;
	let correct = true;
	for (let i = 0; i < input.length; i++) {
		if (input[i] == ans[i]) {
			char_res = '<span class="glyphicon glyphicon-ok"></span>';
		} else if (input[i] == ans[0] || input[i] == ans[1] || input[i] == ans[2] || input[i] == ans[3]) {
			char_res = '<span class="glyphicon glyphicon-transfer"></span>';
			correct = false;
		}
		else {
			char_res = '<span class="glyphicon glyphicon-remove"></span>';
			correct = false;
		}
		result += char_res;
	}
	result += '</div></div>';

	result = document.getElementById('results').innerHTML + result;
	document.getElementById('results').innerHTML = result;
	return correct;
}

function showAnswer(success) {
	let classToAdd = ' failure';
	document.getElementById('code').innerHTML = answer.value;
	if (success) {
		classToAdd = ' success';
	}
	document.getElementById('code').className += classToAdd;
}

function showReplay() {
	document.getElementById('guessing-div').style.display = 'none';
	document.getElementById('replay-div').style.display = 'block';
}