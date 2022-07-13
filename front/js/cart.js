const API_ROOT = 'http://localhost:3000/api';

// on recupère les elements de l'API
async function getProducts() {
    let response = await fetch(`${API_ROOT}/products/`);
    let products = await response.json();
    return products;
}

//On execute toute les fonctions
async function awaitForDataAndShowItemsFromTheCart() {
    const items = await getProducts();
    const productsOfCart = [];
    
    findAndCompareItemsInAPI(items, productsOfCart);
    
    showAllItemsInTheCart(productsOfCart);
    
    calculateTotals(productsOfCart);
    
    
    const inputField = document.querySelectorAll('.itemQuantity');
    updateTotals(inputField, productsOfCart);
    
    const deleteItemBtn = document.querySelectorAll('.deleteItem');
    const sectionOfCartItems = document.getElementById('cart__items');
    const articleCartItem = document.querySelectorAll('.cart__item');
    deleteItemFromTheCart(deleteItemBtn,productsOfCart, sectionOfCartItems, articleCartItem);
}

awaitForDataAndShowItemsFromTheCart();


/**
 * on recupère des element dauns un tableau d'API pour extraire des données supplémentaires et transférer chaque element trouvé vers un nouveau tableau
 * @param {Object []} item 
 * @param {Object []} cartProductItems 
 */
function findAndCompareItemsInAPI(item, cartProductItems) {
    let itemsLocalStorage = getItemsLocalStorage();

    if (itemsLocalStorage != null) {
        for (let i = 0; i < itemsLocalStorage.length; i++) {
            const itemId = itemsLocalStorage[i].id;
            const found = item.find(element => element._id == itemId);
            cartProductItems.push({
                'id': found._id,
                'name': found.name,
                'color': itemsLocalStorage[i].color,
                'price': found.price,
                'imgUrl': found.imageUrl,
                'quantity' : itemsLocalStorage[i].quantity,
                'altTxt' : found.altTxt
            })
        }
    }
}

// get local storage
function getItemsLocalStorage() {
    return JSON.parse(
        localStorage.getItem('items')
        );
}

// loop dans notre panier et montre tous les produits
function showAllItemsInTheCart(items) {
    for(let i = 0; i < items.length; i++) {
        const item = items[i]; 
        // creation d'éléments
        createProductInBasket(item);
    }
}
//insertion de chaque element de description pour chaque item dnas notre panier 
function createProductInBasket(product) {

        //article
    const productItemsCart = document.getElementById('cart__items');
    const itemArticleCart = document.createElement('article');
    itemArticleCart.classList.add('cart__item');
    setAttributes(itemArticleCart, {
        "data-id": product.id,
        "data-color" : product.color
    })
    productItemsCart.appendChild(itemArticleCart);
    
    //div cart_item_img
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('cart__item__img');
    itemArticleCart.appendChild(imgContainer)
    const productImg = document.createElement('img');
    productImg.classList.add('cart__item__image');
    setAttributes(productImg, {
        "src": product.imgUrl,
        "alt" : product.altTxt
    })
    imgContainer.appendChild(productImg);
    
    //div cart__item__content
    const cartItemContent = document.createElement('div');
    cartItemContent.classList.add('cart__item__content');
    itemArticleCart.appendChild(cartItemContent);
    
    //cart__item__content__description ----- div
    const cartItemDescription = document.createElement('div');
    cartItemDescription.classList.add('cart__item__content__description');
    cartItemContent.appendChild(cartItemDescription);
    
    
    //cart__item__content__description ----- tags
    //h3
    const cartItemTitle = document.createElement('h2');
    cartItemTitle.innerText = product.name;
    cartItemDescription.appendChild(cartItemTitle);
    
    
    //p color
    const cartItemColor = document.createElement('p');
    cartItemColor.innerText = product.color;
    cartItemDescription.appendChild(cartItemColor);
    
    
    //p price
    const cartItemPrice = document.createElement('p');
    cartItemPrice.classList.add('cart__item__content__price');
    cartItemPrice.innerText = `${product.price}€`;
    cartItemDescription.appendChild(cartItemPrice);
    
    
    //div  cart__item__content__settings
    const cartItemSettings = document.createElement('div');
    cartItemSettings.classList.add('cart__item__content__settings');
    cartItemContent.appendChild(cartItemSettings);
    
    
    // div quantity
    const cartItemQuantity = document.createElement('div');
    cartItemQuantity.classList.add('cart__item__content__settings__quantity');
    cartItemSettings.appendChild(cartItemQuantity);
    
    
    // p quantité
    const cartItemQuantityLabel = document.createElement('p');
    cartItemQuantityLabel.innerText = "Qté : ";
    cartItemQuantity.appendChild(cartItemQuantityLabel);
    
    
    //input quantity
    const cartItemQuantityInput = document.createElement('input');
    cartItemQuantityInput.classList.add('itemQuantity');
    setAttributes(cartItemQuantityInput, {
    "type" : "number",
    "name" : "itemQuantity",
    "min" : "1",
    "max" : "100",
    "value" : product.quantity
    })
    cartItemQuantity.appendChild(cartItemQuantityInput);
    
    
    // div delete button
    const cartItemDelete = document.createElement('div');
    cartItemDelete.classList.add('cart__item__content__settings__delete');
    cartItemSettings.appendChild(cartItemDelete);
    
    
    //p delete
    const cartItemDeleteBth = document.createElement('p');
    cartItemDeleteBth.classList.add("deleteItem")
    cartItemDeleteBth.innerText = "Supprimer";
    cartItemDelete.appendChild(cartItemDeleteBth);
}

// set multiple attributes
function setAttributes(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

// calcul du nombre d'article total et du prix total
function calculateTotals(items) {
    const totalQuantityOfArticles = document.getElementById('totalQuantity');
    const totalPriceOfArticles = document.getElementById('totalPrice');
    totalQuantityOfArticles.innerText = calculateQuantity(items);
    totalPriceOfArticles.innerText = calculateTotalPrice(items);
}

// fonction de calcul de la quantité total
function calculateQuantity(items) {
    return items.reduce((a, b) => {
        return a + b.quantity;
    }, 0);
}
// fonction de calcul du prix total
function calculateTotalPrice(items) {
    //total du prix
    return items.reduce((a, b) => {
        return a + (b.price * b.quantity);
    }, 0);
}

// fonction qui update le local storage avec le calcul du nouveau prix et quantité après modification
function updateTotals(input, cartItems) {
    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener("change", (event) =>  {
            const targetElement = event.target.closest('.cart__item').dataset;
            const dataId = targetElement.id;
            const dataColor = targetElement.color;
            let itemsLocalStorage = getItemsLocalStorage();

            const found = cartItems.find(element => element.id == dataId && element.color == dataColor);
            found.quantity = Number(event.target.value);


            let index = itemsLocalStorage.findIndex(element => element.id == dataId && element.color == dataColor);
            itemsLocalStorage[index].quantity = Number(event.target.value);

            let newLocalStorage = JSON.stringify(itemsLocalStorage);
            localStorage.setItem('items', newLocalStorage);

            calculateTotals(cartItems);
        })
    }
}

// fonction de suppression d'un produit en cliquant sur le bouton supprimer
function deleteItemFromTheCart(deleteBtn, cartItems, section, article) { 
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", (event) => {
            const targetElement = event.target.closest('.cart__item').dataset;
            const dataId = targetElement.id;
            const dataColor = targetElement.color;
            let itemsLocalStorage = getItemsLocalStorage();

            let indexLs = itemsLocalStorage.findIndex(element => element.id == dataId && element.color == dataColor);

            let indexCartItems = cartItems.findIndex(element => element.id == dataId && element.color == dataColor);
            section.removeChild(article[i]);
            
            itemsLocalStorage.splice(indexLs, 1);
            let newLocalStorage = JSON.stringify(itemsLocalStorage);
            localStorage.setItem('items', newLocalStorage); 

            cartItems.splice(indexCartItems, 1);

            calculateTotals(cartItems);       
        })
    }
};

//Formulaire

// Creation de regEx ( expression régulière) pour les champs email, adresse et noms
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameFormat = /^[a-zA-Z][^0-9!?@#$%^&*)(':;=+/]{1,15}$/;
const adressFormat = /^[0-9]+,* *[a-zA-Z][^0-9]*$/;

// On recupère les valeurs provenant des entrrées du formulaire
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const form = document.querySelector('.cart__order__form');


// Valadation du formulaire et si toute les données sont valides, on crée un objet qui contient les données demandé a l'API
function isValidForm(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validName(firstName)&& validName(lastName) && validAdress(address) && validName(city) && validEmail(email)) {
            const requestedData = {
                contact: {
                    firstName,
                    lastName,
                    address,
                    city,
                    email
                },
                products: []
            };

            const localProducts = getItemsLocalStorage();
            
            // obtenir les identifiants de tous les produits du panier et les ajouter à l'array requestsData.products
            if (localProducts != null) {
                for (let i = 0; i < localProducts.length; i++) {
                    requestedData.products.push(localProducts[i].id)
                }
            };
            // on insère l'objet requestedData.contact avec les informations de contact
            requestedData.contact.firstName =  firstName.value;
            requestedData.contact.lastName = lastName.value;
            requestedData.contact.address = address.value;
            requestedData.contact.city = city.value;
            requestedData.contact.email = email.value;
            

            // POST des informations de commande à l'API, on recupère l'ID de commande et redirige vers la page confirmation 
            // Si le panier est vide, on affiche une alerte d'erreur
            if (localProducts == null || localProducts.length === 0) {
                alert("Veuillez choisir des produits, votre panier est vide");
            } else {
                postInformationToApiAndShowOrderNumber(requestedData)
            }
        }
        else {
            return false;
        }
    })
}

isValidForm(form);

// validation des entrées dans le formulaire
const validName = function (inputName) {
    
    //création de la regex pour la validation de nom, prenom et ville
    const nameFormat = /^[a-zA-Z][^0-9!?@#$%^&*)(':;=+/]{1,15}$/;
    if (inputName.value.match(nameFormat)) {
        inputName.nextElementSibling.innerText = "";
        return true;
    } else {
        alert("Votre nom n'est pas valide");
        return false;
    }
}

// validation de l'adresse (le numéro de rue est obligatoire)
const validAdress = function(inputName) {
    
    //création de la regex pour la validation d'adresse
    const adressFormat = /^[0-9]+,* *[a-zA-Z][^0-9]*$/;
    if (inputName.value.match(adressFormat)) {
        inputName.nextElementSibling.innerText = "";
        return true;
    } else {
        alert("Votre adresse n'est pas valide, veuillez indiquez le numero de la voie");
        return false;
    }
}

// validation de l'email ( oblige l'utilisateur a entrée une valeur de type exemple@domain.com )
const validEmail = function (inputName) {
    //création de la regex pour la validation d'email
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputName.value.match(emailFormat)) {
        inputName.nextElementSibling.innerText = "";
        return true;
    } else {
        alert ("Votre adresse mail n'est pas valide, ex: exemple@domain.com");
        return false;
    }
}

// request data en transmettant l'objet avec les données de contact et l'identifiant du produit
// redirection vers la page de confirmation
// on nettoie le localStorage après avoir passer la commande
const postInformationToApiAndShowOrderNumber = function(requestedData){
    fetch(`${API_ROOT}/products/order`, {
        method: 'POST',
        body: JSON.stringify(requestedData),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => {
                redirectionToConfirmationPage(json.orderId);
                localStorage.clear();
            })
} 

// redirect to confirmation page with id passed in parametres of function
function redirectionToConfirmationPage(url) {
    document.location.href = `confirmation.html?id=${url}`;
}
