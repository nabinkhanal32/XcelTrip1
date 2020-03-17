$(document).ready(function() {
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  const tok = window.localStorage.getItem("token_merchant");
  var merchent_id = window.localStorage.getItem("merchent_id");
  if (tok !== null) {
    $("#commentadd").on("submit", function(e) {
      e.preventDefault();
      comment = $("#comment").val();

      data = {
        review: comment,
        product_id: id
      };
      $.ajax({
        url: baseurl + "product/review",
        type: "post",
        dataType: "json",
        data: data,
        beforeSend: function(xhr) {
          if (tok) {
            xhr.setRequestHeader("Authorization", "Bearer " + tok);
          }
        },
        success: function(res, textStatus, xhr) {
          if (res.message == "Succes") {
            alert("comment successfully added");
            location.href = "product.html";
          }
        }
      });
    });
  } else {
    location.href = "login.html";
  }
});
