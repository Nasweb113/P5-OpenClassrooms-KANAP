let cartItems = []

function retrieveItemsFromCache() {
  const divCart = document.getElementById("cart__items")


  let keys = Object.keys(localStorage)
  let i = keys.length

  while(i--){
    const key = keys[i]
    const item = JSON.parse(localStorage.getItem(key))
    cartItems.push(item)
  }

 cartItems.forEach(async(item) => {
  let price;
  // get unique product
  const res = await fetch("http://localhost:3000/api/products/"+ item.id )
  const data = await res.json()
  price = data.price
  
  // display product details
  divCart.innerHTML += `
  <article class="cart__item" data-id=${item.id} data-color=${item.color}>
            <div class="cart__item__img">
              <img src=${item.imageUrl} alt="Photo of a sofa">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${item.name}</h2>
                <p>${item.color}</p>
                <p>${"€"+price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <input type="number" class="itemQuantity" id=${item.id} onchange="changeQuantity(event)" name="itemQuantity" min="1" max="100" value=${item.quantity}>
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem" id=${item.id} onclick="deleteItem(event)">Delete</p>
                  
                </div>
              </div>
            </div>
          </article> 
`
 });
}

// load carts
 retrieveItemsFromCache()
// delete item
 const deleteItem = (event)=>{
  event.preventDefault()//prevents reload the browser on change
  const id = event.target.id

  const findItem = cartItems.find((item)=>item.id === id)

  const key = `${id}-${findItem.color}`

  // remove item from localstorage
  localStorage.removeItem(key)
  location.reload()
 }
// update quantity
const changeQuantity = (event)=>{
  event.preventDefault()//prevents reload the browser on change
  const newQty = event.target.value
  
  const id = event.target.id
  
  const findItem = cartItems.find((item)=>item.id === id)
  const newItem = {...findItem, quantity: parseInt(newQty)}
  
  const key = `${id}-${newItem.color}`

  // update localstorage
  localStorage.setItem(key, JSON.stringify(newItem))
  location.reload()
 }
// calculate the total
(()=>{
  const total = document.getElementById("totalPrice")
  const qtyTotal = document.querySelector("#totalQuantity")
  console.log(qtyTotal)
  let totalAmount = 0
  let totalQuantity = 0
  cartItems.forEach(async(item)=>{
    const res = await fetch("http://localhost:3000/api/products/"+ item.id )
    const data = await res.json()

    totalAmount += data.price * item.quantity
    console.log("total", totalAmount)
    total.innerHTML = totalAmount 
    
    totalQuantity += item.quantity
    qtyTotal.innerHTML = totalQuantity
    
    console.log("totalQuant", totalQuantity)
console.log(qtyTotal)

  })
})()


  


  //Calcul de la quantité totale des articles sélectionés
   //Calcul de la quantité totale des articles sélectionés

   //Calcul de la quantité totale des articles sélectionés




/*
function getCart() {
  let cart = localStorage.getItem("cart");
console.log(cart)
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function removeFromCart(item) {
  let cart = getCart();
  cart = cart.filter((p) => p.id_color != item.id);
  saveCart(cart);
}

function addEvents() {
  //delete button
  const buttons = document.querySelector(".deleteItem");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      itemDeleted(btn.closest("article").getAttribute("data-id"));
    });
  });
}
  */
//ERRORS FOR FORM COMPLETION IF INCORRECT :


function getForm() {
    let form = document.querySelector(".cart__order__form");
    let mail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let charRegExp = new RegExp("^[a-zA-Z]+$");
  let addressRegExp = new RegExp("^[a-zA-Z0-9 ]+$");

    // Ecoute des modifications des éléments du form:
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });
    form.lastName.addEventListener('change', function () {
        validLastName(this);
    });
    form.address.addEventListener('change', function () {
        validAddress(this);
    });
    form.city.addEventListener('change', function () {
        validCity(this);
    });
    form.email.addEventListener('change', function () {
        validEmail(this);
    });

    // Validating the form:
    const validFirstName = function (inputFirstName) {
        let firstNameAlertError = inputFirstName.nextElementSibling;
        if (charRegExp.test(inputFirstName.value)) {
            firstNameAlertError.innerHTML = '';
        } else {
            firstNameAlertError.innerHTML = 'Invalid First Name';
        }
    };
    const validLastName = function (inputLastName) {
        let lastNameAlertError = inputLastName.nextElementSibling;
        if (charRegExp.test(inputLastName.value)) {
            lastNameAlertError.innerHTML = '';
        } else {
            lastNameAlertError.innerHTML = 'Invalid Last Name';
        }
    };
     //address validation
    const validAddress = function(inputAddress) {
      let addressErrorMsg = inputAddress.nextElementSibling;

      if (addressRegExp.test(inputAddress.value)) {
          addressErrorMsg.innerHTML = '';
      } else {
          addressErrorMsg.innerHTML = 'Please enter a valid address';
      }
  };

  //city validation
  const validCity = function(inputCity) {
      let cityErrorMsg = inputCity.nextElementSibling;

      if (charRegExp.test(inputCity.value)) {
          cityErrorMsg.innerHTML = '';
      } else {
          cityErrorMsg.innerHTML = 'Please enter a valid city';
      }
  };

  const validEmail = function (inputEmail) {
    let emailAlertError = inputEmail.nextElementSibling;
    if (mail.test(inputEmail.value)) {
        emailAlertError.innerHTML = '';
    } else {
        emailAlertError.innerHTML = 'Email invalid';
    }
    };
}
getForm();
// recovery of the elements 
function postForm() {
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputMail = document.getElementById('email');

    let idProducts = [];
    for (let i = 0; i < produitLocalStorage.length; i++) {
        idProducts.push(produitLocalStorage[i].idProduit);
    }
    console.log(idProducts);

    const order = {
        contact: {
            'firstName': inputFirstName.value,
            'lastName': inputLastName.value,
            'address': inputAddress.value,
            'city': inputCity.value,
            'email': inputMail.value,
        },
        products: idProducts,
    }
    
    // sending the information using POST and sending it over to the confirmation page
    const options = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
    };

    fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert("Problem with fetch : " + err.message);
        });
}