$(document).ready(function() {
  var list = $("#merchantlist").DataTable({
    columnDefs: [
      {
        target: [0],
        visible: false,
        searchable: false
      }
    ],
    dom: "Bfrtip",

    buttons: [
      {
        extend: "print",
        title: "Merchant Lists",
        exportOptions: {
          columns: [1, 2, 3, 4, 5, 6, 7, 8]
        }
      }
    ]
  });
  var tok = localStorage.getItem("token");
  if (tok == null) {
    window.location.href = "../../login.html";
  } else {
    $.getJSON(baseurl + "Company/allCompanies/", function(res) {
      $.each(res, function(index) {
        list.row
          .add([
            res[index]._id,
            res[index].company_name,
            res[index].address,
            res[index].contact_person,
            res[index].contact_phone,
            res[index].contact_email,
            res[index].company_email,
            res[index].pan,
            res[index].current_balance,
            res[index].country,
            '<img src="' +
              baseurl +
              "uploads/" +
              res[index].verification_imagename +
              '" class="img-thumbnail" alt="Sample image" height="50px" width="100px">',

            '<a href="updateMerchant.html?id=' +
              res[index]._id +
              '"><button class="btn"><i class="mdi mdi-arrow-up-bold-circle-outline"></i></button></a>',
            '<button class="btn" id="deleteCompany"><i class="mdi mdi-delete-forever" ></i></button>'
          ])
          .draw(false);
      });
    });
  }
  $("#merchantlist").on("click", "#deleteCompany", function() {
    var checkstr = confirm("are you sure you want to delete this?");
    if (checkstr == true) {
      // do your code
      var data = list.row($(this).parents("tr")).data();
      var id = data[0];

      $.ajax({
        url: baseurl + "company/deleteCompany/" + id,
        type: "delete",
        beforeSend: function(xhr) {
          if (tok) {
            xhr.setRequestHeader("Authorization", "Bearer " + tok);
          }
        },
        success: function(res, textStatus, xhr) {
          if (res.message == "Deleted Successfully") {
            window.location.reload();
          }
        },
        error: function(xhr, textStatus, errorThrown) {
          console.log(xhr);
        }
      });
    } else {
      return false;
    }
  });

  $.getJSON(baseurl + "Company/merchantCount", function(res) {
    $("#merchantCount").append(res.count);
  });
});
