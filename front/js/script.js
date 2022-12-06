fetch("http://localhost:3000/api/products") //using fetch to access URL (used json placeholder template)
.then((res) => res.json()) // 
.then((info) => addProducts(info))



function addProducts(info) {
    const imageUrl = info[0].imageUrl //access the first element in the list of URLs
//creation of the requested <a> element 
    const anchor = document.createElement("a")  //create an element "let element = document.createElement(tagName[, options]);"
    anchor.href = imageUrl
    anchor.text = "a great Kanap!"

    const items = document.querySelector("#items") // ID from HTML, ID better as it is more specific
    {
        items.appendChild(anchor)
    }
}