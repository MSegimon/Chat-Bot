function generateBasicResponse(message) {
    let isQuestion = 0;

    //Check if question
    let questionWords = ["how ", "what ", "where ", "why ", "isnt ", "are ", "did ", "was ", "has ", "will ", "should ", "may ", "could ", "would ", "can ", "do ", " does ", "is ", "what's "];
    for (let i = 0; i < questionWords.length; i++) {
        if (message.includes(questionWords[i])) {
            isQuestion = 1;
        }
    }

    $.post("./ajax.php", { call: "insertText", message: message, isQuestion: isQuestion }, result => {

        //console.log(result);

    });

    
    if (isQuestion == 1) {
        return "I currently do not posses the knowledged to answer this";
    } else if (message.includes("good") || message.includes("nice") || message.includes("excellent")) {
        return "That good to hear. Do you have any more questions";
    } else if (message.includes("bad") || message.includes("not nice") || message.includes("tragic")) {
        return "That sad to hear. Do you have any more questions";
    } else {
        return "tragic";
    }
    

}

function respondToBoi(message, callBack2) {
    
    $.post("./ajax.php", { call: "checkMessage", message: message }, result => {

        if (result == "oci33u@whfo3&243igh324)3aoi423uh") {
            callBack2(generateBasicResponse(message));
        } else {
            //console.log("lad");
            callBack2(result);
        }

    });

}