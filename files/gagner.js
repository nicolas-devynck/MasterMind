var minute = String(Math.floor(sessionStorage.getItem("temps")/60));
var seconde = String(sessionStorage.getItem("temps")%60);
if (seconde.length == 1) {seconde = "0"+seconde;}
$("#dialog").dialog({autoOpen:false});
$("#minute").html(minute);
$("#seconde").html(seconde);
$("#coup").html((parseInt(sessionStorage.getItem("ligne"))+1));

if (parseInt(sessionStorage.getItem("temps")) < parseInt(JSON.parse(localStorage.getItem(sessionStorage.getItem("ligne")))[1])) {
    $("p").append("Entrez votre nom : <br /><input type='text' id='inputPseudo' placeholder='Alphanumérique seulement' />");
	// si la touche entré et taper
	$("#inputPseudo").keypress(function(e) { 
    	if (e.which == 13) {
			var exp = new RegExp("^[a-zA-Z0-9]{2,10}$");
			if (!exp.test($("#inputPseudo").val())) {
				$("#dialog").dialog("open");
			}
			else {
				var a = '["'+$("#inputPseudo").val()+'","'+sessionStorage.getItem("temps")+'"]';
				localStorage.setItem(parseInt(sessionStorage.getItem("ligne")), a);
				document.location.href = "scores.html" // et on redirige sur la page	
			}
		}
	});
}