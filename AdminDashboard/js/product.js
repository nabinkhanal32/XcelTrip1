window.onload = function() {
  const tok = window.localStorage.getItem("token");
  const adminId = window.localStorage.getItem("adminId");
  if (tok !== null) {
    fetch(baseurl + "getProduct/")
      .then(data => {
        return data.json();
      })
      .then(data => {
        let details = "";
        const url = baseurl + "uploads/";
        data.forEach(element => {
          details += `  
               <div class="col-lg-3 col-sm-6 mix all dresses bags" data-div="${element._id}">
              <div class="single-product-item">
                  <figure>
                      <a href="singleProduct.html?id=${element._id}"><img src="${url +
            element.image_name}" alt="" height="150px"  width="250px"/></a>
                      <div class="p-status">Rs ${element.price}</div>
                  </figure>
                  <div class="product-text">
                      <h6>${element.product_name}</h6>
                      <p>Country: ${element.country}</p>  
                      <p>Quantity: ${element.quantity}</p>
                      <p>Details: ${element.details}</p>
                      
                      <input type="submit" value="Remove" id="remove" onclick="removeproduct('${
                        element._id
                      }')"> 
                  </div>
              </div>
          </div>`;
        });
        document.getElementById("productlist").innerHTML = details;
      })

      .catch(error => {
        console.log(error);
      });
  } else {
    window.location.href = "../login/login.html";
  }
};
