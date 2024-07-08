document.addEventListener("DOMContentLoaded", function () {
  // check internet status
  function checkInternetConnection() {
    if (navigator.onLine) {
      return true;
    } else {
      return false;
    }
  }

  if (!checkInternetConnection()) {
    alert("pleas check the internet connection");
    console.log("check internet connection")
  }
 
  if(checkInternetConnection() === true){
    console.log("internet connected")
  }

  let userInput = document.querySelector("#userInput");
  let searchBnt = document.querySelector("#searchBtn");
  let searchList = document.querySelector("#searchList");
  let viewproduct = document.querySelector(".viewproduct");

  userInput.addEventListener("keyup", function () {
    if (userInput.value.length > 0) {
      searchList.style.display = "block";
    } else {
      searchList.style.display = "none";
    }

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        res.forEach((data, index) => {
          let start;
          clearTimeout(start);
          start = setTimeout(() => {
            if (
              data.title.toLowerCase().includes(userInput.value.toLowerCase())
            ) {
              let list = document.createElement("p");
              list.innerHTML = data.title;
              list.addEventListener("click", function () {
                userInput.value = data.title;
                showProductDetails(data);
                searchList.style.display = "none";
              });
              searchList.appendChild(list);
            } 
          }, 300);
        });
      });
  });

  function showProductDetails(data) {
    let details = `
   <img src="${data.image}" alt="">
   <p>${data.title}</p>
   `;
    viewproduct.innerHTML = details;
  }

  if (userInput.value > 0) {
    userInput.placeholder = " ";
  }

});
