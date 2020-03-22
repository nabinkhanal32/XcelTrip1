window.onload = function() {
  var urlParams = new URLSearchParams(window.location.search);
  const email = window.localStorage.getItem("email");
  const company_id = window.localStorage.getItem("company_id");
  const tok = window.localStorage.getItem("token_merchant");
  if (tok !== null) {
    var id = urlParams.get("id");
    this.console.log(id);
    fetch("http://localhost:8000/getdata/" + id, {})
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log(data);

        fetch("http://localhost:8000/Addtocart", {
          method: "Post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            remarks: "pending",
            company_id: company_id,
            product_id: id
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log("Success:", data);
            if (data.message == "Already Added") {
              this.alert("Already Added");
              window.location.href = "getProduct.html";
            } else {
              this.alert("Add to cart");
              window.location.href = "getAddtocart.html";
            }
          })
          .catch(error => {
            console.error("Error:", error);
          });
      })

      .catch(error => {
        console.log(error);
      });
  } else {
    window.location.href = "login.html";
  }
};
