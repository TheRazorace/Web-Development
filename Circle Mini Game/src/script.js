const shape = document.querySelector("#shape");
shape.style.borderRadius = "100px";

const game_over = document.querySelector("#gameOver");

let attempts_span = document.querySelector("#attempts");
let time_taken_span = document.querySelector("#timeTaken");
let total_time_span = document.querySelector("#totalTime");

let appear_time = new Date().getTime();
let click_time = new Date().getTime();

const new_game_btn = document.querySelector("#new");
const retry_btn = document.querySelector("#retry");
retry_btn.style.display = "none";

var timeout;

//ο χρόνος τώρα σε ms
var start = new Date().getTime();

//ο συνολικός χρόνος του παίχτη
var totalTime = 0;

//ο αριθμός των προπαθειών
var attempts = 0;

//το παιχνίδι τελειώνει μετά από τόσες προσπάθειες 
const maxAttempts = 10;

//εμφάνισε τον πρώτο κύκλο
new_game_btn.onclick = function(){
    appearAfterDelay();
    attempts_span.innerHTML = 10;
    total_time_span.innerHTML = "";
    time_taken_span.innerHTML = "";
    new_game_btn.style.display = "none";
    retry_btn.style.display = "block";
    game_over.style.display =  "none";
}

retry_btn.onclick = function(){
    clearTimeout(timeout);
    shape.style.display = "none";
    totalTime = 0;
    attempts = 0;
    total_time_span.innerHTML = "";
    time_taken_span.innerHTML = "";
    attempts_span.innerHTML = 10;
    appearAfterDelay();
}

//επιστρέφει ένα τυχαίο χρώμα
function getRandomColor() {
    var rgb1 = 'rgb(';
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return rgb1 + r + ', ' + g + ', ' + b + ')';
}
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

//Εμφανίζει σε τυχαία θέση έναν κύκλο με τυχαία διάμετρο και χρώμα
function makeShapeAppear() {
    //Αντί για σταθερές τιμές, δώστε στις μεταβλητές top, left, width τυχαίες τιμές (που να έχουν νόημα),
    //ώστε οι κύκλοι να εμφανίζονται σε τυχαία θέση και με τυχαία διάμετρο (ούτε τεράστια, ούτε πάρα πολύ μικρή)
    //και να είναι πάντα μέσα στο πλαίσιο
    shape.style.backgroundColor = getRandomColor();
    let diameter = getRandomIntInclusive(50, 149);
    let left = getRandomIntInclusive(0, 599);
    let top = getRandomIntInclusive(0, 349);
    shape.style.width = diameter;
    shape.style.height = diameter;
    shape.style.left = left;
    shape.style.top = top;


    shape.style.display = "block";
    appear_time = new Date().getTime();

}

//περιμένει από 0 ως 2 δευτερόλεπτα και εμφανίζει έναν κύκλο
function appearAfterDelay() {
    //προσθέστε κώδικα ώστε το σχήμα να εμφανίζεται μετά από τυχαίο διάστημα 0-2 δευτερολέπτων
    timeout = window.setTimeout(function() {makeShapeAppear();}, getRandomIntInclusive(0, 2000));
}

//όταν ο παίχτης κάνει κλικ σε ένα σχήμα πρέπει να γίνουν μια σειρά από πράγματα...
shape.onclick = function () {
    shape.style.display = "none";
    click_time = new Date().getTime();
    time_taken_span.innerHTML = (click_time - appear_time)/1000 + "s";
    totalTime += (click_time - appear_time)
    total_time_span.innerHTML = totalTime/1000 + "s";
    attempts++;
    attempts_span.innerHTML = maxAttempts - attempts;

    if((maxAttempts - attempts) == 0){
        game_over.style.display =  "block";
        attempts = 0;
        totalTime = 0;
        new_game_btn.style.display = "block";
        retry_btn.style.display = "none";
    }
    else{
        appearAfterDelay();
    }
    
}