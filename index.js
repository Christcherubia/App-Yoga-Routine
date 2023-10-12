//Coder en 1) Tableau de base des images de la routine et des minuteurs
const main = document.querySelector("main");
const basicArray = [
  // échange sa valeur à au tableau vide "exerciceArray"
  { pic: 0, min: 1 },
  { pic: 1, min: 1 },
  { pic: 2, min: 1 },
  { pic: 3, min: 1 },
  { pic: 4, min: 1 },
  { pic: 5, min: 1 },
  { pic: 6, min: 1 },
  { pic: 7, min: 1 },
  { pic: 8, min: 1 },
  { pic: 9, min: 1 },
];
let exerciceArray = [];

// Get stored exercices array
(() => {
  // Anonime Function
  if (localStorage.exercices) {
    exerciceArray = JSON.parse(localStorage.exercices);
  } else {
    exerciceArray = basicArray;
  }
})();

class Exercice {
  constructor() {
    this.index = 0;
    this.minutes = exerciceArray[this.index].min;
    this.seconds = 0;
  }

  updateCountdown() {

   return (main.innerHTML = `
      <div class="exercice-container">
        <p>${this.minutes}:${this.seconds}</p>
        <img src="./img${exerciceArray[this.index].pic}.png" />;
        <div>${this.index + 1}/${exerciceArray.length}</div>
      </div>`);
  }
}

//Coder en 3) Fonction utils (pour utiliser le don't reapit your self)
const utils = {
  pageContent: function (title, content, btn) {
    document.querySelector("h1").innerHTML = title;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },

  handleEventMinutes: function () {
    document.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener("input", (e) => {
        // Penser ici à ce contrôlé régulièrement avec des "console.log"

        exerciceArray.map((exo) => {
          if (exo.pic == e.target.id) {
            exo.min = parseInt(e.target.value);
            this.store();
          }
        });
      });
    });
  },

  handleEventArrow: function () {
    document.querySelectorAll(".arrow").forEach((arrow) => {
      arrow.addEventListener("click", (e) => {
        let position = 0;
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.dataset.pic && position !== 0) {
            [exerciceArray[position], exerciceArray[position - 1]] = [
              exerciceArray[position - 1],
              exerciceArray[position],
            ];

            page.lobby();
            this.store();
          } else {
            position++;
            // console.log(position);
          }
        });
      });
    });
  },
  deleteItem: function () {
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let newArray = exerciceArray.filter(
          (exo) => exo.pic != e.target.dataset.pic
        );
        exerciceArray = newArray;
        page.lobby();
      });
    });
  },

  reboot: function () {
    exerciceArray = basicArray;
    page.lobby();
    this.store();
  },

  store: function () {
    localStorage.exercices = JSON.stringify(exerciceArray);
  },
};

// Coder en 2) Structure de la page
const page = {
  lobby: function () {
    // Coder en
    let mapArray = exerciceArray
      .map(
        (exo) =>
          // Il est possible de faire un "map" sans accolade si il n'y à rien d'autre que du rendu comme si dessous.
          `
        <li>
            <div class='card-header'>
            <input type='number' id=${exo.pic} min='1' 
            max='10' value=${exo.min}>
            <span>min</span>
            </div>
            <img src="./img/${exo.pic}.png" />
            <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic} ></i>
            <i class="fas fa-times-circle deleteBtn" data-pic=${exo.pic} ></i>
        </li>
      `
      )
      .join("");

    // Coder en 4) sauf le "mapArray"
    //Titre + Flèche -> "rafraichir la page"  // Exercices de routines avec bouton
    utils.pageContent(
      "Paramétrage <i id='reboot' class='fas fa-undo'></i>",
      "<ul>" + mapArray + "</ul>", // On injecte ici le mapArray entre de "ul" ce qui donne un rendu responcive
      "<button id='start'>Commencer<i class='far fa-play-circle'></i></button>"
    );
    utils.handleEventMinutes();
    utils.handleEventArrow();
    utils.deleteItem();
    reboot.addEventListener("click", () => utils.reboot());
    start.addEventListener("click", () => this.routine());
  },

  // Coder en 5) Fonction Routine, pour exercice de routinek
  routine: function () {
    const exercice = new Exercice();
    
    utils.pageContent("Routine", exercice.updateCountdown(), null);
  },
  // Coder en 6) Fonction Finish, page de fin
  finish: function () {
    utils.pageContent(
      "C'est terminé !",
      "<button id='start'Recommencer</button>",
      "<button id='reboot' class='btn-reboot'>Réinitialiser <i class='fas fa-times-circles'></i></button>"
    );
  },
};
page.lobby();
