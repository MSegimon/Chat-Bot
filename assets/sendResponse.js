function sendResponse(id, response) {
   
    $.post("./ajax.php", { call: "sendResponse", id: id, response: response }, result => {
        


    });


}