window.onload = function() {
  var urlParams = new URLSearchParams(window.location.search);
  // const email = window.localStorage.getItem('email');
  const company_id = window.localStorage.getItem("company_id");
  const tok = window.localStorage.getItem("token_merchant");
  if (tok !== null) {
    var id = urlParams.get("id");
    this.console.log(id);
    fetch(baseurl + "getdata/" + id)
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log(data);

        fetch(baseurl + "Addtocart", {
          method: "Post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            remarks: "pending",
            user_id: company_id,
            product_id: id
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log("Success:", data);
            if (data.message == "Already Added") {
              this.alert("Already Added");
              window.location.href = "index.html";
            } else {
              this.alert("Add to cart");
              window.location.href = "cart.html";
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
    alert("You have to Login First");
    window.location.href = "login.html";
  }
};
