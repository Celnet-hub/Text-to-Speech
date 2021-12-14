// Initialize new SpeechSynthesisUtterance object
let speech = new SpeechSynthesisUtterance();

// Set Speech Language
speech.lang = "en";

let voices = []; // global array of available voices

let speechRate;

function cancelSpeech() {
	window.speechSynthesis.cancel();
}

function resumeSpeech() {
	window.speechSynthesis.resume();
}

function pauseSpeech() {
	window.speechSynthesis.pause();
}

function countwords(str) {
	count = str.split(" ").length;
	document.querySelector("#count").innerHTML = count;
}

window.speechSynthesis.onvoiceschanged = () => {
	// Get List of Voices
	voices = window.speechSynthesis.getVoices();

	// Initially set the First Voice in the Array.
	speech.voice = voices[0];

	// Set the Voice Select List. (Set the Index as the value, which we'll use later when the user updates the Voice using the Select Menu.)
	let voiceSelect = document.querySelector("#voices");
	voices.forEach(
		(voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)),
	);
};

document.querySelector("#rate").addEventListener("input", () => {
	// Get rate Value from the input
	const rate = document.querySelector("#rate").value;

	// Set rate property of the SpeechSynthesisUtterance instance
	speech.rate = rate;
	speechRate = speech.rate;

	// Update the rate label
	document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
	// Get volume Value from the input
	const volume = document.querySelector("#volume").value;

	// Set volume property of the SpeechSynthesisUtterance instance
	speech.volume = volume;

	// Update the volume label
	document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#voices").addEventListener("change", () => {
	// On Voice change, use the value of the select menu (which is the index of the voice in the global voice array)
	speech.voice = voices[document.querySelector("#voices").value];
});

// get words from textarea and count.
document.querySelector("textarea").addEventListener("input", () => {
	// Get words from textarea
	const words = document.querySelector("textarea").value;
	if (words.length > 0) {
		countwords(words);
	} else {	
		document.querySelector("#count").innerHTML = '';
	}
});

document.querySelector("#start").addEventListener("click", () => {
	// cancel all speech synthesis process running
	cancelSpeech();

	// Set the text property with the value of the textarea
	speech.text = document.querySelector("textarea").value;
	// Start Speaking depending on the rate that has been set.
	window.speechSynthesis.speak(speech);
});

document.querySelector("#pause").addEventListener("click", pauseSpeech);

document.querySelector("#resume").addEventListener("click", resumeSpeech);

document.querySelector("#cancel").addEventListener("click", cancelSpeech);
