function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
//const formData = document.querySelectorAll(".formData");
// ce qu'on a rajouté
const form = document.querySelector(".inscription");
const closeValidate = document.querySelector(".btn-close");
const close = document.querySelector(".close");
const succes = document.querySelector("#succes");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form

close.addEventListener("click", closeModal);

function closeModal() {
  clearError();
  modalbg.style.display = "";
  form.reset();
}

closeValidate.addEventListener("click", closeValidation);

function closeValidation() {
  modalbg.style.display = "";
  form.style.display = "block";
  succes.style.display = "none";
  form.reset();
}

let formData = {
  first: {
    required: true,
    minLength: 2,
    regex:  /^[A-Za-z]+$/,
    regexMessage: "Le champ ne doit pas contenir de caractere speciaux"
  },
  last: {
    required: true,
    minLength: 2,
    regex:  /^[A-Za-z]+$/,
    regexMessage: "Le champ ne doit pas contenir de caractere speciaux"
  },
  email: {
    required: true,
    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    regexMessage: "L'email n'est pas valide"
  },
  birthdate: {
    required: true,
    regex: /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/ ,
    regexMessage: "La date n'est pas valide"
  },
  quantity: {
    required: true,
    number: true,
  },
  location: {
    required: true,
    type: "check",
  },
  checkbox1: {
    required: true,
    respect: "check",
  },
};

function errorMessage(champ, message) {
  //creation de la variable contenant paragraphe
  let tag = document.createElement("p");
  //creation variable contenant texte
  tag.className = "error-message";
  let text = document.createTextNode(message);
  //ajout texte dans le p
  tag.appendChild(text);
  //creation variable comprenant toutes les classes formData html
  //let champ = document.getElementsByClassName("formData");
  champ.parentElement.appendChild(tag);
}

function clearError() {

let errorMessages = document.getElementsByClassName("error-message");
while (errorMessages.length > 0) {
    errorMessages[0].remove();
 }
}

//fonction pour changer le modal lorsque tout est respecté plus affichage message
function succesMessage () {
  form.style.display = "none";
  succes.style.display = "block";
}

function validateForm(myObject) {
  clearError();
  let hasError = false;
  for (let [key, constraint] of Object.entries(myObject)) {
    const field = document.getElementsByName(key)[0];
    if (constraint.required && constraint.type !== "check" && field.value === "") {
        hasError = true;
        errorMessage(field, "Le champ doit etre remplit");  
    }
    //Si la valeur du champ est inférieur a 2
    else if (constraint.minLength && field.value.length < constraint.minLength){
      hasError = true;
      errorMessage(field, "Le champ doit contenir au moins deux caractères"); 
    }
    else if (constraint.regex && constraint.regex.test(field.value) === false) {
      hasError = true;
      errorMessage(field, constraint.regexMessage); 
    }
    //Si nombre de tournoi pas nombre
    else if (constraint.number && isNaN(field.value)) {
      hasError = true;
      errorMessage(field, "Un nombre doit etre renseigné");
    }
    //Si pays n'est pas check
    else if (constraint.type && field.checked === false) {
      hasError = true;
      errorMessage(field, "Un choix de pays doit etre effectué");
    }
    //Condition generale pas check
    else if (constraint.respect && field.checked === false) {
      hasError = true;
      errorMessage(field, "Les conditions d'utilisation doivent être acceptées");
    }

  }
  return hasError
}

//je parcours mon obj formdata
//je cherche dans le dom l'element qui a l'id correspondant a la clé de mon obj formdata
//je crée une fonction pour check que données des clés soit correct
//si les données ne sont pas correct ajout d'un paragraphe a l'element html avec message erreur
//si elles sont bonnes message de confirmation de l'envoie

//value off checkbox
//clear les errors quand ok

document.getElementsByName("reserve")[0].addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (validateForm(formData) === false) {
    succesMessage();
  }
});


