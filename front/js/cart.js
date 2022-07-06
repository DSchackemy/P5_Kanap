const cart = []
//on récupère les elements du localStorage
searchItem()
cart.forEach(item => displayItem(item))

function searchItem () {
    const numberOfItems = localStorage.length
    for(var i = 0;i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}
//affichage des produits
function displayItem(item) {
    const article = createArticle(item)
    const div = createImage(item)
    article.appendChild(div)
    const cartItemContent = createCartContent (item)
    article.appendChild(cartItemContent)
    displayArticle(article)
    displayTotalPrice()
    displayTotalQuantity()
}

function createArticle (item) {
    const article = document.createElement("article")
    article.classList.add("cart__items")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}
//insertion de l'image
function createImage(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}
//on ajoute les descriptions et settings pour chaque article
function createCartContent(item) {
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")

    const description = createDescription(item)
    const settings = createSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
    cartItemContent.appendChild(settings)
}
//insertion des description
function createDescription (item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name

    const p = document.createElement("p")
    p.textContent = item.color

    const p2 = document.createElement("p2")
    p2.textContent = item.price + "€"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}
//insertion des settings
function createSettings (item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings,item)
    addDeleteToSettings(settings, item)
    return settings
}
//affichage de l'article
function displayArticle (article) {
    document.querySelector("#cart__items").appendChild(article)
}
//insertion de l'input servant a modifier la quantité d'un article
function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    settings.classList.add("cart__item__content__settings__quantity")

    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)

    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceQuantity(item,item.id, input.value))
    quantity.appendChild(input)
    settings.appendChild(quantity)
}
//affichage du prix total
function displayTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
        totalPrice.textContent = total
    }
//affichage de la quantité d'article totale
function displayTotalQuantity(){
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
    }

//on enregistre les nouvelles valeurs dans le localStorage
function saveNewData(item) {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id }-${item.color}`
    localStorage.setItem(key, dataToSave)
}

// on update les valeurs sur la page panier
function updatePriceQuantity(item, id, newValue) {
        const itemToUpdate  = cart.find(item => item.id === id)
        itemToUpdate.quantity = Number(newValue)
        item.quantity = itemToUpdate.quantity
        displayTotalQuantity()
        displayTotalPrice()
        saveNewData(item)
    }

//insertion du bouton supprimer

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}
//fonction de suppression des données
function deleteItem(item) {
    const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color)
    cart.splice(itemToDelete, 1)
    displayTotalPrice()
    displayTotalQuantity()
    deleteData(item)
    deleteArticle(item)
    //Alerte produit supprimé et refresh
    alert("Ce produit a bien été supprimé du panier");
    location.reload();
}
//on supprime la donnée du localStorage
function deleteData(item){
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

//on supprime la donnée de la page panier
function deleteArticle(item) {
    const deleteArticle = document.querySelector (
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    deleteArticle.remove()
}
