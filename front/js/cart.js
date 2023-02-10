let cartItems = []

const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => submitForm(e))


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
  const res = await fetch("http://localhost:3000/api/products/"+ item.id)
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
  //event.preventDefault()//prevents reload the browser on  direct change
  const newQty = event.target.value
  
  const id = event.target.id
  
  const findItem = cartItems.find((item)=>item.id === id)
  const newItem = {...findItem, quantity: parseInt(newQty)}
  
  const key = `${id}-${newItem.color}`

  // update localstorage with new info
  localStorage.setItem(key, JSON.stringify(newItem))
  
   window.location.reload()
 }


// calculate the total
(()=>{
  const total = document.getElementById("totalPrice")
  const qtyTotal = document.querySelector("#totalQuantity")
  let totalAmount = 0
  let totalQuantity = 0
  cartItems.forEach(async(item)=>{
    const res = await fetch("http://localhost:3000/api/products/"+ item.id )
    const data = await res.json()

    totalAmount += data.price * item.quantity
    total.innerHTML = totalAmount 
    
    totalQuantity += item.quantity
    qtyTotal.innerHTML = totalQuantity
  })
})()



function getForm() {
  
    let infoForm = document.querySelector(".cart__order__form");
    let mail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let charRegExp = new RegExp("^[a-zA-Z]+$");
  let addressRegExp = new RegExp("^[a-zA-Z0-9 ]+$");

    // Ecoute des modifications des éléments du form:
    infoForm.firstName.addEventListener('change', function () {
        validFirstName(this);
    });
    infoForm.lastName.addEventListener('change', function () {
        validLastName(this);
    });
    infoForm.address.addEventListener('change', function () {
        validAddress(this);
    });
    infoForm.city.addEventListener('change', function () {
        validCity(this);
    });
    infoForm.email.addEventListener('change', function () {
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

function submitForm(e) {
  e.preventDefault()
  if (cartItems.length === 0) {
    alert("Please select items to buy")
    return
  }



  const body = makeRequestBody()
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId
      window.location.href = "confirmation.html" + "?orderId=" + orderId
    })
    .catch((err) => console.error(err))
}


function makeRequestBody() {
  const form = document.querySelector(".cart__order__form")
  const firstName = form.elements.firstName.value
  const lastName = form.elements.lastName.value
  const address = form.elements.address.value
  const city = form.elements.city.value
  const email = form.elements.email.value
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products: getIdsFromCache()
  }
  return body
}

function getIdsFromCache() {
  const numberOfProducts = localStorage.length
  const ids = []
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i)
    const id = key.split("-")[0]
    ids.push(id)
  }
  return ids
}