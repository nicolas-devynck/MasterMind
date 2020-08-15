var seconde = 0; // conteur seconde
var minute = 0; // conteur minute
setInterval(function () { // toute les 1000 miliseconde (toute les seconde)
	seconde++; // on incremente de 1 la variable seconde
	if (seconde == 60) { // a 60 secondes
		seconde = 0 // on reset la variable seconde
		minute++; // et on ajoute 1 a minute
	}
	if (String(seconde).length == 1) {seconde = "0"+seconde;} // ajoute un zero devant les seconde unique
	if (String(minute).length == 1) {minute = "0"+minute;} // ajoute un zero devant les minute unique
	$("#chrono span").html(minute+":"+seconde);
}, 1000);
// tableau des 8 couleur
var tabColor = [
	"rgb(255, 0, 0)", // rouge
	"rgb(255, 255, 0)", // jaune
	"rgb(0, 128, 0)", // verts
	"rgb(0, 0, 255)", // bleu
	"rgb(128, 0, 128)", // violet
	"rgb(0, 0, 0)", // noir
	"rgb(255, 165, 0)", // orange
	"rgb(0, 206, 209)" // turquoise
];
// tableau des 4 couleur random choisi dans tabColor
var randomColor = [
	tabColor[Math.floor(Math.random() * 8)],
	tabColor[Math.floor(Math.random() * 8)],
	tabColor[Math.floor(Math.random() * 8)],
	tabColor[Math.floor(Math.random() * 8)]
];
for (var i = 0; i < 4; i++) {
	sessionStorage.setItem("tokenColor"+i, randomColor[i]); // on stoque la solution dans une variable de session pour afficher la solution sur une autre page
}
console.log(randomColor);
var ligne = 0; // variable qui donne la ligne actuel et le high score
var tokenColor; // variable qui stocke la couleur du pion choisi
// tableau de boolean pour valider les couleur
var Check = [false, false, false, false];
var Check2 = [false, false, false, false];
$("#red, #yellow, #green, #blue, #purple, #black, #orange, #darkturquoise").draggable({ revert: true,containment: "html" });  // rend les pions draggable
$("#red, #yellow, #green, #blue, #purple, #black, #orange, #darkturquoise").hover(function () { tokenColor = $(this).css("background-color"); }); // place la couleur du pion dans la variable tokenColor
// fonction qui permet de changer la ligne droppable et qui prend la couleur des pion
function fLigne(idLigne) {
	for (var i = 0; i < 4; i++) {
		$("#a"+idLigne+"-"+i+"").droppable({ // rend la ligne droppable
			drop: function () {
				$(this).css("background-color", tokenColor); // rend les pion coloriable
			}
		});
		//change la couleur des bordure
		$("#a"+idLigne+"-0, #a"+idLigne+"-1, #a"+idLigne+"-2, #a"+idLigne+"-3").css('border-color', "#1b75bb");
		$("#b"+idLigne+"-0, #b"+idLigne+"-1, #b"+idLigne+"-2, #b"+idLigne+"-3").css('border-color', "#1b75bb");
		$("#z"+idLigne+" .numBox").css('background-color', "#1b75bb");
		$("#z"+idLigne+" .numBox").css('color', "#ffffff");
		$("#a"+(idLigne-1)+"-"+ i+"").droppable("disable"); // desactive le droppable de la ligne inférieur
	}
}
// bouton valider
$("#submit").click(function () {
	// boucle pour les pion noir
	for (var i = 0; i < 4; i++) {
		// si la coleur et l'emplacement et bon
		if ($("#a"+ligne+"-"+i+"").css("background-color") == randomColor[i]) {
			// on passe les token en noir
			$("#b"+ligne+"-"+i+"").css("background-color", "rgb(0, 0, 0)");
			// et les booleans a true
			Check[i] = true; Check2[i] = true; 
		}
	}
	//boucle pour les pion rouge
	for (var i = 0; i < 4; i++) {
		// si la couleur du pion corespond avec une couleur dans le random
		// et que l'emplacement et la couleur n'on pas etais controler
		if ($("#a"+ligne+"-"+i+"").css("background-color") == randomColor[0] && !Check[0] && !Check2[i]) {
			// on passe le token en rouge
			$("#b"+ligne+"-"+i+"").css("background-color", "rgb(255,0,0)");
			// et les booleans a true
			Check[0] = true; Check2[i] = true;                
		}
		else if ($("#a"+ ligne+"-"+i+"").css("background-color") == randomColor[1] && !Check[1] && !Check2[i]) {
			$("#b"+ligne+"-"+i+"").css("background-color", "rgb(255,0,0)");
			Check[1] = true; Check2[i] = true;                
		}
		else if ($("#a"+ligne+"-"+i+"").css("background-color") == randomColor[2] && !Check[2] && !Check2[i]) {
			$("#b"+ligne+"-"+i+"").css("background-color", "rgb(255,0,0)");
			Check[2] = true; Check2[i] = true;
		}
		else if ($("#a"+ligne+"-"+i+"").css("background-color") == randomColor[3] && !Check[3] && !Check2[i]) {
			$("#b"+ligne+"-"+i+"").css("background-color", "rgb(255,0,0)");
			Check[3] = true; Check2[i] = true;
		}
	}
	// si tout les token son noir
	if ($("#b"+ligne+"-0").css("background-color") == "rgb(0, 0, 0)" &&
		$("#b"+ligne+"-1").css("background-color") == "rgb(0, 0, 0)" &&
		$("#b"+ligne+"-2").css("background-color") == "rgb(0, 0, 0)" &&
		$("#b"+ligne+"-3").css("background-color") == "rgb(0, 0, 0)") {
		sessionStorage.setItem("ligne", ligne); // on stock le score dans une variable de session
		sessionStorage.setItem("temps", minute*60+parseInt(seconde)); // on stock le temps dans des variables de session
		document.location.href = "gagner.html" // et on redirige sur la page		
	}
	else {
		if (ligne == 9) { // si le joueur est à la 10em lignes 
			document.location.href = "perdue.html"; // on redirige sur la page
		}
		else { // sinon on continue
			ligne++; // on incrmente le conteur de ligne
			fLigne(ligne); // et on lance la fonction : change de ligne
			Check = [false, false, false, false, ]; // on repasse tout les check à false
			Check2 = [false, false, false, false, ]; // on repasse tout les check à false
		}
	}
});
fLigne(ligne); // et on rend la 1er ligne droppable