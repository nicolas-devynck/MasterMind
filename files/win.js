// 1800 secondes = 30 min
// valeur par défaut
var reset = '["Dupont","1800"]';
// Vérification et création du stockage des scores
if (!localStorage.getItem("high-scores")) { 
	localStorage.setItem("high-scores", "1");
	for(var i = 0; i < 10; i++) {
		localStorage.setItem(i, reset);
	}
}
// Convertir les secondes en minutes
var minute = String(Math.floor(sessionStorage.getItem("time")/60));
var second = String(sessionStorage.getItem("time")%60);
if (second.length == 1) {second = "0"+second;}
$("#dialog").dialog({
	autoOpen:false
});
$("#minute").html(minute);
$("#second").html(second);
$("#hit").html((parseInt(sessionStorage.getItem("row"))+1));
// Comparaison des chronos et affichage de l'input si nouveau record
if (parseInt(sessionStorage.getItem("time")) < parseInt(JSON.parse(localStorage.getItem(sessionStorage.getItem("row")))[1])) {
    $("p").append("Entrez votre nom : <br /><input type='text' id='input' placeholder='Alphanumérique seulement' />");
	// Si la touche entrée est tapée
	$("#input").keypress(function(e) { 
    	if (e.which == 13) {
			// Vérification des données
			var exp = new RegExp("^[a-zA-Z0-9]{2,10}$");
			if (!exp.test($("#input").val())) {
				// Message d'erreur
				$("#dialog").dialog("open");
			}
			else { // Enregistrement des données dans le localStorage
				localStorage.setItem(parseInt(sessionStorage.getItem("row")), '["'+$("#input").val()+'","'+sessionStorage.getItem("time")+'"]');
				document.location.href = "scores.html" // Redirection vers la page des scores	
			}
		}
	});
}