window.onload = function() {
  // const email = window.localStorage.getItem('email');
  const user_id = window.localStorage.getItem("company_id");

  const tok = window.localStorage.getItem("token_merchant");

  if (tok !== null) {
    fetch(baseurl + "getCart/" + user_id, {})
      .then(data => {
        return data.json();
      })
      .then(function(res, data) {
        let detail = "";
        const url = baseurl + "uploads/";
        var totalCart = 0;
        for (var item in data) {
          totalCart += data[item].price * 1;

          // sessionStorage.setItem('shoppingCart-' + data[item]._id,data[item].price);
        }
        $("#totalPrice").html(totalCart);
        $.each(res.carts, function(index) {
          detail += `               
          <div class="col-sm-3" data-div="${res.carts[index]._id}">
          <div class="thumb-wrapper">
            <div class="img-box">
              <img src="${url +
                res.carts[index].product_id.image_name}" class="img-responsive img-fluid" alt="">
            </div>
            <div class="thumb-content" id="test">
              <h4>${res.carts[index].product_id.product_name}</h4>
              <p class="item-price"> <span>price : Rs ${
                res.carts[index].product_id.price
              }</span></p>
              
              <p class="item-price"> <span>Quantity : </span>
              
              <div class="form-group--number">
              <input class="minus" type="submit" value="-" id="subtract_quantity" onclick="subtractQuantity('${
                res.carts[index]._id
              }','${res.carts[index].product_id.price}')">  
            <input type="text" value="1" id="quantity-${
              res.carts[index]._id
            }" style="width:30px; font-weight:bold;color:red" readonly>
              
            <input class="plus" type="submit" value="+" id="add_quantity" onclick="addQuantity('${
              res.carts[index]._id
            }','${res.carts[index].product_id.quantity}','${res.carts[index].product_id.price}')">
            </p>            
            </div>
              
              <p class="item-total"> <span>Item Total :Rs </span><span id="price-${
                res.carts[index]._id
              }">${res.carts[index].product_id.price} </span></p>
            
            
        
              <input type="submit" value="Remove" id="remove" onclick="remove('${
                res.carts[index]._id
              }')"> 
            
              
            </div>						
          </div>
        </div>          
          
     `;
        });

        document.getElementById("Addtocart").innerHTML = detail;
      });
  } else {
    window.location.href = "login.html";
  }
};
