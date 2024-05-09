const nameRegex = /[\d²&~"#{([|`_@)+=}$£¤¨%*µ!§:;.,?<>°\\\^\]\/]/g;

let index;
let dataObject;
let inputName;
let inputValue;
let isFirstnameOK;
let firstname;
let isLastnameOK;
let lastname;
let fullname;

let drugType = "";
let drugName = "";
let nomDrogue = "";
let identificationStatus = "";
let dure = "drogue dure";
let douce = "drogue douce";

const formButton = document.getElementById("form-button");
const requiredInputs = document.querySelectorAll("input[required]");
const divID = document.getElementById("identity");
const form = document.querySelector("form");

let array = [];

/**
 * Fonction générique qui récupère les données du formulaire et
 * les stocke sous forme d'objet dans le tableau array
 * @param {String} inputId
 */
const getData = (inputId) => {
  let inputData = document.getElementById(inputId);
  dataValue = inputData.value;
  if (dataValue != "") {
    array.push({ dataName: inputId, dataValue });
  }
};

/**
 * Fonction générique qui récupère un objet et ses données depuis array
 * @param {String} inputId
 */
const getFromArray = (inputId) => {
  getData(inputId);
  for (object of array) {
    if (object.dataName === inputId) {
      index = array.indexOf(object);
      dataObject = object;
      inputName = dataObject.dataName;
      inputValue = dataObject.dataValue;
    }
  }
};

/**
 * Récupérer et valider le prénom
 */
const getFirstname = () => {
  getFromArray("firstname");
  if (nameRegex.test(inputValue) === false) {
    isFirstnameOK = true;
    firstname = inputValue;
    array.splice(index, 1);
  } else {
    isFirstnameOK = false;
    addError(dataObject);
  }
};

/**
 * Récupérer et valider le nom de famille
 */
const getLastname = () => {
  getFromArray("lastname");
  if (nameRegex.test(inputValue) === false) {
    isLastnameOK = true;
    lastname = inputValue;
    array.splice(index, 1);
  } else {
    isLastnameOK = false;
    addError(dataObject);
  }
};

/**
 * Récupérer la nouvelle donnée prénom + nom de famille et la stocker dans array
 */
const getName = () => {
  getFirstname();
  getLastname();
  if (isFirstnameOK == true && isLastnameOK == true) {
    fullname = firstname + " " + lastname;
    array.push({ dataName: "fullname", dataValue: fullname });
  }
};

/**
 * Récupérer les données du tableau et les afficher sur le site
 * @param {String} data
 * @param {String} resultElementId
 */
const getAgentDatasFromArray = (data, resultElementId) => {
  for (object of array) {
    if (object.dataName === data) {
      dataIndex = array.indexOf(object);
      dataObject = object;
      dataName = dataObject.dataName;
      dataValue = dataObject.dataValue;
      let element = document.getElementById(resultElementId);
      element.textContent = dataValue;
    }
  }
};

/**
 * Fonction qui détermine le type de drogue à partir du nom
 * @param {String} drug
 */
const identifyType = (drug) => {
  if (drug === "cannabis") {
    drugType = douce;
  } else {
    drugType = dure;
  }
};

/**
 * Fonction générique qui permet d'identifier une substance en fonction de sa quantité
 * @param {Number} quantity = quantité de la substance
 * @param {Number} threshold = seuil minimum nécessaire à l'identification
 */

const randomizedID = (quantity, threshold) => {
  let drugNameElement = document.getElementById("resultDrugName");
  let canvasElement = document.getElementById("graphiqueDosages");
  if (quantity >= threshold) {
    // La machine a 95% de chance de réussir à identifier la substance si le seuil minimum d'identification est atteint
    if (Math.random() < 0.95) {
      drugNameElement.innerHTML = `Substance identifiée : <b>${dataValue}</b>.`;
    } else {
      drugNameElement.textContent = "Echec de l'identification.";
      canvasElement.style.display = "none";
    }
  } else {
    // Les chances de réussite sont réduites à 70% si le seuil minimum d'identification n'est pas atteint
    if (Math.random() < 0.7) {
      drugNameElement.innerHTML = `Substance identifiée : <b>${dataValue}</b>.`;
    } else {
      drugNameElement.innerHTML = "Echec de l'identification.";
      canvasElement.style.display = "none";
    }
  }
};

/**
 * Fonction qui identifie une substance en fonction de sa quantité
 * @param {String} drug = substance testée
 * @param {Number} quantity = quantité de la substance testée
 */
const identifyName = (drug, quantity) => {
  identifyType(drug);
  drugName = drug;
  if (drugType === dure) {
    randomizedID(quantity, 5);
  } else {
    randomizedID(quantity, 10);
  }
};

identifyFromArray = (data) => {
  let quantity = 0;
  for (object of array) {
    if (object.dataName === drugquantity) {
      dataValue = quantity;
    }
    if (object.dataName === data) {
      dataObject = object;
      dataName = dataObject.dataName;
      dataValue = dataObject.dataValue;
      identifyName(dataName, quantity);
      nomDrogue = dataValue;
    }
  }
};

/**
 * Création d'un graphique dynamique en fonction du résultat de l'identification
 */

const creerGraphique = (nomDrogue) => {
  const ctx = document.getElementById("graphiqueDosages").getContext("2d");

  // Générez un tableau de données aléatoires pour toutes les drogues
  const dosages = {
    cannabis: (Math.random() * (5 - 2) + 2).toFixed(2), // Dosage aléatoire entre 2% et 5%, arrondi à 2 décimales
    cocaïne: (Math.random() * (5 - 2) + 2).toFixed(2),
    crack: (Math.random() * (5 - 2) + 2).toFixed(2),
    ecstasy: (Math.random() * (5 - 2) + 2).toFixed(2),
    héroïne: (Math.random() * (5 - 2) + 2).toFixed(2),
    opium: (Math.random() * (5 - 2) + 2).toFixed(2),
  };

  dosages[nomDrogue] = (Math.random() * (100 - 20) + 20).toFixed(2); // Dosage aléatoire entre 20% et 100% pour la drogue identifiée

  const chartData = {
    labels: ["Cannabis", "Cocaïne", "Crack", "Ecstasy", "Héroïne", "Opium"],
    datasets: [
      {
        label: "Pureté (%)",
        data: Object.values(dosages),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Composition de l'échantillon",
        },
      },
    },
  });

  // Afficher la pureté de l'échantillon dans le paragraphe avec l'ID 'drugPurity'
  document.getElementById(
    "drugPurity"
  ).innerHTML = `Pureté de l'échantillon : <b>${dosages[nomDrogue]}%</b>`;
  console.log(dosages);
};

formButton.addEventListener("click", (event) => {
  event.preventDefault();
  let resultSheet = document.getElementById("test-result");
  let convertButton = document.getElementById("convertBtn");
  resultSheet.style.display = "block";
  convertButton.style.display = "block";
  form.style.display = "none";
  getData("matricule");
  getName();
  getData("drugname");
  getData("drugquantity");
  getAgentDatasFromArray("fullname", "agentFullname");
  getAgentDatasFromArray("matricule", "agentId");
  identifyFromArray("drugname", "resultDrugName");
  creerGraphique(nomDrogue);
});

/**
 * Création d'un jpg à partir du résultat de l'identification
 */
document.getElementById("convertBtn").addEventListener("click", function () {
  html2canvas(document.getElementById("test-result")).then(function (canvas) {
    // Créer une image JPG à partir du canvas
    var imgData = canvas.toDataURL("image/png");

    // Créer un élément image pour afficher l'image JPG
    var img = new Image();
    img.src = imgData;

    const downloadLink = document.createElement("a");
    downloadLink.href = imgData;
    downloadLink.download = "rapport.png"; // Nom du fichier à télécharger
    downloadLink.click();
    // Ajouter l'image à la page ou faire d'autres traitements
    document.body.appendChild(img);
  });
});

// Fonction pour vérifier si tous les champs requis sont remplis
const checkRequiredInputs = () => {
  let allFilled = true;
  requiredInputs.forEach((input) => {
    if (input.value.trim() === "") {
      allFilled = false;
    }
  });

  // Activer ou désactiver le bouton en fonction de l'état de remplissage
  formButton.disabled = !allFilled;
};

// Appeler la fonction checkRequiredInputs au chargement de la page et à chaque fois qu'un champ est modifié
window.addEventListener("load", checkRequiredInputs);
requiredInputs.forEach((input) => {
  input.addEventListener("input", checkRequiredInputs);
});
