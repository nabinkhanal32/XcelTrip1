$(document).ready(function() {
  var list = $("#depositeHistory").DataTable({
    columnDefs: [
      {
        targets: [0],
        visible: false,
        searchable: false
      }
    ]
  });
  var company_id = localStorage.getItem("company_id");

  $.getJSON("http://192.168.0.14:8000/topup/getTopupbyid/" + company_id, function(res) {
    $.each(res, function(index) {
      list.row
        .add([
          res[index]._id,
          new Date(res[index].date).toISOString().split("T")[0],
          res[index].topup_amount,
          res[index].mode_of_payment,
          res[index].remarks
        ])
        .draw(false);
    });
  });
});
