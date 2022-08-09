// récupérer le panier (l’array) via localStorage
let cart = JSON.parse(localStorage.getItem("article"));
// console.table(cart[0]);

//Créer et insérer des éléments dans la page
async function displayCart() {
  for (let article in cart) {
    const product = await getProductsById(cart[article].articleId);
    //création de la balise article et insertion dans la section
    let productArticle = document.createElement("article");

    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute("data-id", cart[article].articleId);

    //Insertion de l'élément "div" pour image
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    //Insertion de l'image
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    //creation de l'élément "div" pour la description
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    let productItemContentDescription = document.createElement("div");
    productItemContent.appendChild(productItemContentDescription);
    productItemContentDescription.className =
      "cart__item__content__description";

    //insertion du titre h2
    let productTitle = document.createElement("h2");
    productItemContentDescription.appendChild(productTitle);
    productTitle.innerHTML = product.name;

    //insertion de la coleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = cart[article].articleColor;

    //insertion du prix
    let productPrice = document.createElement("p");
    productItemContentDescription.appendChild(productPrice);
    productPrice.innerHTML = product.price + "€";

    //insertion de l'élément "div" content settings
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    //insertion de l'élément "div" content settings quantity
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";

    //insertion de la paragraphe quantité
    let productQty = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQty);
    productQty.innerHTML = "Qté: ";

    //insertion de la quantite
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.setAttribute("type", "number");
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("name", "itemQuantity");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("value", "productQuantity.value");
    productQuantity.value = cart[article].articleQuantity;

    //insertion de l'élément "div" pour supprimer le produit
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className =
      "cart__item__content__settings__delete";

    //insertion de l'élément "p" pour supprimer le produit
    let productSupprimer = document.createElement("p");
    productSupprimer.className = "deleteItem";
    console.log(cart[article]);
    productSupprimer.setAttribute("colorDelete", cart[article].articleColor);
    productSupprimer.setAttribute("idDelete", cart[article].articleId);
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.innerHTML = "Supprimer";
  }

  //calculer la quantité totale
  let productQtt = document.querySelector(".itemQuantity");
  let totalQtt = 0;
  for (let article in cart) {
    totalQtt += parseInt(cart[article].articleQuantity);
    let productTotalQuantity = document.getElementById("totalQuantity");
    productTotalQuantity.innerHTML = totalQtt;
  }

  //calculer le prix total
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice");
  for (let article in cart) {
    const cartProduct = await getProductsById(cart[article].articleId);
    const totalUnitPrice = parseInt(
      cartProduct.price * cart[article].articleQuantity
    );
    total += totalUnitPrice;
    totalPrice.innerHTML = total;
    changeQuantity();
  }
  deleteProduct();

  // Récupération des articles de l'API
  let params = new URL(document.location).searchParams;
  const productId = params.get("id");

  async function getProductsById(productId) {
    return fetch("http://localhost:3000/api/products/" + productId)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        // Une erreur est survenue
        console.log("erreur");
      })
      .then(function (response) {
        return response;
      });
  }
}
displayCart();

// Modification d'une quantité de produit
function changeQuantity() {
  let quantityInput = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < quantityInput.length; i++) {
    quantityInput[i].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id et sa couleur
      let qttModifValue = quantityInput[i].valueAsNumber;
      let dataId = cart[i].articleId;
      let dataColor = cart[i].articleColor;

      if (cart) {
        const resultFind = cart.find(
          (el) => el.articleId === dataId && el.articleColor === dataColor
        );

        if (resultFind) {
          cart[i].articleQuantity = qttModifValue;
          localStorage.setItem("article", JSON.stringify(cart));
        }
      }
      // refresh rapide
      location.reload();
    });
  }
}
changeQuantity();

// Suppression d'un produit
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");
  console.log(btn_supprimer);
  btn_supprimer.forEach(function (button) {
    // Now do something with my button
    button.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(button);
      let idDelete = button.getAttribute("iddelete");
      let colorDelete = button.getAttribute("colordelete");

      cart = cart.filter(
        (el) => el.articleId !== idDelete || el.articleColor !== colorDelete
      );

      deleteConfirm = window.confirm(
        "Etes vous sûr de vouloir supprimer cet article ?"
      );

      if (deleteConfirm == true) {
        localStorage.setItem("article", JSON.stringify(cart));
        alert("Votre article a été supprimé");
        location.reload();
      }

      console.log(idDelete);
      console.log(colorDelete);
    });
  });

  console.log(btn_supprimer.length);
  // for (let i = 0; i < btn_supprimer.length; i++) {
  //   // console.log(btn_supprimer[i]);
  //   btn_supprimer[i].addEventListener("click", (event) => {
  //     event.preventDefault();

  //     //Selection de l'element à supprimer en fonction de son id et sa couleur
  //     console.log(cart[i].articleId);
  //     let idDelete = cart[i].articleId;
  //     let colorDelete = cart[i].articleColor;

  //     cart = cart.filter(
  //       (el) => el.articleId !== idDelete || el.articleColor !== colorDelete
  //     );

  //     deleteConfirm = window.confirm(
  //       "Etes vous sûr de vouloir supprimer cet article ?"
  //     );
  //     if (deleteConfirm == true) {
  //       localStorage.setItem("article", JSON.stringify(cart));
  //       alert("Votre article a été supprimé");
  //       location.reload();
  //     }
  //   });
  // }
}
// deleteProduct();

//    Formulaire

// Variable regex
let nameRegex =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
let addressRegex = /^[a-z0-9\s,'-]*$/i;
let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

//Variables pour récupérer les id des champs de formulaire
let form = document.querySelector(".cart__order__form");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// Validation prénom
form.firstName.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Prénom non valide";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
    return true;
  }
});

//validation nom
form.lastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Nom non valide";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation adresse
form.address.addEventListener("input", (event) => {
  event.preventDefault();
  if (addressRegex.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = "Adresse non valide";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation ville
form.city.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = "Ville non valide";
    return false;
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation email
form.email.addEventListener("input", (event) => {
  event.preventDefault();
  if (emailRegex.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = "Email non valide";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
});

// Envoi des informations client au local storage
const btn_commander = document.getElementById("order");
//Ecouter le button commande
btn_commander.addEventListener("click", (event) => {
  event.preventDefault();

  //creation d'un objet contact
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    alert("Vous devez renseigner vos coordonnées pour passer la commande !");
  } else if (
    nameRegex.test(firstName.value) == false ||
    nameRegex.test(lastName.value) == false ||
    addressRegex.test(address.value) == false ||
    nameRegex.test(city.value) == false ||
    emailRegex.test(email.value) == false
  ) {
    alert("Merci de renseigner correctement vos coordonnées !");
  } else {
    //Construction d'un array d'id depuis le local storage
    let idProducts = [];
    for (let i = 0; i < cart.length; i++) {
      idProducts.push(cart[i].articleId);
    }

    const products = idProducts;
    const order = { contact, products };

    //Message d'alerte au cas ou le panier soit vide!
    const cartItems = document.getElementById("cart__items");
    if (products == null || products == [] || products.length < 1) {
      //Alors on affiche un panier vide
      cartItems.innerHTML = "Votre panier est vide.";
      alert("Votre panier est vide");
      totalPrice();
      e.preventDefault();
    }

    // envoyer des données à l'API
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((value) => {
        localStorage.setItem("orderId", value.orderId);
        document.location.href = `confirmation.html?id=${value.orderId}`;
      })
      .catch((err) => {
        alert("une erreur est survenue");
      });
  }
});
