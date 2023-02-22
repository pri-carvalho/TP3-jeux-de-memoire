/***************************************************************** */
/*             TP-3 PRISCILA CARVALHO
/***************************************************************** */



/* The above code is creating a form that allows the user to input the number of pairs they want to
play with and their name. The code is also validating the input. */
const form = document.getElementById('form');
const errorMessage = document.querySelector('#errorMessage');
const minuterie = document.getElementById('minuterie');
let message = '';
const tableDeJeux = document.getElementById("tableDeJeux");
const imgs = ['cat (1).jpg','cat (2).jpg', 'cat (3).jpg', 'cat (4).jpg', 'cat (5).jpg',
            'cat (6).jpg', 'cat (7).jpg', 'cat (8).jpg', 'cat (9).jpg', 'cat (10).jpg'];
let cartesDansLeJeuHTML = '';
let gameForm = document.getElementById('forme-du-jeu');
let premiereCarte, deuxiemeCarte;
let verrouillerCarte = false;
let finDuJeu = false;


/* The above code is creating a form that allows the user to input the number of pairs they want to
play with and their name. The code is also validating the input. */
gameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let pairs = document.getElementById("pairs");  
  let name = document.getElementById("name");
  let CartesPourJouer = genererArray(pairs.value);

  errorMessage.textContent = '';
  message = '';

  if (validarNumero(pairs.value) && validarNome(name.value)) {     
    form.remove();
    creerCartes(CartesPourJouer); 
    tempsRestant(name);    
  } else {
    errorMessage.textContent = 'Veuillez remplir tous les champs. '+ message;   
  }  
})


/**
 * The function creerCartes() creates the cards and adds them to the HTML.
 * @param CartesPourJouer - an array of numbers that represent the cards to be played.
 */

function creerCartes(CartesPourJouer) {

  for (let i = 0; i < CartesPourJouer.length; i++) {
    cartesDansLeJeuHTML += 
    `
      <div class="carteMemoire" data-carte="${imgs[CartesPourJouer[i]]}">
        <img class ="carteFront" src="image/${imgs[CartesPourJouer[i]]}" alt="carte">
        <img class ="carteDos" src="image/Card_Back.jpg" alt="carteDos" >
      </div>  
    `      
  }  
  showTableDeJeux();
  const cartes = document.querySelectorAll(".carteMemoire");
  cartes.forEach(carte => carte.addEventListener("click", flipCard));  
}


/**
 * If the string is empty or if the string does not match the regex, then the message is updated and
 * the function returns false. Otherwise, the function returns true.
 * @param str - the string to validate
 * @returns a boolean value.
 */
function validarNome(str) {
  const regex = /^[a-z0-9]+$/i; 
  if (!str || !regex.test(str)) {
    message += 'Le nom doit être alphanumérique. ';
    return false;
  }
  return true;
}


/**
 * If the number is not empty, is a number, and is between 2 and 10, then return true, otherwise return
 * false.
 * @param num - the number of pairs to be generated
 * @returns Nothing.
 */
function validarNumero(num) {
  if (num !== '' && !isNaN(num) && num >= 2 && num <= 10) {
    return true;
  } else {
    message += 'Le nombre de paires doit être entre 2 et 10. ';
    return false;
  }
  return ;
}


/**
 * The function showTableDeJeux() is called when the user clicks on the button "Show Table de Jeux". 
 * 
 * The function showTableDeJeux() calls the function cartesDansLeJeuHTML() which returns a string of
 * HTML code. 
 * 
 * The function showTableDeJeux() then assigns the string of HTML code to the innerHTML property of the
 * div element with the id "tableDeJeux". 
 * 
 * The function showTableDeJeux() then displays the HTML code in the div element with the id
 * "tableDeJeux".
 */
function showTableDeJeux() {  
  tableDeJeux.innerHTML = cartesDansLeJeuHTML;  
}


/**
 * If the card is locked, return false. If it's not locked, add the class 'flip' to the card. If it's
 * not the first card, set it as the first card. If it's not the second card, set it as the second
 * card. Check if the cards match.
 */

function flipCard(){
  if (verrouillerCarte) return false;

  this.classList.add("flip");  

  if (!premiereCarte) {
    premiereCarte = this;

    return false;
  }
  deuxiemeCarte = this;
  verifierCorrespondance();
}

/**
 * It creates an array of length 2N, where each number from 0 to N appears twice, and then shuffles the
 * array.
 * @param N - The number of pairs of cards.
 * @returns An array of numbers.
 */
function genererArray(N) {
  const array = [];


  for (let i = 0; i < N; i++) {
    array.push(i);
    array.push(i);
  }

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

/**
 * If the two cards match, remove them from the game, otherwise flip them back over.
 */
function verifierCorrespondance() {
  let isMatch = premiereCarte.dataset.carte === deuxiemeCarte.dataset.carte; 

  if (isMatch) {
    let premiereCarteAux = premiereCarte;
    let deuxiemeCarteAux = deuxiemeCarte;
    reinitialiserCartes(isMatch);
    supprimerCartesCorrespondantes(premiereCarteAux, deuxiemeCarteAux);    
  } else {
    desactiverCartes()
  }
}


/**
 * After 1 second, remove the flip class from the first and second cards, and then reset the first and
 * second cards.
 */
function desactiverCartes() {
  verrouillerCarte = true;
  setTimeout(()=>{    
    premiereCarte.classList.remove("flip");
    deuxiemeCarte.classList.remove("flip");    
    reinitialiserCartes();
  }, 1000)     
}


/**
 * If the cards match, remove the event listener from both cards, then set all three variables to null.
 * @param [isMatch=false] - a boolean that indicates whether the cards match or not.
 */
function reinitialiserCartes(isMatch = false) {
  if (isMatch) {
    premiereCarte.removeEventListener("click", flipCard);    
    deuxiemeCarte.removeEventListener("click", flipCard);        
  } 
 
  [premiereCarte, deuxiemeCarte, verrouillerCarte] = [null, null, false];    
}


/**
 * After a one second delay, the HTML of the two cards is deleted.
 * @param premiereCarteAux - the first card that was clicked
 * @param deuxiemeCarteAux - the second card that was clicked
 */
function supprimerCartesCorrespondantes(premiereCarteAux, deuxiemeCarteAux) {   
  setTimeout(()=>{    
    premiereCarteAux.outerHTML = '';
    deuxiemeCarteAux.outerHTML = '';  
  }, 1000)   
}

/**
 * If the table is empty, the game is over, and the timer is still running, stop the timer and display
 * 'You won!'
 */
function tempsRestant(name) {
  let remainingTime = 5 * 60; 

  const updateTimer = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
  
    minuterie.textContent = `${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      if (!tableDeJeux.innerHTML.trim()) {
        finDuJeu = true;
      }  
    remainingTime--;  
    if (remainingTime < 0 && finDuJeu != true) {
      clearInterval(timer);
      minuterie.textContent = name.value + ', Vous avez perdu!';
    }
    if (remainingTime > 0 && finDuJeu == true) {
      minuterie.textContent = name.value + ', Vous avez gagné!';
    }
  };  
  const timer = setInterval(updateTimer, 1000); 
}


