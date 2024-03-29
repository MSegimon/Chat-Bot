<?php

SESSION_START();
require_once("No Peaking");

if (isset($_POST["call"])) {
    
    if ($_POST["call"] == "firstQuestion") {
        
        echo json_encode(dbQuery("SELECT `text` FROM `chatbot` WHERE `isQuestion`=1 AND `response`=''"));

    } elseif ($_POST["call"] == "getId") {
        
        echo dbQuery("SELECT `id` FROM `chatbot` WHERE `text`=?", array($_POST["text"]))[0]["id"];

    } elseif ($_POST["call"] == "sendResponse") {
        
        dbQuery("UPDATE `chatbot` SET `response`=? WHERE `id`=?", array($_POST["response"], $_POST["id"]));

    } elseif ($_POST["call"] == "checkMessage") {
        
        $response = dbQuery("SELECT `response` FROM `chatbot` WHERE `text`=?", array($_POST["message"]))[0];
        //$questionCheck = dbQuery("SELECT `isQuestion` FROM `chatbot` WHERE `text`=?", array($_POST["message"]))[0];
        $time = time();
        $timeElapsed = $time - $response["timestamp"];

        if (isset($response)) {
            
            if ($response["isWolframResponse"] == 1 && $timeElapsed > 604800) {
                echo "oci33u@whfo3&243igh324)3aoi423uh";
            } else {
                echo $response["response"];   
            }

        } else {

            echo "oci33u@whfo3&243igh324)3aoi423uh";

        }

    } elseif ($_POST["call"] == "insertText") {
        
        dbQuery("INSERT INTO `chatbot`(`id`, `text`, `isQuestion`, `response`, `isWolframResponse`, `timestamp`) VALUES (null,?,?,'',0,?)", array($_POST["message"], $_POST["isQuestion"],time()));

    } elseif ($_POST["call"] == "insertTextWithResponse") {

        dbQuery("DELETE FROM `chatbot` WHERE `text`=?", array($_POST["message"]));
        dbQuery("INSERT INTO `chatbot`(`id`, `text`, `isQuestion`, `response`, `isWolframResponse`, `timestamp`) VALUES (null,?,?,?,?,?)", array($_POST["message"], $_POST["isQuestion"], $_POST["response"], $_POST["isWolframResponse"], time()));

    } elseif ($_POST["call"] == "wolframApiCall") {

        echo file_get_contents("https://api.wolframalpha.com/v1/conversation.jsp?appid=No Peaking=" . $_POST["question"]);

    } else if ($_POST["call"] == "isQuestion") {
        $command = escapeshellcmd("python3 assets/IsItQuestion/main.py '" . $_POST["message"] . "'");
        $output = shell_exec($command);
        echo $output;
    }

}

?>