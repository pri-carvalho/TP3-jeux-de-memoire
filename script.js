/***************************************************************** */
/*             TP-3 PRISCILA CARVALHO
/***************************************************************** */

/* VARIABLES */ 

const tableDeJeux = document.getElementById("tableDeJeux");
const imgs = ['cat (1).jpg','cat (2).jpg', 'cat (3).jpg', 'cat (4).jpg', 'cat (5).jpg',
            'cat (6).jpg', 'cat (7).jpg', 'cat (8).jpg', 'cat (9).jpg', 'cat (10).jpg'];
let cartesDansLeJeuHTML = '';
let gameForm = document.getElementById('forme-du-jeu');
let premiereCarte, deuxiemeCarte;
let verrouillerCarte = false;

/* EVENT LISTENER */       

// Este metodo "escuta" o click no botao submit do formulario
gameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let pairs = document.getElementById("pairs");  
  let CartesPourJouer = genererArray(pairs.value);

  for (let i = 0; i < CartesPourJouer.length; i++)
  {
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
})

/* METHODES */

//Este metodo soma as strings contendo as DIV com as cartas.
//Soma duas vezes pois representa os pares.
function showTableDeJeux() {  
  tableDeJeux.innerHTML = cartesDansLeJeuHTML;  
}

//Este metodo adicona a classe (flip) a DIV (carteMemoire)
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

//Este metodo recebe um numero e gera um array com o dobro da quantidade informada
//onde cada numero so pode ser repetido uma vez
function genererArray(N) {
  const array = [];

  // Adiciona os números de 1 a N ao array, duas vezes cada
  for (let i = 1; i <= N; i++) {
    array.push(i);
    array.push(i);
  }

  // Embaralha o array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  // Retorna o array gerado
  return array;
}

// Este metodo compara os dados do campo dataset dos elemtos clicados
function verifierCorrespondance() {
  let isMatch = premiereCarte.dataset.carte === deuxiemeCarte.dataset.carte; 

  if (isMatch){
    let premiereCarteAux = premiereCarte;
    let deuxiemeCarteAux = deuxiemeCarte;
    reinitialiserCartes(isMatch);
    supprimerCartesCorrespondantes(premiereCarteAux, deuxiemeCarteAux);
  } else {
    desactiverCartes()
  }
}

// Este metodo remove a classe (flip) da DIV (carteMemoire)
function desactiverCartes() {
  verrouillerCarte = true;
  setTimeout(()=>{    
    premiereCarte.classList.remove("flip");
    deuxiemeCarte.classList.remove("flip");    
    reinitialiserCartes();
  }, 1000)    
}

// Este metodo reicializa todas as variaveis utilizadas na rodada
function reinitialiserCartes(isMatch = false) {
  if (isMatch) {
    premiereCarte.removeEventListener("click", flipCard);    
    deuxiemeCarte.removeEventListener("click", flipCard);        
  } 
  //Esta sintaxe atribui todos os valores para inicializar as variaveis ao mesmo tempo  
  [premiereCarte, deuxiemeCarte, verrouillerCarte] = [null, null, false];    
}

// Este metodo remove as cartas do jogo
function supprimerCartesCorrespondantes(premiereCarteAux, deuxiemeCarteAux) {   
  setTimeout(()=>{    
    premiereCarteAux.outerHTML = '';
    deuxiemeCarteAux.outerHTML = '';  
  }, 1000)     
}