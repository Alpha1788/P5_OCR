
//Génération d'une promesse avec "Fetch"
fetch("http://localhost:3000/api/products")

    // 1- Retour d'une reponse sous format JSON
    .then(function (response) {
        return response.json();
    })

    // 2- Configurer une fonction qui vas traiter la reponse en format JSON de l'API
    .then(function (data) {
        montrerLesCanaps(data)
    })

    // 3- En cas d'erreur message a afficher dans la console
    .catch(function (error) {
    console.log(error)

    })

    // 2-1 Intégration et répartition d'éléments avec le DOM
    var montrerLesCanaps = function (tableauKanap) {
        
        for (let i = 0; i < tableauKanap.length; i++) {
    
            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${tableauKanap[i]._id}`
    
                // Insertion de l'élément "article"
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);
        
                    // Insertion de l'image
                    let productImg = document.createElement("img");
                    productArticle.appendChild(productImg);
                    productImg.src = tableauKanap[i].imageUrl;
                    productImg.alt = tableauKanap[i].altTxt;
            
                    // Insertion du titre "h3"
                    let productName = document.createElement("h3");
                    productArticle.appendChild(productName);
                    productName.classList.add("productName");
                    productName.innerText = tableauKanap[i].name;
            
                    // Insertion de la description "p"
                    let productDescription = document.createElement("p");
                    productArticle.appendChild(productDescription);
                    productDescription.classList.add("productDescription");
                    productDescription.innerText = tableauKanap[i].description;
            
        }
    }




