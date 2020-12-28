const voice = document.querySelector(".voice");
const voice2text = document.querySelector(".voice2text");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();

let marker1 = 0;
let marker2 = 0;

let currentBotMessage;

function addBoiText(text) {
    let chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container");

    let chatTextBox = document.createElement("p");
    chatTextBox.classList.add("voice2text");

    let chatText = document.createTextNode(text);
    chatTextBox.appendChild(chatText);

    chatContainer.appendChild(chatTextBox);
    return chatContainer;
}

function addBotText(text) {
    let chatContainerBot = document.createElement("div");
    chatContainerBot.classList.add("chat-container");
    chatContainerBot.classList.add("darker");

    let chatTextBoxBot = document.createElement("p");
    chatTextBoxBot.classList.add("voice2text");

    let chatTextBot = document.createTextNode(text);
    chatTextBoxBot.appendChild(chatTextBot);

    chatContainerBot.appendChild(chatTextBoxBot);
    return chatContainerBot;
}



function botSpeak(message) {

    if (message == undefined) {
        message = "Ask me anything";

        let speech = new SpeechSynthesisUtterance(message);
        //speech.text = "no thee";

        /*
        if (message.includes("")) {
            
        }
        */

        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);

        let element = document.getElementById("container");
        element.appendChild(addBotText(speech.text));
        element.tagName = "AMA";
    } else if (marker2 == 0) {
        let speech = new SpeechSynthesisUtterance(message);

        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);

        let element = document.getElementById("container");
        element.appendChild(addBotText(speech.text));
        currentBotMessage = speech.text;
        marker2 = 1;
    } else {

        respondToBoi(message, callBack2);

        function callBack2(text) {

            let speech = new SpeechSynthesisUtterance(text);

            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;
            window.speechSynthesis.speak(speech);

            let element = document.getElementById("container");
            element.appendChild(addBotText(speech.text));
            currentBotMessage = speech.text;

        }

    }

}

recorder.onstart = () => {
    console.log("Voice activated");
};

recorder.onresult = (event) => {
    //console.log(event);
    let resultIndex = event.resultIndex;
    let transcript = event.results[resultIndex][0].transcript;

    let element = document.getElementById("container");
    element.appendChild(addBoiText(transcript));

    $.post("./ajax.php", { call: "getId", text: currentBotMessage }, result => {

        sendResponse(result, transcript);

    });

    marker2 = 1;

    botSpeak(transcript);
};

function callBack(message) {
    //console.log(message);
    currentBotMessage = message;
    botSpeak(currentBotMessage);
}

voice.addEventListener("click", () => {

    if (marker1 == 0) {
        askFirstQuestion(callBack);
        marker1 = 1;
    } else {
        recorder.start();
    }
    
});