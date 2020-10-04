// οι δυο πίνακες περιέχουν τους τίτλους των φωτογραφιών και τα ονομάτα των αρχείων τους.
// Για παράδειγμα "Ο καταράκτης του Ερυμάνθου" φαίνεται στη φωτογραφία "Erymanthos_kataraktis.jpg"

// ο πίνακας αυτός περιέχει με τη σειρά τους τίτλους των φωτογραφιών
const alt_text = ["Άνω Χώρα Ναυπακτίας", "Καλαρύτες, στα Τζουμέρκα",
  "Φαράγγι Πάνταβρέχει, Ευρυτανία", "Αθανάσιος Διάκος, Ορεινή Φωκίδα",
  "Πάρνηθα στην Αττική", "Αρκουδόρεμα, στη Βάλια Κάλντα, Πίνδος",
  "Υμητός, Αττική, Μονή Καισαριανής", "Όρος Φλέγκας, Πίνδος",
  "Όρος Παναχαϊκό, Αχαΐα", "Βαρδούσια, Φωκίδα", "Όρος Χελμός, Αχαία",
  "Μετέωρα", "Μαίναλο, Αρκαδία", "Ορος Οίτη, Φθιώτιδα", "Συράκο, Τζουμέρκα",
  "Ο καταράκτης του Ερύμανθου"]
// ο πίνακας αυτός περιέχει με τη σειρά τα ονομάτα αρχείων των φωτογραφιών
  const pictures =
  ['Ano_Hora.jpg', 'Kalarytes.jpg', 'Pantavrehi.jpg',
    'Athansios_Diakos.jpg', 'Parnitha.jpg',
    'ValiaCalda_Arkoudorema.jpg', 'Ymhtos.jpg',
    'MountFlegkas.jpg', 'Panhahaiko.jpg', 'Vardousia.jpg',
    'Helmos.jpg', 'Meteora.jpg', 'Menalo.jpg', 'Oith.jpg',
    'Syrako.jpg', 'Erymanthos_kataraktis.jpg'];

const shuffled_pictures = shuffleArray(pictures);
const mikrografies = document.querySelector("div .mikrografies");
const perigrafi = document.querySelector("div .perigrafi");

for(let i = 0; i < pictures.length; i++){
  const new_picture = document.createElement('img');
  new_picture.src = "img/" + shuffled_pictures[i];
  mikrografies.appendChild(new_picture);  
}

const thumbs = document.querySelectorAll(".mikrografies img");

const panel_main = document.querySelector("div .panel-main");
let main_picture = document.createElement('img');
const description = document.createElement('span');

main_picture.src = "img/" + shuffled_pictures[0];
let text_index = pictures.indexOf(shuffled_pictures[0]);
description.textContent = alt_text[text_index];

panel_main.appendChild(main_picture);
perigrafi.appendChild(description);
main_picture.setAttribute("id", "selected");
main_picture.setAttribute("title", alt_text[text_index]);
const current = document.querySelector("#selected");

let index = 0;
let src_index = "";

//Η επιλεγμένη μικρογραφία θα είναι ημιδιαφανής
const opacityOfSelectedImage = 0.5;

// Όταν φορτώνει η εφαρμογή, η επιλεγμένη μικρογραφία είναι η 1η στον πίνακα thumbs,
// οπότε αυτή γίνεται πάντα ημιδιαφανής
thumbs[0].style.opacity = opacityOfSelectedImage;

// Σε κάθε μικρογραφία (δηλ. σε κάθε στοιχείο του πίνακα thumbs) προστίθεται 
// ένας eventListener στο γεγονός click. Δηλ. όταν γίνει κλικ σε μια μικρογραφία, //// τότε θα εκτελείται η συνάρτηση imgActivate()
thumbs.forEach(img => img.addEventListener("click", imgActivate));

// Η συνάρτηση, που καλείται όταν γίνει κλικ σε μια από τις εικόνες του πίνακα
// thumbs, έχει σαν όρισμα ένα event object.
function imgActivate(e) {
  //η μικρογραφία οποίας το κλικ προκάλεσε το γεγονός e (event):
  var newImage = e.target; // Η μεταβλητή newImage δείχνει στο αντικείμενο που πατήθηκε και που προκάλεσε το event "e".
  
  /* Βήμα 1 */
  // Αλλάξτε το src της τρέχουσας μικρογραφίας με το αντίστοιχο αυτής που 
  // μόλις πατήθηκε:
  current.src = newImage.src;

  setTexts();

  index = shuffled_pictures.indexOf(current.src.slice(src_index));

  /* Βήμα 1 */
  // Αλλάξτε την διαφάνεια της επιλεγμένης μικρογραφίας σε opacityOfSelectedImage:
  setOpacity();
}

let new_button = document.querySelector(".new_button");
new_button.onclick = function(){
  
  let randomIndex = Math.floor(Math.random() * pictures.length);

  current.src = thumbs[randomIndex].src;
  setTexts();

  index = shuffled_pictures.indexOf(current.src.slice(src_index)); 
  setOpacity();
}

let prev_button = document.querySelector(".prev_button");
prev_button.onclick = function(){

  index--;
  if(index<0) index = pictures.length-1;
  
  setOpacity();
  current.src = thumbs[index].src;
  setTexts();
}

let next_button = document.querySelector(".next_button");
next_button.onclick = function(){

  index++;
  if(index>pictures.length-1) index = 0;
  
  setOpacity();
  current.src = thumbs[index].src;
  setTexts();
}

function setTexts(){
  src_index = current.src.indexOf("/img/") + 5;
  text_index = pictures.indexOf(current.src.slice(src_index));
  description.textContent = alt_text[text_index];
  main_picture.setAttribute("title", alt_text[text_index]);
}

function setOpacity(){
  thumbs.forEach(img => (img.style.opacity = 1));
  thumbs[index].style.opacity = opacityOfSelectedImage; 
}

// Επιστρέφει τον πίνακα arr με τυχαία διάταξη στοιχείων
function shuffleArray(arr) {
  let newArray = [];
  let oldArray = arr.slice();
  while (oldArray.length != 0) {
    let randomIndex = Math.floor(Math.random() * oldArray.length);
    newArray.push(oldArray[randomIndex]);
    oldArray.splice(randomIndex, 1);
  }
  return newArray;
}






