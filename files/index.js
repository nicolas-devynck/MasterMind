//rainyday
function run() {
  var rainyDay = new RainyDay({
      image: 'background' // Target p element with ID, RainyDay.js will use backgorund image to simulate rain effects.
  });
}

$( document ).ready(function() {
  // lancement de rainyday
  run();
});
