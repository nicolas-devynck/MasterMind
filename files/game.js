document.addEventListener('dragstart', function(e) {
  e.preventDefault();
}, false);
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
// solution en console
/*
console.log(randomColor);
console.log("rgb(255, 0, 0) // rouge");
console.log("rgb(255, 255, 0) // jaune");
console.log("rgb(0, 128, 0) // verts");
console.log("rgb(0, 0, 255) // bleu");
console.log("rgb(128, 0, 128) // violet");
console.log("rgb(0, 0, 0) // noir");
console.log("rgb(255, 165, 0) // orange");
console.log("rgb(0, 206, 209) // turquoise");
*/
for (var i = 0; i < 4; i++) {
	sessionStorage.setItem("tokenColor"+i, randomColor[i]); // on stoque la solution dans une variable de session pour afficher la solution sur une autre page
}
console.log(randomColor); // solution en console
var row = 0; // variable qui donne la ligne actuel et le high score
var tokenColor; // variable qui stocke la couleur du pion choisi
// tableau de boolean pour valider les couleur
var positionChecked = [false, false, false, false];
var colorChecked = [false, false, false, false];
$("#red, #yellow, #green, #blue, #purple, #black, #orange, #darkturquoise").draggable({
  revert: true,
  containment: "html",
  // compatibilité avec firefox
  helper: function() {
    // Crée un clone et copie la couleur de fond
    var $clone = $(this).clone();
    $clone.css("background-color", $(this).css("background-color"));
    return $clone;
  }
}); // rend les pions draggable
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
    let noirs = 0;
    let rouges = 0;
    let guess = [];
    let solution = [];
    let usedGuess = [false, false, false, false];
    let usedSolution = [false, false, false, false];

    // Récupère la proposition et la solution
    for (let i = 0; i < 4; i++) {
        guess[i] = $("#a" + row + "-" + i).css("background-color").replace(/ /g, "");
        solution[i] = randomColor[i].replace(/ /g, "");
    }

    // Cherche les noirs (bien placés)
    for (let i = 0; i < 4; i++) {
        if (guess[i] === solution[i]) {
            noirs++;
            usedGuess[i] = true;
            usedSolution[i] = true;
        }
    }

    // Cherche les rouges (mal placés)
    for (let i = 0; i < 4; i++) {
        if (!usedGuess[i]) {
            for (let j = 0; j < 4; j++) {
                if (!usedSolution[j] && guess[i] === solution[j]) {
                    rouges++;
                    usedGuess[i] = true;
                    usedSolution[j] = true;
                    break;
                }
            }
        }
    }

    // Affiche le feedback aléatoirement
    afficherFeedbackAleatoire(row, noirs, rouges);

    // Victoire
    if (noirs === 4) {
        sessionStorage.setItem("row", row);
        sessionStorage.setItem("time", minute * 60 + parseInt(second));
        document.location.href = "win.html";
        return;
    }

    // Défaite
    if (row === 9) {
        document.location.href = "lose.html";
        return;
    }

    // Passe à la ligne suivante
    row++;
    fRow(row);
});
fRow(row); // et on rend la 1er ligne droppable

function afficherFeedbackAleatoire(row, noirs, rouges) {
    let feedback = [];
    for (let i = 0; i < noirs; i++) feedback.push("black");
    for (let i = 0; i < rouges; i++) feedback.push("red");
    while (feedback.length < 4) feedback.push(""); // Complète avec vide

    // Mélange le tableau (Fisher-Yates)
    for (let i = feedback.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [feedback[i], feedback[j]] = [feedback[j], feedback[i]];
    }

    for (let i = 0; i < 4; i++) {
        let color = "";
        if (feedback[i] === "black") color = "rgb(0,0,0)";
        if (feedback[i] === "red") color = "rgb(255,0,0)";
        $("#b" + row + "-" + i).css("background-color", color);
    }
}