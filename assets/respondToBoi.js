function generateBasicResponse(message, callback) {
    let isQuestion = 0;

    //Check if question
    let questionWords = ["how ", "what ", "where ", "why ", "isnt ", "are ", "did ", "was ", "has ", "will ", "should ", "may ", "could ", "would ", "can ", "do ", " does ", "is ", "what's "];
    for (let i = 0; i < questionWords.length; i++) {
        if (message.includes(questionWords[i])) {
            isQuestion = 1;
        }
    }


    if (isQuestion == 1) {
        
        // Wolfram Alpha Api Inclusion
        let question = message
        while (question.includes(" ")) {
            question = question.replace(" ", "+");
        }
        while (question.includes("?")) {
            question = question.replace("?", "%3f")
        }

        $.post("./ajax.php", {call: "wolframApiCall", question}, result => {

            let json = JSON.parse(result);

            if (json.error) {
                $.post("./ajax.php", { call: "insertText", message: message, isQuestion: isQuestion }, result => {

                    //console.log(result);

                });

                callback("Hmm, I don't poses the knowledge to answer that question.");
            } else {
                $.post("./ajax.php", { call: "insertTextWithResponse", message: message, isQuestion: isQuestion, response: json.result }, result => {

                    //console.log(result);

                });

                callback(json.result);
            }

        });

    } else if (message.includes("good") || message.includes("nice") || message.includes("excellent")) {
        callback("That good to hear. Do you have any more questions");
    } else if (message.includes("bad") || message.includes("not nice") || message.includes("tragic")) {
        callback("That sad to hear. Do you have any more questions");
    } else {
        callback("tragic");
    }
}

function respondToBoi(message, callBack2) {
    
     $.post("./ajax.php", { call: "checkMessage", message: message }, result => {

        if (result == "oci33u@whfo3&243igh324)3aoi423uh") {
            generateBasicResponse(message, generateBasicResponseCallback);

            function generateBasicResponseCallback(res) {
                callBack2(res);
            }
        } else {
            //console.log("lad");
            callBack2(result);
        }

    });

}