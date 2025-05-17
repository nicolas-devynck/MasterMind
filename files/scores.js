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
$("#dialog-confirm").dialog({
	autoOpen:false
});
// Remise par défaut des valeurs avec confirmation
$("#reset").click(function() {
  $("#dialog-confirm").dialog({
    resizable: false,
    height: "auto",
    width: 350,
    modal: true,
    buttons: {
      "Oui": function() {
        localStorage.removeItem('high-scores');
        for (var i = 0; i < 10; i++) {
          localStorage.setItem(i, reset);
        }
        $(this).dialog("close");
        location.reload();
      },
      "Non": function() {
        $(this).dialog("close");
      }
    }
  });
  $("#dialog-confirm").dialog("open");
});
// Affichage des valeurs dans la page HTML
for(var i = 0; i < 10; i++) {
	var nom = JSON.parse(localStorage.getItem(i))[0];
	var minute = String(Math.floor(JSON.parse(localStorage.getItem(i))[1]/60));
	var seconde = String(JSON.parse(localStorage.getItem(i))[1]%60);
	if (seconde.length == 1) {seconde = "0"+seconde;} // ajoute un zero devant les seconde unique
	$("#h"+i+" div:nth-child(1)").html(nom);
	$("#h"+i+" div:nth-child(2)").html(minute+":"+seconde);
}