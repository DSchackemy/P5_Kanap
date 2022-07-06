//on va rechercher l'id de chaque produit

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

//on recupère les données des produits dans l'API

fetch(`http://localhost:3000/api/products/${id}`)
.then((res) => res.json())
.then (res => Data(res))

function Data(canape) {
    //const altTxT = canape.altTxt
    //const colors = canape.colors
    //const description = canape.description
    //const imageUrl = canape.imageUrl
    //const name = canape.name
    //const price = canape.price
    //const _id = canape._id
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

const button = document.querySelector("#addToCart")
if (button != null) {
    button.addEventListener("click", handleClick)
}
function handleClick () {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value

        //on verifie que les valeur saisie sont juste sinon message alert
        if (isOrderInvalid(color, quantity)) return

        saveOrder(color, quantity)
        //on redirige vers le panier
        redirectToCart()

}
//fonction de verification de la commande avec apparition d'une pop-up au cas ou le choix est invalide
function isOrderInvalid(color, quantity) {
    if (color == null || color == "" || quantity == null || quantity == 0) {
        alert ("Veuillez selectionner une couleur et une quantité")
        return true
    }
}
//fonction de sauvegarde du choix produit dans le localStorage
function saveOrder (color, quantity) {
    const key = `${id}-${color}`
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl : imgUrl,
        altTxT: altText,
        name: artName,
    }
    localStorage.setItem(key, JSON.stringify(data))
}
//fonction de redirection
function redirectToCart() {
    window.location.href = "cart.html"
}