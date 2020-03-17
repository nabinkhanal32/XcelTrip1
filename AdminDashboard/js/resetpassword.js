$(document).ready(function() {
  var urlParams = new URLSearchParams(window.location.search);

  var id = urlParams.get("id");

  $("form.resetPasswordForm").on("submit", function() {
    password = $("#password").val();

    data = {
      password: password
    };

    $.ajax({
      type: "PUT",
      url: baseurl + "reset/updatenewpassword/" + id,
      data: data,

      success: function(res) {
        alert(res.message);
        if (res.message == "Password Changed") {
          location.href = "login.html";
        }
      }
    });
    return false;
  });
});
