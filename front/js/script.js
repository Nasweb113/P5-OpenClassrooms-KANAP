fetch("http://localhost:3000/api/products") //using fetch to access URL (used json placeholder template)
    .then((res) => res.json())
    .then((sofa) => addProducts(sofa))
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
    
    function addProducts(sofa) {    
    //---->accesses the first element in the list of URLs****
    /*
    *const _id = sofa[0]._id 
    *const imageUrl = sofa[0].imageUrl 
    *const altTxt = sofa[0].altTxt
    *const name = sofa[0].name
    *const description = sofa[0].description
    */
   
//---->loop needed, using 'forEach' over 'for' loop which will loop and create the following below for each element in the array, seems 
//easier to use and does what I need
    sofa.forEach((product) => {
        console.log("sofa number", product)
   

    const { _id, imageUrl, altTxt, name, description } = product //destructuring (group all above together)    
    //---->creates an <a> element
    const anchor = makeAnchor(_id) 
    //---->creates below items   
    const image = makeImage(imageUrl, altTxt)
    const article = makeArticle()
    const h3 = makeH3(name)
    const p = makeDescription(description)
    //---->appends the children to the document
    appendElementsToArticle(article, image, h3, p) 
    //---->appends to the anchor
    appendArticleToAnchor(anchor, article)
    })


    //---->append the children to the document
function appendElementsToArticle(article, image, h3, p) {
    article.appendChild(image) 
    article.appendChild(h3)
    article.appendChild(p)
}


//---->creation of the requested <a> element 
function makeAnchor(id) { 
    const anchor = document.createElement("a")  
    anchor.href = "./product.html?id=" +id
    return anchor
}

function appendArticleToAnchor(anchor, article)   {
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
    return article
   
    
}
function makeH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}
function makeDescription(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}
//Notes: Many functions were created to make the code more readable and easier to understand but also to make it easier to debug and test
// test in chrome devtools console, type function name. 


//problems encountered: IN GENERAL - kept forgetting where and which when appending the children to the document
//I had to add the anchor to the article, and then the article to the anchor fix: lines  and 47
//I had to add the image to the article, and then the article to the anchor fix
//had to get the article inside the anchor fix: line 49
    }