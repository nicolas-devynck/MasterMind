for (var i = 0; i < 4; i++){
    $("#s"+i+"").css("background-color", sessionStorage.getItem("tokenColor"+i));
}