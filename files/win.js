// convertire les seconde en minute
var minute = String(Math.floor(sessionStorage.getItem("time")/60));
var second = String(sessionStorage.getItem("time")%60);
if (second.length == 1) {second = "0"+second;}
$("#dialog").dialog({autoOpen:false});
$("#minute").html(minute);
$("#second").html(second);
$("#hit").html((parseInt(sessionStorage.getItem("row"))+1));

// comparaison des chrono et affichage de l'input
if (parseInt(sessionStorage.getItem("time")) < parseInt(JSON.parse(localStorage.getItem(sessionStorage.getItem("row")))[1])) {
    $("p").append("Entrez votre nom : <br /><input type='text' id='input' placeholder='Alphanumérique seulement' />");
	// si la touche entré et taper
	$("#input").keypress(function(e) { 
    	if (e.which == 13) {
			//verif des donner
			var exp = new RegExp("^[a-zA-Z0-9]{2,10}$");
			if (!exp.test($("#input").val())) {
				//message d'erreur
				$("#dialog").dialog("open");
			}
			else { // enregistrement des donner dans le localstrorage
				localStorage.setItem(parseInt(sessionStorage.getItem("row")), '["'+$("#input").val()+'","'+sessionStorage.getItem("time")+'"]');
				document.location.href = "scores.html" // et on redirige sur la page	
			}
		}
	});
}