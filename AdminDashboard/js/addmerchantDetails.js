$(document).ready(function() {
  let imageFile = "";
  var tok = localStorage.getItem("token");
  if (tok == null) {
    window.location.href = "login.html";
  } else {
    $("#verification_image").on("change", function() {
      let formData = new FormData();
      let files = $("#verification_image").get(0).files;
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
        beforeSend: function(xhr) {
          if (tok) {
            xhr.setRequestHeader("Authorization", "Bearer " + tok);
          }
        },

        success: function(data) {
          imageFile = data.filename;

          $("#image_display").html(
            '<img src= "' +
              baseurl +
              "uploads/" +
              data.filename +
              '" class="img-thumbnail" alt="Sample image" height="200px" width="200px">'
          );
        },
        error: function() {
          alert("Image upload failed");
        }
      });
    });
  }

  $("form.company").on("submit", function(e) {
    e.preventDefault();
    company_name = $("#company_name").val();
    address = $("#address").val();
    contact_person = $("#contact_person").val();
    contact_email = $("#contact_email").val();
    contact_phone = $("#contact_phone").val();
    company_email = $("#company_email").val();
    pan = $("#pan").val();
    country = $("#country_name").val();
    listImage = imageFile;

    data = {
      company_name: company_name,
      address: address,
      contact_person: contact_person,
      contact_email: contact_email,
      contact_phone: contact_phone,
      company_email: company_email,
      pan: pan,
      country: country,
      verification_imagename: listImage
    };
    $.ajax({
      url: baseurl + "Company/addCompany/",
      type: "post",
      dataType: "json",
      data: data,
      beforeSend: function(xhr) {
        if (tok) {
          xhr.setRequestHeader("Authorization", "Bearer " + tok);
        }
      },

      success: function(res, textStatus, xhr) {
        if (res.message_success == "Register Successful") {
          alert("Register Successful");
          location.href = "../../index.html";
        }
      },
      error: function(xhr, textStatus, errorThrown) {
        var result = xhr.responseJSON;
        if (result.company_name) {
          alert(result.company_name.message);
        }

        if (result.address) {
          alert(result.address.message);
        }
        if (result.contact_person) {
          alert(result.contact_person.message);
        }

        if (result.contact_email) {
          alert(result.contact_email.message);
        }
        if (result.contact_phone) {
          alert(result.contact_phone.message);
        }
        if (result.company_email) {
          alert(result.contact_email.message);
        }
        if (result.pan) {
          alert(result.pan.message);
        }
      }
    });
  });
});
