const cart = []

searchItem()
cart.forEach(item => displayItem(item))

function searchItem () {
    const numberOfItems = localStorage.length
    for(let i = 0;i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

function displayItem(item) {
    const article = createArticle(item)
    const div = createImage(item)
    article.appendChild(div)

    const cartItemContent = createDescription (div, item)
    article.appendChild(cartItemContent)
    displayArticle(article)
}

function createCartItemContent() {
    const div = document.createElement("div")
    div.classList.add("cart__item__content")   
}

function createDescription(div, item) {
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
    div.appendChild(description)
    return div
}

function displayArticle (article) {
    document.querySelector("#cart__items").appendChild(article)
}

function createImage(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

function createArticle (item) {
    const article = document.createElement("article")
    article.classList.add("cart__items")
    article.dataset.id = item.id
    article.dataset.color = item.color
    //article.appendChild(createTitle(item))
    //article.appendChild(createPrice(item))
    //article.appendChild(createQuantity(item))
    //article.appendChild(createColor(item))
    //article.appendChild(createImage(item))
    return article
}