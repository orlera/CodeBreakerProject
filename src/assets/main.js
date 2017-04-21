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