window.onload = function() {
  var urlParams = new URLSearchParams(window.location.search);

  //   const tok = window.localStorage.getItem("token_merchant");

  //   if (tok !== null) {
  var id = urlParams.get("id");
  fetch(baseurl + "getSingleproduct/" + id, {})
    .then(data => {
      return data.json();
    })
    .then(data => {
      let details = "";
      const url = baseurl + "uploads/";
      data.forEach(element => {
        details += `  
        <div class="col-lg-5 order-lg-2 order-1">
					<div class="image_selected"><img src="${url + element.image_name}" alt=""></div>
				</div>

				<!-- Description -->
				<div class="col-lg-5 order-3">
					<div class="product_description">
						
						<div class="product_name">${element.product_name}</div>
						<div class="product_text"><p>${element.details}</p></div>
						<div class="order_info d-flex flex-row">
							<form action="#">
								<div class="clearfix" style="z-index: 1000;">

									<!-- Product Quantity -->
									<div class="product_quantity clearfix">
										<span>${element.quantity}</span>
										
									</div>

									<!-- Product Color -->
									
										</li>
									</ul>

								</div>

								<div class="product_price">$${element.price}</div>
								<div class="button_container">
									<a type="button" class="button cart_button" href=addtocart.html?id=${
                    element._id
                  }>Add to cart<i class="ps-icon-next"></i
                                    ></a>
									<div class="product_fav"><i class="fas fa-heart"></i></div>
								</div>
          `;
      });
      document.getElementById("productlist").innerHTML = details;
    })

    .catch(error => {
      console.log(error);
    });
};
// else {
//     window.location.href = "login.html";
//   }
// };
