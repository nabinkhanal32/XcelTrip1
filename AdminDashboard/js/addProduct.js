$(document).ready(function() {
  var tok = window.localStorage.getItem("token");
  var adminId = window.localStorage.getItem("adminId");
  let imageFile = "";
  if (tok == null) {
    location.href = "../login/login.html";
  } else {
    $("#image").on("change", function() {
      let formData = new FormData();
      let files = $("#image").get(0).files;
      if (files.length > 0) {
        formData.append("imageFile", files[0]);
      }
      $.ajax({
        url: baseurl + "Company/upload/",
        type: "post",
        contentType: false,
        cache: false,
        processData: false,
        data: formData,

        success: function(data) {
          imageFile = data.filename;
          $("#image_display").html(
            '<img src="' +
              baseurl +
              "uploads/" +
              data.filename +
              '" class="img-thumbnail" alt="Sample image" height="200px" width="200px">'
          );
        },
        error: function() {
          alert("image upload fail");
        }
      });
    });

    $("form.addproduct").on("submit", function(e) {
      e.preventDefault();
      product_name = $("#product_name").val();
      quantity = $("#quantity").val();
      details = $("#details").val();
      price = $("#price").val();
      country = $("#country_name").val();
      listImage = imageFile;

      data = {
        product_name: product_name,
        quantity: quantity,
        details: details,
        price: price,
        country: country,
        image_name: listImage,
        admin_id: adminId
      };
      $.ajax({
        url: baseurl + "productAdd/",
        type: "post",
        dataType: "json",
        data: data,

        success: function(res, textStatus, xhr) {
          if (res.message == "succces") {
            alert("Added Successful");
            location.href = "../Product/product.html";
          }
        },
        error: function(e) {
          console.log(e);
        }
      });
    });
  }
});
