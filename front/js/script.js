fetch("http://localhost:3000/api/products") //using fetch to access URL (used json placeholder template)
    .then((res) => res.json()) // 
    .then((data) => {
        console.log(data)
        addProducts(data) 
    })
    //it fetches the info and passes by Add products-->
    //it recoveres the info from index 0 in the array 
    //it calls the makeAnchor function and calls the image url and creates the <a></a> anchor element
    //recovers the image from the first line, index 0
    //then it puts the infor in the variable anchor
    //then it passes by appendChildren and takes the sent element and attaches it to #items element
    //once it finds the id #items, it adds the anchor 
    


//***********SOFA DETAILS*************
//colors": 
//   "Blue",
//   "White",
//    "Black"
//    "_id": "107fb5b75607497b96722bda5b504926",
//    "name": "Kanap Sinopé",
//   "price": 1849,
//   "imageUrl": "http://localhost:3000/images/kanap01.jpeg",
//   "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   "altTxt": "Photo of a blue sofa, two seats"
    
    function addProducts(donnes) {    
    const id = donnes[0]._id //access the first element in the list of URLs
    const imageUrl = donnes[0].imageUrl 
    const altTxt = donnes[0].altTxt
    const name = donnes[0].name
    const description = donnes[0].description
    
    const image = makeImage(imageUrl, altTxt)
    const anchor = makeAnchor(id) //call the makeAnchor and add the appendChildren function with anchor, so it can receive the anchor info
    const article = makeArticle()
    const h3 = makeH3(name)
    const p = makedescription(description)

    article.appendChild(image) //append the children to the document
    article.appendChild(h3)
    article.appendChild(p)
    appendChildren(anchor, article)
    }
function makeAnchor(id) { 
    //creation of the requested <a> element 
    const anchor = document.createElement("a")  //create an element template="let/const element = document.createElement(tagName[, options]);"
    anchor.href = "./product.html?id=42" +id
    return anchor
}
function appendChildren(anchor, article)   {
    const items = document.querySelector("#items") // ID from HTML, ID better as it is more specific
    if (items !== null) {
    items.appendChild(anchor)
    anchor.appendChild(article) //article is inside the article
    console.log("object", items) //test to see if it works
}
}
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}
function makeArticle() {
    const article = document.createElement("article")
    
    //const p = makeP()
    //article.appendChild(image)
    //article.appendChild(h3)
    //article.appendChild(p)
    console.log(article)
    return article
   
    
}
function makeH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}
function makedescription(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}
//Notes: Many functions were created to make the code more readable and easier to understand but also to make it easier to debug and test



//problems encountered: IN GENERAL - kept forgetting where and which when appending the children to the document
//I had to add the anchor to the article, and then the article to the anchor fix: lines 33 and 45
//I had to add the image to the article, and then the article to the anchor fix: line36
//had to get the article inside the anchor fix: line 49
