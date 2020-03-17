window.onload = function() {
  fetch(baseurl + "getProduct/")
    .then(data => {
      return data.json();
    })
    .then(data => {
      let details = "";
      const url = baseurl + "uploads/";
      data.forEach(element => {
        details += `<div class="col-sm-3" data-div="${element._id}">
                      <div class="thumb-wrapper">
                      <div class="char_icon">
                          <a href="product.html?id=${element._id}" ><img src="${url +
          element.image_name}" class="img-responsive img-fluid" alt="" height="500px" width="200px">
                          </div>
                          
                          
                              
                          </div>						
                      </div>
                  </div>`;
      });
      document.getElementById("Products").innerHTML = details;
    })

    .catch(error => {
      console.log(error);
    });
};
