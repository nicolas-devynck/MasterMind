//conpteur
var second = 0; // conteur seconde
var minute = 0; // conteur minute
setInterval(function () { // toute les 1000 miliseconde (toute les seconde)
	second++; // on incremente de 1 la variable seconde
	if (second == 60) { // a 60 secondes
		second = 0 // on reset la variable seconde
		minute++; // et on ajoute 1 a minute
	}
	if (String(second).length == 1) {second = "0"+second;} // ajoute un zero devant les seconde unique
	if (String(minute).length == 1) {minute = "0"+minute;} // ajoute un zero devant les minute unique
	$("#timer span").html(minute+":"+second);
}, 1000);
// tableau des 8 couleur
var color = [
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
	color[Math.floor(Math.random() * 8)],
	color[Math.floor(Math.random() * 8)],
	color[Math.floor(Math.random() * 8)],
	color[Math.floor(Math.random() * 8)]
];
for (var i = 0; i < 4; i++) {
	sessionStorage.setItem("tokenColor"+i, randomColor[i]); // on stoque la solution dans une variable de session pour afficher la solution sur une autre page
}
console.log(randomColor); // solution en console
var row = 0; // variable qui donne la ligne actuel et le high score
var tokenColor; // variable qui stocke la couleur du pion choisi
// tableau de boolean pour valider les couleur
var Check = [false, false, false, false];
var Check2 = [false, false, false, false];
$("#red, #yellow, #green, #blue, #purple, #black, #orange, #darkturquoise").draggable({ revert: true,containment: "html" });  // rend les pions draggable
$("#red, #yellow, #green, #blue, #purple, #black, #orange, #darkturquoise").hover(function () { tokenColor = $(this).css("background-color"); }); // place la couleur du pion dans la variable tokenColor
// fonction qui permet de changer la ligne droppable et qui prend la couleur des pion
function fRow(idRow) {
	for (var i = 0; i < 4; i++) {
		$("#a"+idRow+"-"+i+"").droppable({ // rend la ligne droppable
			drop: function () {
				$(this).css("background-color", tokenColor); // rend les pion coloriable
			}
		});
		//change la couleur des bordure
		$("#a"+idRow+"-0, #a"+idRow+"-1, #a"+idRow+"-2, #a"+idRow+"-3").css('border-color', "#1b75bb");
		$("#b"+idRow+"-0, #b"+idRow+"-1, #b"+idRow+"-2, #b"+idRow+"-3").css('border-color', "#1b75bb");
		$("#z"+idRow+" .intBox").css('background-color', "#1b75bb");
		$("#z"+idRow+" .intBox").css('color', "#ffffff");
		$("#a"+(idRow-1)+"-"+ i+"").droppable("disable"); // desactive le droppable de la ligne inférieur
	}
}
// bouton valider
$("#submit").click(function () {
	// boucle pour les pion noir
	for (var i = 0; i < 4; i++) {
		// si la coleur et l'emplacement et bon
		if ($("#a"+row+"-"+i+"").css("background-color") == randomColor[i]) {
			// on passe les token en noir
			$("#b"+row+"-"+i+"").css("background-color", "rgb(0, 0, 0)");
			// et les booleans a true
			Check[i] = true; Check2[i] = true; 
		}
	}
	//boucle pour les pion rouge
	for (var i = 0; i < 4; i++) {
		// si la couleur du pion corespond avec une couleur dans le random
		// et que l'emplacement et la couleur n'on pas etais controler
		if ($("#a"+row+"-"+i+"").css("background-color") == randomColor[0] && !Check[0] && !Check2[i]) {
			// on passe le token en rouge
			$("#b"+row+"-"+i+"").css("background-color", "rgb(255,0,0)");
			// et les booleans a true
			Check[0] = true; Check2[i] = true;                
		}
		else if ($("#a"+ row+"-"+i+"").css("background-color") == randomColor[1] && !Check[1] && !Check2[i]) {
			$("#b"+row+"-"+i+"").css("background-color", "rgb(255,0,0)");
			Check[1] = true; Check2[i] = true;                
		}
		else if ($("#a"+row+"-"+i+"").css("background-color") == randomColor[2] && !Check[2] && !Check2[i]) {
			$("#b"+row+"-"+i+"").css("background-color", "rgb(255,0,0)");
			Check[2] = true; Check2[i] = true;
		}
		else if ($("#a"+row+"-"+i+"").css("background-color") == randomColor[3] && !Check[3] && !Check2[i]) {
			$("#b"+row+"-"+i+"").css("background-color", "rgb(255,0,0)");
			Check[3] = true; Check2[i] = true;
		}
	}
	// si tout les token son noir
	if ($("#b"+row+"-0").css("background-color") == "rgb(0, 0, 0)" &&
		$("#b"+row+"-1").css("background-color") == "rgb(0, 0, 0)" &&
		$("#b"+row+"-2").css("background-color") == "rgb(0, 0, 0)" &&
		$("#b"+row+"-3").css("background-color") == "rgb(0, 0, 0)") {
		sessionStorage.setItem("row", row); // on stock le score dans une variable de session
		sessionStorage.setItem("time", minute*60+parseInt(second)); // on stock le temps dans des variables de session
		document.location.href = "win.html" // et on redirige sur la page		
	}
	else {
		if (row == 9) { // si le joueur est à la 10em lignes 
			document.location.href = "lose.html"; // on redirige sur la page
		}
		else { // sinon on continue
			row++; // on incrmente le conteur de ligne
			fRow(row); // et on lance la fonction : change de ligne
			Check = [false, false, false, false, ]; // on repasse tout les check à false
			Check2 = [false, false, false, false, ]; // on repasse tout les check à false
		}
	}
});
fRow(row); // et on rend la 1er ligne droppable