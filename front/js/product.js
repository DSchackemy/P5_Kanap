//on va rechercher l'id de chaque produit

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

const quantityPicked = document.querySelector("#quantity")
const colorPicked = document.querySelector("#color")

//on recupère les données des produits dans l'API

fetch(`http://localhost:3000/api/products/${id}`)
.then((res) => res.json())
.then (res => Data(res))

function Data(canape) {
    const {altTxt, colors, description, imageUrl, name, price,} = canape
    imgUrl = imageUrl
    altText = altTxt
    itemPrice = price
    artName = name
    createImage (imageUrl, altTxt)
    createTitle (name)
    createPrice (price)
    createDescription(description)
    createColors(colors)

    addToCart(canape)
}
//On Ajoute au panier
function addToCart(canape) {
    const sendToCart = document.querySelector("#addToCart");

    // verification conditions 
    sendToCart.addEventListener("click", (event) => {
        if (quantityPicked.value > 0  && quantityPicked <= 100) {
            
            // choix de la quantité
            let choixQuantity = quantityPicked.value;

            //choix de la couleur
            let choixColor = colorPicked.value;


            let productSettings = {
                idProduct : id,
                colorProduct : choixColor,
                quantityProduct : +choixQuantity,
                nameProduct : canape.name,
                prixProduct : canape.price,
                descriptionProduct : canape.description,
                imgProduct : canape.imageUrl,
                altImg : canape.altTxt,
            };

            //Initialisation du localStorage
            let productInLocalStorage = JSON.parse(localStorage.getItem(canape));

            //ouverture pop-up de confirmation
            const popupConfirmation = () => {
                if (
                window.confirm(`Votre commande de ${choixQuantity} ${canape.name} ${choixColor} est ajoutée au panier
            Pour consulter votre panier, cliquez sur OK`)
                ) {
                window.location.href = "cart.html";
                }
            };

            //importation dans le localStorage

                // Si panier avec au moins un article
            if (productInLocalStorage) {
                const productFind = productInLocalStorage.find (
                    (el) =>
                    el.id === id && el.colorProduct === choixColor
                );

                //si le produit commandé deja présent
            if (productFind) {
                let newQuantity =
                    parseInt(productSettings.quantityProduct) +
                    parseInt(productFind.quantityProduct);
                    productFind.quantityProduct = newQuantity;
            localStorage.setItem(canape, JSON.stringify(productInLocalStorage));
            popupConfirmation();
            
            // si produit pas dans le panier
            }else{
                productInLocalStorage.push(productSettings);
                localStorage.setItem(canape, JSON.stringify(productInLocalStorage));
                popupConfirmation();
            }
            //Si panier est vide
            }else {
                productInLocalStorage = [];
                productInLocalStorage.push(productSettings);
                localStorage.setItem(canape, JSON.stringify(productInLocalStorage));
                popupConfirmation();
            }
        }
    })
}


//insertion de l'image 
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}
//insertion du h1
function createTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}
//insertion du prix
function createPrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
    
}
//insertion de la description
function createDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}
//insertion de la couleur
function createColors(colors){
    const select = document.querySelector("#colors")
    if (select != null) {
        // on crée une loop afin de recuperer les infos pour chaque couleurs 
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}

