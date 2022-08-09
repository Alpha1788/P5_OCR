// Récupération de l'id du produit
let params = (new URL(document.location)).searchParams;
const id = params.get('id');
let product = "";


getProduct();


// Récupération des articles de l'API
function getProduct() {
    fetch(`http://localhost:3000/api/products//${id}`)
    .then((res) => {
        return res.json();
    })


    // Répartition des données de l'API dans le DOM
    .then(async function (results) {
        product = await results;
         if (product){
            getPost(product);
        }
    })
}
   
function getPost(product){
    // insertion des information du produit
    let itemImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(itemImg);
    itemImg.src = product.imageUrl;
    itemImg.alt = product.altTxt;

    let itemName = document.getElementById('title');
    itemName.innerHTML = product.name;

    let itemPrice = document.getElementById('price');
    itemPrice.innerHTML = product.price;

    let itemDescription = document.getElementById('description');
    itemDescription.innerHTML = product.description;


// Insertion des options de couleurs
   let productColors = document.getElementById("colors");
   for (let i=0; i < product.colors.length; i++) {
   let option = document.createElement("option");
   option.innerText = product.colors [i];
   productColors.appendChild(option);
}

    addToCart(product);
}


//Gestion du panier
function addToCart(product) {
   const addToCartBtn = document.querySelector("#addToCart");
   const color = document. querySelector("#colors");
   const quantity = document.querySelector("#quantity");

//Ecouter le panier avec deux conditions
  addToCartBtn.addEventListener("click", ()=>{

  if (color.value != null && color.value !=0 && quantity.value > 0 && quantity.value < 100){

 //Recupération du choix de la couleur
   let colorChoice = color.value;
               
  //Recupération du choix de la quantité
    let quantityChoice = quantity.value;

  //Créer un nouveau produit à ajouter au panier
    let articleInCart = {
        articleId: id,
        articleColor: colorChoice,
        articleQuantity: quantityChoice,
        articleName: product.name,
        // articlePrice: product.price,
        articleDescription: product.description,
        articleImg: product.imageUrl,
        articleAltImg: product.altTxt
    };

    //Initialisation du local storage
    let cart = JSON.parse(localStorage.getItem("article"));

   //Redirection sur la page "panier"
    function pageRedirect () {
        alert("Votre commande est ajoutée au panier!")
        // window.location.href ="cart.html";
    }

    //Importation dans le local storage
    //verification si l'article n'existe dèjà dans le panier
    if (cart) {
        const articleExist = cart.find((el) => el.articleId === id && el.articleColor === colorChoice);

     //S'il est déjà present, incrémente seulement la quantité
    if (articleExist) {
    let newQuantity =  parseInt(articleInCart.articleQuantity) + parseInt(articleExist.articleQuantity);
    articleExist.articleQuantity = newQuantity;
    localStorage.setItem("article", JSON.stringify(cart));
     pageRedirect()
           
           
     //Si le produit commandé n'est pas dans le panier
     } else {
     cart.push(articleInCart);
     localStorage.setItem("article", JSON.stringify(cart));
     pageRedirect();
     }
       
    //Si le panier est vide
    } else {
    cart =[];
    cart.push(articleInCart);
    localStorage.setItem("article", JSON.stringify(cart));
    pageRedirect();    
       
    }}
    if (color.value == null || color.value == 0 || quantity.value == 0) {
        alert ("Veuilez choisir une couleur et une quantité");
    };
    });
}
