$(document).ready(function() {
  var companyId = localStorage.getItem("company_id");

  $.getJSON(baseurl + "company/fetchSingleCompany/" + companyId, function(res) {
    $.each(res, function(index) {
      $("#name").val(res[index].company_name);
      $("#address").val(res[index].address);
      $("#person").val(res[index].contact_person);
      $("#email").val(res[index].contact_email);
      $("#phone").val(res[index].contact_phone);
      $("#cemail").val(res[index].company_email);
      $("#pan").val(res[index].pan);
      $("#apikey").val(res[index].apikey);
      $("#image_display").html(
        '<img src="' +
          baseurl +
          "uploads/" +
          res[index].verification_imagename +
          '" class="img-thumbnail" alt="Sample image" height="200px" width="200px">'
      );
    });
  });
});
