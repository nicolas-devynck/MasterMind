for (var i = 0; i < 4; i++) {
    $("#s" + i).css("background-color", sessionStorage.getItem("tokenColor" + i));
}

// Effet de pluie persistant
function rainEffect() {
    setInterval(function() {
        let drop = document.createElement("div");
        drop.className = "rain-drop";
        // Position horizontale aléatoire
        drop.style.left = Math.random() * 100 + "vw";
        // Largeur et hauteur (plus haut que large)
        let width = 3 + Math.random() * 2; // entre 3px et 5px
        let height = 22 + Math.random() * 18; // entre 22px et 40px
        drop.style.width = width + "px";
        drop.style.height = height + "px";
        // Opacité aléatoire
        drop.style.opacity = 0.35 + Math.random() * 0.4;
        // Flou aléatoire
        drop.style.filter = `blur(${Math.random() * 1.2}px)`;
        // Durée de chute aléatoire
        drop.style.animationDuration = (0.8 + Math.random() * 1.7) + "s";
        // Pas d'inclinaison pour tomber droit
        drop.style.transform = "none";
        document.body.appendChild(drop);

        // Supprime la goutte après l'animation
        setTimeout(function() {
            drop.remove();
        }, parseFloat(drop.style.animationDuration) * 1000);
    }, 60);
}
rainEffect();