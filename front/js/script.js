//fetch les données en provenance du serveur et les place sur addProducts//

fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        return addProducts(data)
    })

//addProducts récupère les données
function addProducts(donnees) {
    const id = donnees[0]._id
    const imageUrl = donnees[0].imageUrl
    const altTxt = donnees[0].altTxt
    const name = donnees[0].name
    const description = donnees[0].description

    const image = createImage(imageUrl, altTxt)

    const anchor = createAnchor(id)
    const article = createArticle()
    const h3 = createTitle(name)
    const p = createP(description)
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    appendChildren(anchor, article)   
}

function createAnchor(id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

//appendChildren va chercher l'id items et si le resultat est different de null il applique anchor//
function appendChildren(anchor, article) {
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
        }
}

function createArticle () {
    const article = document.createElement("article")
    //article.appendChild(title)
    //article.appendChild(paragraph)
    return article
}

function createImage (imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function createTitle (name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

function createP (description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}

