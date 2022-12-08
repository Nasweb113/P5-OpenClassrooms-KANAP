//first we FETCH the info
//using fetch to access URL (used json placeholder template)
// placeholder text fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json()).then(json => console.log(json))


    fetch("http://localhost:3000/api/products") //using fetch to access URL (used json placeholder template)
    .then((res) => res.json()) // 
    .then((info) => addProducts(info)) 
    //it fetches the info and passes by Add products-->
    //it recoveres the info from index 0 in the array 
    //it calls the makeAnchor function and calls the image url and creates the <a></a> anchor element
    //recovers the image from the first line, index 0
    //then it puts the infor in the variable anchor
    //then it passes by appendChildren and takes the sent element and attaches it to #items element
    //once it finds the id #items, it adds the anchor 
    
    
    function addProducts(info) {
        
        const imageUrl = info[0].imageUrl //access the first element in the list of URLs
       
        
       const anchor = makeAnchor(imageUrl); //call the MakeAnchor and add the AppendChildren function with anchor, so it can receive the anchor info
    AppendChildren(anchor)
      
    }
function makeAnchor(url) { //can call it url as it doesn't matter what you call it because it local
    //creation of the requested <a> element 
    const anchor = document.createElement("a")  //create an element template="let/const element = document.createElement(tagName[, options]);"
    anchor.href = url
    return anchor
}
function AppendChildren(anchor)   {
    const items = document.querySelector("#items") // ID from HTML, ID better as it is more specific
    items.appendChild(anchor)
}

