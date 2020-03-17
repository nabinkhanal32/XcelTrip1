$(document).ready(function() {
  var urlParams = new URLSearchParams(window.location.search);

  var merchant_id = urlParams.get("id");

  let imageFile = "";
  var tok = localStorage.getItem("token");
  if (tok == null) {
    window.location.href = "../login/login.html";
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
            '<img src="' +
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

    $.getJSON(baseurl + "company/fetchSingleCompany/" + merchant_id, function(res) {
      $.each(res, function(index) {
        $("#company_name").val(res[index].company_name);
        $("#address").val(res[index].address);
        $("#contact_person").val(res[index].contact_person);
        $("#contact_email").val(res[index].contact_email);
        $("#contact_phone").val(res[index].contact_phone);
        $("#company_email").val(res[index].company_email);
        $("#pan").val(res[index].pan);
        imageFile = res[index].verification_imagename;
        // $('#verification_image').val(res[index].verification_imagename);
        $("#image_display").html(
          '<img src="' +
            baseurl +
            "uploads/" +
            res[index].verification_imagename +
            '" class="img-thumbnail" alt="Sample image" height="200px" width="200px">'
        );
      });
    });

    $("form.updateCompany").on("submit", function() {
      var company_name = $("#company_name").val();
      var address = $("#address").val();
      var contact_person = $("#contact_person").val();
      var contact_email = $("#contact_email").val();
      var contact_phone = $("#contact_phone").val();
      var company_email = $("#company_email").val();
      var pan = $("#pan").val();
      listimage = imageFile;

      var data = {
        company_name: company_name,
        address: address,
        contact_person: contact_person,
        contact_email: contact_email,
        contact_phone: contact_phone,
        company_email: company_email,
        pan: pan,
        verification_imagename: listimage
      };

      $.ajax({
        type: "PUT",
        url: baseurl + "company/updateCompany/" + merchant_id,
        data: data,
        beforeSend: function(xhr) {
          if (tok) {
            xhr.setRequestHeader("Authorization", "Bearer " + tok);
          }
        },
        success: function(result) {
          if (result) {
            alert("Merchant Updated");
            location.href = "../../index.html";
          }
        }
      });
      return false;
    });
  }
});
