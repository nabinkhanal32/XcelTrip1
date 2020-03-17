$(document).ready(function() {
  var tok = localStorage.getItem("token");
  if (tok == null) {
    window.location.href = "login.html";
  } else {
    //console.log(tok);

    $.getJSON(baseurl + "Company/merchantList", function(res) {
      $.each(res, function(index) {
        $("#company_name").append(
          '<option value="' + res[index]._id + '">' + res[index].company_name + "</option>"
        );
      });
    });

    $("form.topup").on("submit", function(e) {
      e.preventDefault();
      topup_amount = $("#topup_amount").val();
      mode_of_payment = $("#mode_of_payment").val();
      remarks = $("#remarks").val();
      company_id = $("#company_name").val();

      data = {
        topup_amount: topup_amount,
        mode_of_payment: mode_of_payment,
        remarks: remarks,
        company_id: company_id
      };
      $.ajax({
        url: baseurl + "topup/addTopup",
        type: "post",
        dataType: "json",
        data: data,
        beforeSend: function(xhr) {
          if (tok) {
            xhr.setRequestHeader("Authorization", "Bearer " + tok);
          }
        },
        success: function(res, textStatus, xhr) {
          if (res.message == "Succesfull") {
            alert("Topup successfully added");
            location.href = "topup.html";
          }
        },

        error: function(xhr, textStatus, errorThrown) {
          var result = xhr.responseJSON;

          if (result.topup_amount) {
            alert(result.topup_amount.message);
          }

          if (result.mode_of_payment) {
            alert(result.mode_of_payment.message);
          }
          if (result.remarks) {
            alert(result.remarks.message);
          }
        }
      });
    });
  }
});
