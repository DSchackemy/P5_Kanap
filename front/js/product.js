const API_ROOT = 'http://localhost:3000/api';

//on recupère l'ID du produit depuis l'URL
const productId = new URLSearchParams(window.location.search).get('id');

function getAllProducts(showDescription) {
    fetch(`${API_ROOT}/products/${productId}`)
    .then(response => response.json())
    .then(item => {
        document.title = item.name;
        showDescription(item);
    })
}

getAllProducts(showCanapeInformation);


// on insere le produit depuis l'API
function showCanapeInformation (item) {
    //product container
    const itemImg = document.querySelector('.item__img');

    // insertion de l'image
    const itemCardImage = document.createElement('img');
    itemCardImage.setAttribute('src', `${item.imageUrl}`);
    itemCardImage.setAttribute('alt', `${item.altTxt}` )
    itemImg.appendChild(itemCardImage);

    // insertion du titre
    const title = document.getElementById('title');
    title.innerText = `${item.name}`;
    
    //insertion du prix
    const price = document.getElementById('price');
    price.innerText = `${item.price}`;

    //insertion de la description description
    const description = document.getElementById('description');
    description.innerText = `${item.description}`;

    //insetion du champs couleur
    const colors = document.getElementById('colors');

    /**
     * options pour le champ de selection
     * @param {Object} item 
     * @param {HTMLElement} colors 
     */
    createOptions(item, colors);
    
    //on ajoute au panier
    addEventListenerOnAddToCartBtn();

}

//fonction du champ de selection pour la couleur
function createOptions(item, select) {
    for(let op = 0; op < item.colors.length; op++) {
        const option = document.createElement('option');
        option.setAttribute('value', `${item.colors[op]}`);
        option.innerText = `${item.colors[op]}`;
        select.appendChild(option)
    }
}



//fonction de l'event listenner sur le clic du bouton ajouter au panier
function addEventListenerOnAddToCartBtn() {
    const btn = document.getElementById('addToCart');
    const quantityInput = document.getElementById('quantity');
    const selectBox = document.getElementById('colors');

    btn.addEventListener('click', () => {
        const item = {"id":productId, "color": colors.value, "quantity" : parseInt(quantityInput.value)};
        // si la selection est valide on ajoute au panier et redirige vers la page panier
        if(isItemValid(item)) {
            addToCart(item);
            alert('Votre commande a été bien prise en compte ! ');
            quantityInput.value = 0;
            selectBox.selectedIndex = 0;
            redirectToCart ()
        } else {
            alert('Veuillez selectionner une couleur et une quantité comprise entre 1 et 100');
        }
    })
}

// fonction qui verifie si la selection est correcte
function isItemValid(item) {
    const selectBox = document.getElementById('colors');

return selectBox.selectedIndex != 0 && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity < 101;
}

// function qui ajoute l'objet au panier
function saveItems(items) {
localStorage.setItem('items', JSON.stringify(items));
}

// si le panier est vide, une array est crée
function getAllItems() {
    let items = localStorage.getItem('items');
    if (items == null) {
        return [];
    }

    return JSON.parse(items);
}

// SI dans le panier un objet avec le meme id et couleur existe, sa quantité change
// sinon on ajoute l'objet au panier
function addToCart(item) {
    let listOfProducts = getAllItems();
    
    let itemExists = listOfProducts.find(element => {
        return element.id == item.id && element.color == item.color;
    });

    if(itemExists === undefined) {
        listOfProducts.push(item)
    } else {
        itemExists.quantity += item.quantity;
    }

    //sauvegarde le parnier après modification dans le local storage
    saveItems(listOfProducts);
}

function redirectToCart () {
    window.location.href = "cart.html";
}