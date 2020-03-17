$(document).ready(function() {
  var tok = localStorage.getItem("token");

  $.ajax({
    type: "get",

    url: baseurl + "login/users/me",
    beforeSend: function(xhr) {
      if (tok) {
        xhr.setRequestHeader("Authorization", "Bearer " + tok);
      }
    },

    success: function(data) {},
    error: function() {
      location.href = "login.html";
    }
  });

  $("#logout").click(function() {
    $.ajax({
      type: "post",
      async: false,
      url: baseurl + "login/users/me/logout",
      beforeSend: function(xhr) {
        if (tok) {
          xhr.setRequestHeader("Authorization", "Bearer " + tok);
        }
      },
      success: function(res, textStatus, jqXHR) {
        if (res.message == "logged out") {
          localStorage.removeItem("token");
          localStorage.removeItem("adminId");
          location.href = "./pages/login/login.html";
        } else {
          alert("Something went wrong");
        }
      },
      error: function() {
        console.log("Error in Operation");
      }
    });
  });
});
