const cart = []

searchItem()
cart.forEach(item => displayItem(item))

function searchItem () {
    const numberOfItems = localStorage.lenght
    for(let i = 0;i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

function displayItem(item) {
    const article = createArticle(item)
    displayArticle(article)
    const div = createImage(item)
    article.appendChild(div)
}

function displayArticle (article) {
    document.querySelector("#cart__item").appendChild(article)
}

function createImage(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

function createArticle (item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    //article.appendChild(createTitle(item))
    //article.appendChild(createPrice(item))
    //article.appendChild(createQuantity(item))
    //article.appendChild(createColor(item))
    //article.appendChild(createImage(item))
    return article
}