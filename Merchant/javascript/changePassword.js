$(document).ready(function() {
  var tok = localStorage.getItem("token_merchant");
  var id = localStorage.getItem("company_id");
  alert(id);
  $("form.changePassword").on("submit", function() {
    var checkstr = confirm("are you sure you want change password?");
    if (checkstr == true) {
      // do your code
      var oldpassword = $("#oldpassword").val();
      var password = $("#password").val();

      var data = {
        currentPassword: oldpassword,
        password: password
      };

      $.ajax({
        type: "PUT",
        url: baseurl + "Company/merchantChangePassword/" + id,
        data: data,
        beforeSend: function(xhr) {},
        success: function(result) {
          if (result.message == "Password Changed") {
            alert(result.message);
            location.href = "index.html";
          }
        }
      });
      return false;
    } else {
      return false;
    }
  });
});
