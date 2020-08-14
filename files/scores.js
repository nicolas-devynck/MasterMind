// 1800 seconde = 30 min
// valeur par defaut
var def = '["Dupont","1800"]';
// verification et creation du stocage des scores
if (!localStorage.getItem("high-scores")) { 
	localStorage.setItem("high-scores", "1");
	for(var i = 0; i <= 9; i++) {
		localStorage.setItem(i, def);
	}
}
// remise par defaut des valeur
$("#reset").click(function() {
	localStorage.removeItem('high-scores');
	location.reload();
});
// affichage des valeur dans la page html
for(var i = 0; i <= 9; i++) {
	var nom = JSON.parse(localStorage.getItem(i))[0];
	var minute = String(Math.floor(JSON.parse(localStorage.getItem(i))[1]/60));
	var seconde = String(JSON.parse(localStorage.getItem(i))[1]%60);
	if (seconde.length == 1) {seconde = "0"+seconde;} // ajoute un zero devant les seconde unique
	$("#h"+i+" div:nth-child(1)").html(nom);
	$("#h"+i+" div:nth-child(2)").html(minute+":"+seconde);
}