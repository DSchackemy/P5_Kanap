//fetch les données en provenance du serveur et appele addProducts//

fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))

//addProducts récupère les données du premier élément
function addProducts(donnees) {
    //const _id = donnees[0]._id
    //const imageUrl = donnees[0].imageUrl
    //const altTxt = donnees[0].altTxt
    //const name = donnees[0].name
    //const description = donnees[0].description


    // on va loop les données avec forEach afin de recuperer les données de chaque produits
    donnees.forEach((canape) => {
    

    const {_id, imageUrl, altTxt, name, description} = canape
    const anchor = createAnchor(_id)
    const article = document.createElement("article")
    const image = createImage(imageUrl, altTxt)
    const h3 = createTitle(name)
    const p = createP(description)
    
    appendElementsToArticle (article, [image, h3, p])
    appendArticleToAnchor(anchor, article)  
    });
}

function appendElementsToArticle (article, array) {
    array.forEach((item) => {
        article.appendChild(item)
    })
    //article.appendChild(image)
    //article.appendChild(h3)
    //article.appendChild(p)
}

function createAnchor(id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

//appendChild va chercher l'id items et si le resultat est different de null il applique sur anchor//
function appendArticleToAnchor(anchor, article) {
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
        }
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

