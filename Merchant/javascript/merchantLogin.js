$(document).ready(function() {
  $("form.loginForm").on("submit", function(e) {
    e.preventDefault();
    company_name = $("#company_name").val();
    password = $("#password").val();

    data = {
      company_name: company_name,
      password: password
    };
    $.ajax({
      url: baseurl + "Company/login/",
      type: "post",
      dataType: "json",
      data: data,

      success: function(res, textStatus, xhr) {
        if (res.token != null) {
          if (res.loginattempt > 0) {
            localStorage.setItem("token_merchant", res.token);
            localStorage.setItem("company_id", res.id);
            localStorage.setItem("company_name", company_name);

            location.href = "index.html";
          } else {
            localStorage.setItem("token_merchant", res.token);
            localStorage.setItem("company_id", res.id);

            location.href = "changepassword.html";
          }
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
    company_email = $("#email").val();

    data = {
      company_email: company_email
    };

    $.ajax({
      url: baseurl + "Company/reset-password/",
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
      url: baseurl + "Company/reset_token/",
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
});
