$(document).ready(function() {
  // import { baseurl } from "./url.js";
  var token = localStorage.getItem("token");
  if (token !== null) {
    window.location.href = "index.html";
  } else {
    $("form.loginForm").on("submit", function(e) {
      e.preventDefault();
      username = $("#username").val();
      password = $("#password").val();

      data = {
        username: username,
        password: password
      };
      $.ajax({
        url: baseurl + "login/",
        type: "post",
        dataType: "json",
        data: data,

        success: function(res, textStatus, xhr) {
          if (res.token != null) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("adminId", res.id);

            location.href = "../../index.html";
          } else {
            alert(res.message);
          }
        },

        error: function(xhr, textStatus, errorThrown) {
          console.log("Error in Operation");
        }
      });
    });

    $("form.resetform").on("submit", function(e) {
      e.preventDefault();
      email = $("#email").val();

      data = {
        email: email
      };

      $.ajax({
        url: baseurl + "reset/reset-password/",
        type: "post",
        dataType: "json",
        data: data,

        success: function(res, textStatus, xhr) {
          if (res.message == "token sent") {
            alert("A reset token has been sent to your email. Please check your email");
            location.href = "tokenpage.html";
          } else {
            alert(res.message);
          }
        },

        error: function(xhr, textStatus, errorThrown) {
          console.log("Error in Operation");
        }
      });
    });

    $("form.tokenform").on("submit", function(e) {
      e.preventDefault();
      token = $("#token").val();

      data = {
        token: token
      };

      $.ajax({
        url: baseurl + "reset/reset_token/",
        type: "post",
        dataType: "json",
        data: data,

        success: function(res, textStatus, xhr) {
          if (res.id) {
            location.href = "passwordresetform.html?id=" + res.id;
          } else {
            alert(res.message);
          }
        },

        error: function(xhr, textStatus, errorThrown) {
          console.log("Error in Operation");
        }
      });
    });
  }
});
