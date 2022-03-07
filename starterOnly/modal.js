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
const modalSucces = document.querySelector("#succes");
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
  modalbg.style.display = "";
}

closeValidate.addEventListener("click", closeValidation);

function closeValidation() {
  modalbg.style.display = "";
}

let formData = {
  first: {
    required: true,
    minLength: 2,
    letter:  /^[A-Za-z]+$/,
  },
  last: {
    required: true,
    minLength: 2,
    letter:  /^[A-Za-z]+$/,
  },
  email: {
    required: true,
    realmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  birthdate: {
    required: true,
    date: /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/ ,
  },
  quantity: {
    required: true,
    number: isNaN(),
    goodnumber: /^[1-9][0-9]?$/ ,
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

//fonction pour changer le modal lorsque tout est respecté plus affichage message
function succesMessage () {
  form.style.display = "none";
  succes.style.display = "block";
}

function validateForm(myObject) {
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
    else if (constraint.letter && constraint.letter.test(field.value) === false) {
      hasError = true;
      errorMessage(field, "Le champ ne peut pas contenir de nombre"); 
    }
    //Si mail incorrect
    else if (constraint.realmail && constraint.realmail.test(field.value) === false) {
      hasError = true;
      errorMessage(field, "Le mail n'est pas correct");
    }
    //Si date incorrect 
    else if (constraint.date && constraint.date.test(field.value) === false) {
      hasError = true;
      errorMessage(field, "La date est invalide");
    }
    //Si nombre de tournoi pas nombre
    else if (constraint.number && isNaN(field.value)) {
      hasError = true;
      errorMessage(field, "un nombre doit etre renseigné");
    }
    else if (constraint.number && constraint.goodnumber.test(field.value) === false) {
      hasError = true;
      errorMessage(field, "le nombre renseigné doit etre compris entre 1 et 99");
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

///////////////////////////////

//let homme = {
//  age: 37,
//  poid: 100,
//  nationalite: "francais",
//};

//function checkAge() {
//  if (homme.age >= 35) {
//    //alert("trop vieu")
//  } else if (homme.age <= 18) {
//    alert("trop jeune");
//  } else {
//    alert("vous pouvez rentrer");
//  }
//}

//checkAge();

//let camion = {
//  gros: {
//   poid: 100,
//    vitesse: 50,
//  },
//  leger: {
//    poid: 50,
//    vitesse: 80,
//  },
//};

//let grosCamion = camion.gros.poid;
//console.log(grosCamion);

//for (const property in camion) {
//  console.log(property, camion[property]);
//}

//if (age > 70) {
//  if (sexe === "M") {
//    console.log("Vous êtes vieux");
//  } else {
//    console.log("Vous êtes veille");
//  }
//} else if (age > 18) {
//  if (sexe === "M") {
//    console.log("Vous êtes un adulte");
//  } else {
//    console.log("Vous êtes une adulte");
//  }
//} else {
//  if (sexe === "M") {
//    console.log("Vous êtes un enfant");
//  } else {
//    console.log("Vous êtes une enfant");
//  }
//}
