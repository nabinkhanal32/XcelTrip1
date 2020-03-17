window.onload = function() {
  var urlParams = new URLSearchParams(window.location.search);

  const tok = window.localStorage.getItem("token");

  if (tok !== null) {
    var id = urlParams.get("id");
    fetch(baseurl + "getSingleProduct/" + id)
      .then(data => {
        return data.json();
      })
      .then(data => {
        let details = "";
        const url = baseurl + "uploads/";
        data.forEach(element => {
          details += `  
            <main class="ps-main">
            <div class="ps-product--detail pt-60">
              <div class="ps-container">
                <div class="row">
                  <div class="col-lg-10 col-md-12 col-lg-offset-1">
                    <div class="ps-product__thumbnail">
                      <div class="ps-product__image">
                        
                        <div class="item">
                          <img
                            class="zoom"
                            src="${url + element.image_name}"
                            alt=""
                          />
                        </div>
                       
                      </div>
                    </div>
                    
                    <div class="ps-product__info">
                      <h1>${element.product_name}</h1>
                     
                      <h3 class="ps-product__price">Rs: ${element.price}</h3>
                      <div class="ps-product__block ps-product__quickview">
                        <h4>QUICK REVIEW</h4>
                        <p>
                        ${element.details}
                        </p>
                      </div>
      
                      <div class="ps-product__shopping">
                        <a class="ps-btn mb-10" href="addtocart.html?id=${element._id}"
                          >Add to cart<i class="ps-icon-next"></i
                        ></a>
                       
                      </div>
                    </div>`;
        });
        document.getElementById("productlist").innerHTML = details;
      })

      .catch(error => {
        console.log(error);
      });
  } else {
    window.location.href = "login.html";
  }
};
