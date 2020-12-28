
function askFirstQuestion(boi) {
    let message;
    
    $.post("./ajax.php", { call: "firstQuestion" }, result => {
        let arr = JSON.parse(result).map(a => a.text);
        //console.log(arr);

        let num = Math.floor(Math.random() * arr.length);
        message = arr[num];
        //console.log(message);

        //console.log(message);
        boi(message);
    });


}